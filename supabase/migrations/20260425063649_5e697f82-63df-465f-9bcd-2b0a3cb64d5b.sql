
-- 1. Role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- 2. user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Security-definer role check (no recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- 4. Policies on user_roles
CREATE POLICY "Users view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage roles - insert"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage roles - delete"
  ON public.user_roles FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 5. Admin override on profiles (admins can update / delete anyone)
CREATE POLICY "Admins update any profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete any profile"
  ON public.profiles FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 6. Admin dashboard helper: list all users with last sign-in
CREATE OR REPLACE FUNCTION public.admin_list_users()
RETURNS TABLE (
  id uuid,
  email text,
  full_name text,
  gender public.gender_type,
  city text,
  is_complete boolean,
  contact_phone text,
  created_at timestamptz,
  last_sign_in_at timestamptz,
  is_admin boolean
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: admin only';
  END IF;

  RETURN QUERY
  SELECT
    p.id,
    u.email::text,
    p.full_name,
    p.gender,
    p.city,
    p.is_complete,
    p.contact_phone,
    p.created_at,
    u.last_sign_in_at,
    public.has_role(p.id, 'admin') AS is_admin
  FROM public.profiles p
  JOIN auth.users u ON u.id = p.id
  ORDER BY u.last_sign_in_at DESC NULLS LAST;
END;
$$;

-- 7. Admin stats helper
CREATE OR REPLACE FUNCTION public.admin_stats()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: admin only';
  END IF;

  SELECT jsonb_build_object(
    'total_users', (SELECT count(*) FROM public.profiles),
    'complete_profiles', (SELECT count(*) FROM public.profiles WHERE is_complete),
    'male_count', (SELECT count(*) FROM public.profiles WHERE gender = 'male'),
    'female_count', (SELECT count(*) FROM public.profiles WHERE gender = 'female'),
    'total_interests', (SELECT count(*) FROM public.interests),
    'matches', (SELECT count(*) FROM public.interests WHERE status = 'accepted'),
    'total_messages', (SELECT count(*) FROM public.messages),
    'signups_last_7d', (SELECT count(*) FROM public.profiles WHERE created_at > now() - interval '7 days'),
    'active_last_7d', (SELECT count(*) FROM auth.users WHERE last_sign_in_at > now() - interval '7 days')
  ) INTO result;

  RETURN result;
END;
$$;
