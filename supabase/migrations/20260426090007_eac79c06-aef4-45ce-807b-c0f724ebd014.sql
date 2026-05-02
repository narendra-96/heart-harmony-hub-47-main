-- Payment unlocks table
CREATE TABLE public.payment_unlocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payer_id uuid NOT NULL,
  unlocked_profile_id uuid NOT NULL,
  razorpay_order_id text NOT NULL,
  razorpay_payment_id text NOT NULL,
  razorpay_signature text NOT NULL,
  amount_paise integer NOT NULL DEFAULT 5000,
  status text NOT NULL DEFAULT 'paid',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (payer_id, unlocked_profile_id)
);

ALTER TABLE public.payment_unlocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own unlocks"
  ON public.payment_unlocks FOR SELECT
  TO authenticated
  USING (auth.uid() = payer_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage unlocks"
  ON public.payment_unlocks FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_payment_unlocks_payer ON public.payment_unlocks(payer_id);
CREATE INDEX idx_payment_unlocks_target ON public.payment_unlocks(unlocked_profile_id);

-- Drop and recreate admin_list_users with richer data
DROP FUNCTION IF EXISTS public.admin_list_users();

CREATE OR REPLACE FUNCTION public.admin_list_users()
RETURNS TABLE(
  id uuid,
  email text,
  full_name text,
  gender gender_type,
  date_of_birth date,
  marital_status marital_status_type,
  religion text,
  community text,
  mother_tongue text,
  height_cm integer,
  city text,
  state text,
  country text,
  education text,
  profession text,
  annual_income text,
  contact_phone text,
  photo_url text,
  about_me text,
  is_complete boolean,
  created_at timestamptz,
  updated_at timestamptz,
  last_sign_in_at timestamptz,
  is_admin boolean
)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: admin only';
  END IF;

  RETURN QUERY
  SELECT
    p.id, u.email::text, p.full_name, p.gender, p.date_of_birth,
    p.marital_status, p.religion, p.community, p.mother_tongue, p.height_cm,
    p.city, p.state, p.country, p.education, p.profession, p.annual_income,
    p.contact_phone, p.photo_url, p.about_me,
    p.is_complete, p.created_at, p.updated_at, u.last_sign_in_at,
    public.has_role(p.id, 'admin') AS is_admin
  FROM public.profiles p
  JOIN auth.users u ON u.id = p.id
  ORDER BY p.updated_at DESC NULLS LAST;
END;
$$;