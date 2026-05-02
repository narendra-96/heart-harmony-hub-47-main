export type ProfileLike = Record<string, any>;

const FIELDS: { key: string; label: string; weight: number }[] = [
  { key: "photo_url", label: "Add a profile photo", weight: 15 },
  { key: "about_me", label: "Write a short About Me", weight: 10 },
  { key: "city", label: "Add your city", weight: 5 },
  { key: "education", label: "Add your education", weight: 5 },
  { key: "profession", label: "Add your profession", weight: 5 },
  { key: "annual_income", label: "Add your income", weight: 5 },
  { key: "religion", label: "Add your religion", weight: 5 },
  { key: "mother_tongue", label: "Add mother tongue", weight: 5 },
  { key: "height_cm", label: "Add your height", weight: 5 },
  { key: "diet", label: "Add your diet", weight: 5 },
  { key: "contact_phone", label: "Add your phone", weight: 5 },
  { key: "family_details", label: "Describe your family", weight: 5 },
  { key: "photo_url_2", label: "Add a second photo", weight: 8 },
  { key: "photo_url_3", label: "Add a third photo", weight: 7 },
  { key: "pref_age_min", label: "Set partner preferences", weight: 10 },
];

export function profileCompleteness(p: ProfileLike | null | undefined) {
  if (!p) return { percent: 0, missing: FIELDS.map((f) => f.label) };
  let score = 0;
  const missing: string[] = [];
  for (const f of FIELDS) {
    const v = p[f.key];
    const filled = v !== null && v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0);
    if (filled) score += f.weight;
    else missing.push(f.label);
  }
  const total = FIELDS.reduce((s, f) => s + f.weight, 0);
  return { percent: Math.round((score / total) * 100), missing };
}