import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import ProfileCard, { ProfileLite } from "@/components/ProfileCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { calcAge } from "@/lib/age";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const Browse = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<(ProfileLite & {
    community?: string | null; mother_tongue?: string | null;
    marital_status?: string | null; diet?: string | null; annual_income?: string | null;
  })[]>([]);
  const [shortlistIds, setShortlistIds] = useState<Set<string>>(new Set());
  const [interestIds, setInterestIds] = useState<Set<string>>(new Set());
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [religion, setReligion] = useState("");
  const [city, setCity] = useState("");
  const [profession, setProfession] = useState("");
  const [ageRange, setAgeRange] = useState<[number, number]>([21, 45]);
  const [community, setCommunity] = useState("");
  const [tongue, setTongue] = useState("");
  const [marital, setMarital] = useState("");
  const [diet, setDiet] = useState("");
  const [minIncomeLpa, setMinIncomeLpa] = useState("");
  const [myGender, setMyGender] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const { data: me } = await supabase.from("profiles").select("gender").eq("id", user.id).maybeSingle();
      setMyGender(me?.gender ?? null);
      const oppGender = me?.gender === "male" ? "female" : me?.gender === "female" ? "male" : null;

      let query = supabase
        .from("profiles")
        .select("id, full_name, date_of_birth, city, state, religion, community, mother_tongue, marital_status, diet, annual_income, education, profession, height_cm, photo_url, gender, is_verified, photo_privacy, last_seen_at")
        .neq("id", user.id);
      if (oppGender) query = query.eq("gender", oppGender as any);
      const { data } = await query.order("created_at", { ascending: false }).limit(60);
      setProfiles((data as any) || []);

      const [{ data: sl }, { data: ints }, { data: accepted }] = await Promise.all([
        supabase.from("shortlists").select("shortlisted_id").eq("user_id", user.id),
        supabase.from("interests").select("receiver_id").eq("sender_id", user.id),
        supabase.from("interests").select("sender_id, receiver_id").eq("status", "accepted")
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`),
      ]);
      setShortlistIds(new Set((sl ?? []).map((r: any) => r.shortlisted_id)));
      setInterestIds(new Set((ints ?? []).map((r: any) => r.receiver_id)));
      setMatchedIds(new Set((accepted ?? []).map((r: any) =>
        r.sender_id === user.id ? r.receiver_id : r.sender_id
      )));
      setLoading(false);
    };
    load();
  }, [user]);

  const parseIncomeLpa = (s: string | null | undefined) => {
    if (!s) return null;
    const m = String(s).match(/(\d+(?:\.\d+)?)/);
    return m ? parseFloat(m[1]) : null;
  };

  const filtered = useMemo(() => {
    return profiles.filter((p) => {
      if (search && !p.full_name.toLowerCase().includes(search.toLowerCase())) return false;
      if (religion && (p.religion || "").toLowerCase() !== religion.toLowerCase()) return false;
      if (city && !(p.city || "").toLowerCase().includes(city.toLowerCase())) return false;
      if (profession && !(p.profession || "").toLowerCase().includes(profession.toLowerCase())) return false;
      if (community && !(p.community || "").toLowerCase().includes(community.toLowerCase())) return false;
      if (tongue && !(p.mother_tongue || "").toLowerCase().includes(tongue.toLowerCase())) return false;
      if (marital && (p.marital_status || "").toLowerCase() !== marital.toLowerCase()) return false;
      if (diet && (p.diet || "").toLowerCase() !== diet.toLowerCase()) return false;
      if (minIncomeLpa) {
        const inc = parseIncomeLpa(p.annual_income);
        if (inc === null || inc < +minIncomeLpa) return false;
      }
      const age = calcAge(p.date_of_birth);
      if (age && (age < ageRange[0] || age > ageRange[1])) return false;
      return true;
    });
  }, [profiles, search, religion, city, profession, community, tongue, marital, diet, minIncomeLpa, ageRange]);

  const resetFilters = () => {
    setSearch(""); setReligion(""); setCity(""); setProfession("");
    setCommunity(""); setTongue(""); setMarital(""); setDiet("");
    setMinIncomeLpa(""); setAgeRange([21, 45]);
  };

  const toggleShortlist = async (id: string) => {
    if (!user) return;
    if (shortlistIds.has(id)) {
      await supabase.from("shortlists").delete().eq("user_id", user.id).eq("shortlisted_id", id);
      const next = new Set(shortlistIds); next.delete(id); setShortlistIds(next);
    } else {
      const { error } = await supabase.from("shortlists").insert({ user_id: user.id, shortlisted_id: id });
      if (!error) {
        const next = new Set(shortlistIds); next.add(id); setShortlistIds(next);
        toast({ title: "Added to shortlist" });
      }
    }
  };

  const sendInterest = async (id: string) => {
    if (!user || interestIds.has(id)) return;
    const { error } = await supabase.from("interests").insert({ sender_id: user.id, receiver_id: id });
    if (error) {
      toast({ title: "Could not send", description: error.message, variant: "destructive" });
    } else {
      const next = new Set(interestIds); next.add(id); setInterestIds(next);
      toast({ title: "Interest sent" });
    }
  };

  return (
    <div className="container py-10">
      <div className="mb-8 text-center">
        <p className="ornament-divider mx-auto max-w-xs text-xs uppercase tracking-widest">Discover</p>
        <h1 className="mt-4 font-serif text-4xl text-primary">Browse Matches</h1>
        <p className="mt-1 text-muted-foreground">Profiles tailored for you</p>
      </div>

      <Card className="mb-8 animate-fade-in border-border/60 bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-medium text-primary">
            <Filter className="h-4 w-4" /> Filters
          </p>
          <Button variant="ghost" size="sm" onClick={resetFilters}>Reset</Button>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          <div><Label className="text-xs">Search</Label><Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Name" /></div>
          <div><Label className="text-xs">Religion</Label><Input value={religion} onChange={(e) => setReligion(e.target.value)} placeholder="Hindu, Muslim…" /></div>
          <div><Label className="text-xs">Caste / community</Label><Input value={community} onChange={(e) => setCommunity(e.target.value)} placeholder="Brahmin, Iyer…" /></div>
          <div><Label className="text-xs">Mother tongue</Label><Input value={tongue} onChange={(e) => setTongue(e.target.value)} placeholder="Hindi, Tamil…" /></div>
          <div><Label className="text-xs">City</Label><Input value={city} onChange={(e) => setCity(e.target.value)} /></div>
          <div><Label className="text-xs">Profession</Label><Input value={profession} onChange={(e) => setProfession(e.target.value)} /></div>
          <div>
            <Label className="text-xs">Marital status</Label>
            <select value={marital} onChange={(e) => setMarital(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="">Any</option>
              <option value="never_married">Never married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
              <option value="awaiting_divorce">Awaiting divorce</option>
            </select>
          </div>
          <div>
            <Label className="text-xs">Diet</Label>
            <select value={diet} onChange={(e) => setDiet(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="">Any</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="non_vegetarian">Non-vegetarian</option>
              <option value="eggetarian">Eggetarian</option>
              <option value="vegan">Vegan</option>
              <option value="jain">Jain</option>
            </select>
          </div>
          <div><Label className="text-xs">Min income (LPA)</Label><Input type="number" value={minIncomeLpa} onChange={(e) => setMinIncomeLpa(e.target.value)} placeholder="10" /></div>
          <div className="md:col-span-3">
            <Label className="text-xs">Age: {ageRange[0]} – {ageRange[1]}</Label>
            <Slider min={18} max={70} step={1} value={ageRange} onValueChange={(v) => setAgeRange([v[0], v[1]] as any)} className="mt-3" />
          </div>
        </div>
      </Card>

      {loading ? (
        <p className="text-center text-muted-foreground">Loading matches…</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-muted-foreground">No matches found. Try widening your filters.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p, i) => (
            <div key={p.id} className="animate-fade-in" style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}>
              <ProfileCard
                profile={p}
                shortlisted={shortlistIds.has(p.id)}
                interestSent={interestIds.has(p.id)}
                matched={matchedIds.has(p.id)}
                onShortlist={() => toggleShortlist(p.id)}
                onInterest={() => sendInterest(p.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Browse;