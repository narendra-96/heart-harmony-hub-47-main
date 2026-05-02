import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

const csvToArr = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean);
const arrToCsv = (a: string[] | null | undefined) => (a ?? []).join(", ");

const PartnerPreferencesCard = () => {
  const { user } = useAuth();
  const [age, setAge] = useState<[number, number]>([24, 32]);
  const [religions, setReligions] = useState("");
  const [tongues, setTongues] = useState("");
  const [marital, setMarital] = useState("");
  const [diets, setDiets] = useState("");
  const [cities, setCities] = useState("");
  const [minIncome, setMinIncome] = useState<string>("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select(
      "pref_age_min, pref_age_max, pref_religions, pref_mother_tongues, pref_marital_statuses, pref_diets, pref_cities, pref_min_income_lpa"
    ).eq("id", user.id).maybeSingle().then(({ data }) => {
      if (!data) return;
      setAge([data.pref_age_min ?? 24, data.pref_age_max ?? 32]);
      setReligions(arrToCsv(data.pref_religions as any));
      setTongues(arrToCsv(data.pref_mother_tongues as any));
      setMarital(arrToCsv(data.pref_marital_statuses as any));
      setDiets(arrToCsv(data.pref_diets as any));
      setCities(arrToCsv(data.pref_cities as any));
      setMinIncome(data.pref_min_income_lpa != null ? String(data.pref_min_income_lpa) : "");
    });
  }, [user]);

  const save = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({
      pref_age_min: age[0],
      pref_age_max: age[1],
      pref_religions: csvToArr(religions),
      pref_mother_tongues: csvToArr(tongues),
      pref_marital_statuses: csvToArr(marital),
      pref_diets: csvToArr(diets),
      pref_cities: csvToArr(cities),
      pref_min_income_lpa: minIncome ? Number(minIncome) : null,
    } as any).eq("id", user.id);
    setSaving(false);
    if (error) toast({ title: "Couldn't save", description: error.message, variant: "destructive" });
    else toast({ title: "Partner preferences saved" });
  };

  return (
    <Card className="mt-6 animate-fade-in border-border/60 p-6">
      <h2 className="flex items-center gap-2 font-serif text-2xl text-primary">
        <Sparkles className="h-5 w-5 text-accent" /> Partner preferences
      </h2>
      <p className="text-sm text-muted-foreground">Used to recommend matches and rank Browse results.</p>

      <div className="mt-5 space-y-5">
        <div>
          <Label>Age range: {age[0]} – {age[1]}</Label>
          <Slider min={18} max={70} step={1} value={age} onValueChange={(v) => setAge([v[0], v[1]] as any)} className="mt-3" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Religion(s) <span className="text-xs text-muted-foreground">comma-separated</span></Label>
            <Input value={religions} onChange={(e) => setReligions(e.target.value)} placeholder="Hindu, Sikh" />
          </div>
          <div>
            <Label>Mother tongue(s)</Label>
            <Input value={tongues} onChange={(e) => setTongues(e.target.value)} placeholder="Hindi, Tamil" />
          </div>
          <div>
            <Label>Marital status</Label>
            <Input value={marital} onChange={(e) => setMarital(e.target.value)} placeholder="never_married, divorced" />
          </div>
          <div>
            <Label>Diet</Label>
            <Input value={diets} onChange={(e) => setDiets(e.target.value)} placeholder="vegetarian, jain" />
          </div>
          <div>
            <Label>Preferred cities</Label>
            <Input value={cities} onChange={(e) => setCities(e.target.value)} placeholder="Bangalore, Mumbai" />
          </div>
          <div>
            <Label>Min income (LPA, ₹ lakhs)</Label>
            <Input type="number" value={minIncome} onChange={(e) => setMinIncome(e.target.value)} placeholder="10" />
          </div>
        </div>
        <Button onClick={save} disabled={saving} className="bg-gradient-royal text-primary-foreground shadow-elegant">
          {saving ? "Saving…" : "Save preferences"}
        </Button>
      </div>
    </Card>
  );
};

export default PartnerPreferencesCard;