
-- Fix mutable search path on handle_updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Restrict listing of profile-photos bucket (URLs still resolve publicly)
DROP POLICY IF EXISTS "Profile photos are publicly viewable" ON storage.objects;

CREATE POLICY "Authenticated users can read profile photos"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'profile-photos');

CREATE POLICY "Anonymous can read specific profile photo by path"
  ON storage.objects FOR SELECT TO anon
  USING (bucket_id = 'profile-photos' AND name IS NOT NULL);
