import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import ProfileCard, { ProfileLite } from "@/components/ProfileCard";
import { scoreProfile } from "@/lib/recommendations";

const RecommendedMatches = () => {
  const { user } = useAuth();
  const [picks, setPicks] = useState<ProfileLite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const { data: me } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      const oppGender = me?.gender === "male" ? "female" : me?.gender === "female" ? "male" : null;
      let q = supabase
        .from("profiles")
        .select("id, full_name, date_of_birth, city, state, religion, mother_tongue, marital_status, diet, education, profession, height_cm, photo_url, gender, is_verified, photo_privacy, last_seen_at")
        .neq("id", user.id);
      if (oppGender) q = q.eq("gender", oppGender as any);
      const { data } = await q.limit(80);
      const scored = ((data as any[]) ?? [])
        .map((p) => ({ p, s: scoreProfile(me, p) }))
        .sort((a, b) => b.s - a.s)
        .slice(0, 6)
        .map((x) => x.p);
      setPicks(scored);
      setLoading(false);
    };
    load();
  }, [user]);

  if (!user) return null;

  return (
    <section className="container py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="ornament-divider mx-auto max-w-xs text-sm uppercase tracking-widest">For you</p>
        <h2 className="mt-4 font-serif text-4xl text-primary">Recommended matches</h2>
        <p className="mt-2 text-muted-foreground">Hand-picked based on your partner preferences.</p>
      </div>
      {loading ? (
        <p className="mt-10 text-center text-muted-foreground">Finding matches…</p>
      ) : picks.length === 0 ? (
        <p className="mt-10 text-center text-muted-foreground">Set your partner preferences to see recommendations.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((p, i) => (
            <div key={p.id} style={{ animationDelay: `${i * 60}ms` }} className="animate-fade-in">
              <ProfileCard profile={p} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecommendedMatches;