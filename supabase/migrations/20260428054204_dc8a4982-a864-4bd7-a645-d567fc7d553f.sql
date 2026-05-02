
-- Partner preferences + activity columns
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS pref_age_min int,
  ADD COLUMN IF NOT EXISTS pref_age_max int,
  ADD COLUMN IF NOT EXISTS pref_religions text[],
  ADD COLUMN IF NOT EXISTS pref_mother_tongues text[],
  ADD COLUMN IF NOT EXISTS pref_marital_statuses text[],
  ADD COLUMN IF NOT EXISTS pref_diets text[],
  ADD COLUMN IF NOT EXISTS pref_cities text[],
  ADD COLUMN IF NOT EXISTS pref_min_income_lpa int,
  ADD COLUMN IF NOT EXISTS last_seen_at timestamptz DEFAULT now();

-- Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  actor_id uuid,
  type text NOT NULL,
  title text NOT NULL,
  body text,
  link text,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_created ON public.notifications(user_id, created_at DESC);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users view own notifications" ON public.notifications;
CREATE POLICY "Users view own notifications" ON public.notifications
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users mark own notifications read" ON public.notifications;
CREATE POLICY "Users mark own notifications read" ON public.notifications
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users delete own notifications" ON public.notifications;
CREATE POLICY "Users delete own notifications" ON public.notifications
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated insert notifications" ON public.notifications;
CREATE POLICY "Authenticated insert notifications" ON public.notifications
  FOR INSERT TO authenticated WITH CHECK (true);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- Trigger functions
CREATE OR REPLACE FUNCTION public.notify_on_interest()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE sender_name text;
BEGIN
  SELECT full_name INTO sender_name FROM public.profiles WHERE id = NEW.sender_id;
  INSERT INTO public.notifications (user_id, actor_id, type, title, body, link)
  VALUES (NEW.receiver_id, NEW.sender_id, 'interest',
          'New interest received',
          COALESCE(sender_name, 'Someone') || ' sent you an interest',
          '/profile/' || NEW.sender_id);
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_notify_on_interest ON public.interests;
CREATE TRIGGER trg_notify_on_interest
AFTER INSERT ON public.interests
FOR EACH ROW EXECUTE FUNCTION public.notify_on_interest();

CREATE OR REPLACE FUNCTION public.notify_on_interest_status()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE receiver_name text;
BEGIN
  IF NEW.status = OLD.status THEN RETURN NEW; END IF;
  IF NEW.status = 'accepted' THEN
    SELECT full_name INTO receiver_name FROM public.profiles WHERE id = NEW.receiver_id;
    INSERT INTO public.notifications (user_id, actor_id, type, title, body, link)
    VALUES (NEW.sender_id, NEW.receiver_id, 'match',
            'It''s a match!',
            COALESCE(receiver_name, 'Someone') || ' accepted your interest',
            '/profile/' || NEW.receiver_id);
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_notify_on_interest_status ON public.interests;
CREATE TRIGGER trg_notify_on_interest_status
AFTER UPDATE ON public.interests
FOR EACH ROW EXECUTE FUNCTION public.notify_on_interest_status();

CREATE OR REPLACE FUNCTION public.notify_on_message()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE sender_name text;
BEGIN
  SELECT full_name INTO sender_name FROM public.profiles WHERE id = NEW.sender_id;
  INSERT INTO public.notifications (user_id, actor_id, type, title, body, link)
  VALUES (NEW.receiver_id, NEW.sender_id, 'message',
          'New message',
          COALESCE(sender_name, 'Someone') || ': ' || left(NEW.content, 80),
          '/messages');
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_notify_on_message ON public.messages;
CREATE TRIGGER trg_notify_on_message
AFTER INSERT ON public.messages
FOR EACH ROW EXECUTE FUNCTION public.notify_on_message();

CREATE OR REPLACE FUNCTION public.notify_on_profile_view()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE viewer_name text; recent_count int;
BEGIN
  -- throttle: only one visitor notification per viewer→viewed per 24h
  SELECT count(*) INTO recent_count
  FROM public.notifications
  WHERE user_id = NEW.viewed_id AND actor_id = NEW.viewer_id
    AND type = 'visitor' AND created_at > now() - interval '24 hours';
  IF recent_count > 0 THEN RETURN NEW; END IF;
  SELECT full_name INTO viewer_name FROM public.profiles WHERE id = NEW.viewer_id;
  INSERT INTO public.notifications (user_id, actor_id, type, title, body, link)
  VALUES (NEW.viewed_id, NEW.viewer_id, 'visitor',
          'Profile visitor',
          COALESCE(viewer_name, 'Someone') || ' viewed your profile',
          '/profile/' || NEW.viewer_id);
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_notify_on_profile_view ON public.profile_views;
CREATE TRIGGER trg_notify_on_profile_view
AFTER INSERT ON public.profile_views
FOR EACH ROW EXECUTE FUNCTION public.notify_on_profile_view();
