
DROP FUNCTION IF EXISTS public.admin_list_users();

CREATE OR REPLACE FUNCTION public.admin_list_users()
 RETURNS TABLE(
   id uuid, email text, full_name text, gender gender_type, date_of_birth date,
   marital_status marital_status_type, religion text, community text, mother_tongue text,
   height_cm integer, city text, state text, country text, education text, profession text,
   annual_income text, contact_phone text, photo_url text, about_me text,
   is_complete boolean, is_verified boolean, is_banned boolean,
   created_at timestamptz, updated_at timestamptz, last_sign_in_at timestamptz, is_admin boolean
 )
 LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public
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
    p.is_complete, p.is_verified, p.is_banned,
    p.created_at, p.updated_at, u.last_sign_in_at,
    public.has_role(p.id, 'admin') AS is_admin
  FROM public.profiles p
  JOIN auth.users u ON u.id = p.id
  ORDER BY p.updated_at DESC NULLS LAST;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_list_reports()
 RETURNS TABLE(
   id uuid, reporter_id uuid, reporter_name text,
   reported_id uuid, reported_name text,
   reason text, details text, status text,
   created_at timestamptz
 )
 LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: admin only';
  END IF;
  RETURN QUERY
  SELECT r.id, r.reporter_id, pr.full_name,
         r.reported_id, pd.full_name,
         r.reason, r.details, r.status, r.created_at
  FROM public.reports r
  LEFT JOIN public.profiles pr ON pr.id = r.reporter_id
  LEFT JOIN public.profiles pd ON pd.id = r.reported_id
  ORDER BY r.created_at DESC;
END;
$$;
