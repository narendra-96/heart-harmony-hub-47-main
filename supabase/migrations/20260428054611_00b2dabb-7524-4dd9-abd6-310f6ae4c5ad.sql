
CREATE TABLE IF NOT EXISTS public.success_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_by uuid,
  couple_names text NOT NULL,
  location text,
  story text NOT NULL,
  photo_url text,
  married_on date,
  featured boolean NOT NULL DEFAULT false,
  approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.success_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved stories public" ON public.success_stories
  FOR SELECT TO anon, authenticated USING (approved = true OR submitted_by = auth.uid() OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users submit their own stories" ON public.success_stories
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = submitted_by);

CREATE POLICY "Admins update stories" ON public.success_stories
  FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete stories" ON public.success_stories
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_success_stories_updated
BEFORE UPDATE ON public.success_stories
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
