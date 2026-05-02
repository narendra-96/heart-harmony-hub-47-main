
CREATE TABLE IF NOT EXISTS public.profile_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  viewer_id UUID NOT NULL,
  viewed_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profile_views_viewed ON public.profile_views(viewed_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profile_views_viewer ON public.profile_views(viewer_id, created_at DESC);

ALTER TABLE public.profile_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users record their own views"
  ON public.profile_views FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = viewer_id AND viewer_id <> viewed_id);

CREATE POLICY "Users see views of their own profile or their own history"
  ON public.profile_views FOR SELECT TO authenticated
  USING (auth.uid() = viewed_id OR auth.uid() = viewer_id);
