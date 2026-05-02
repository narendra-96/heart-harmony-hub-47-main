import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import ProfileCard, { ProfileLite } from "@/components/ProfileCard";

const Shortlist = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<ProfileLite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: rows } = await supabase.from("shortlists").select("shortlisted_id").eq("user_id", user.id);
      const ids = (rows ?? []).map((r: any) => r.shortlisted_id);
      if (ids.length === 0) { setProfiles([]); setLoading(false); return; }
      const { data } = await supabase.from("profiles")
        .select("id, full_name, date_of_birth, city, state, religion, education, profession, height_cm, photo_url")
        .in("id", ids);
      setProfiles((data as any) || []);
      setLoading(false);
    })();
  }, [user]);

  const remove = async (id: string) => {
    if (!user) return;
    await supabase.from("shortlists").delete().eq("user_id", user.id).eq("shortlisted_id", id);
    setProfiles((p) => p.filter((x) => x.id !== id));
  };

  return (
    <div className="container py-10">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-4xl text-primary">Your Shortlist</h1>
        <p className="mt-1 text-muted-foreground">Profiles you'd like to revisit</p>
      </div>
      {loading ? <p className="text-center text-muted-foreground">Loading…</p>
        : profiles.length === 0 ? <p className="text-center text-muted-foreground">No saved profiles yet.</p>
        : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {profiles.map((p) => (
              <ProfileCard key={p.id} profile={p} shortlisted onShortlist={() => remove(p.id)} />
            ))}
          </div>
        )}
    </div>
  );
};

export default Shortlist;