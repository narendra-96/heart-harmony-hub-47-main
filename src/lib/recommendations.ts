import { calcAge } from "@/lib/age";

export function scoreProfile(prefs: any, p: any): number {
  if (!prefs) return 0;
  let score = 0;
  const age = calcAge(p.date_of_birth);
  if (age && prefs.pref_age_min && prefs.pref_age_max) {
    if (age >= prefs.pref_age_min && age <= prefs.pref_age_max) score += 30;
    else score -= Math.min(15, Math.abs(age - (prefs.pref_age_min + prefs.pref_age_max) / 2));
  }
  const inArr = (arr: string[] | null | undefined, v: string | null | undefined) =>
    arr && arr.length > 0 && v && arr.map((x) => x.toLowerCase()).includes(v.toLowerCase());

  if (inArr(prefs.pref_religions, p.religion)) score += 20;
  if (inArr(prefs.pref_mother_tongues, p.mother_tongue)) score += 15;
  if (inArr(prefs.pref_marital_statuses, p.marital_status)) score += 10;
  if (inArr(prefs.pref_diets, p.diet)) score += 10;
  if (inArr(prefs.pref_cities, p.city)) score += 15;
  if (p.is_verified) score += 5;
  return score;
}