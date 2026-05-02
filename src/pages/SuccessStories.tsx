import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, Quote, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import SeoHead from "@/components/SeoHead";

type Story = {
  id: string;
  couple_names: string;
  location: string | null;
  story: string;
  photo_url: string | null;
  married_on: string | null;
  featured: boolean;
};

const SuccessStories = () => {
  const { user } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ couple_names: "", location: "", story: "", married_on: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase
      .from("success_stories")
      .select("id, couple_names, location, story, photo_url, married_on, featured")
      .eq("approved", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .then(({ data }) => { setStories((data as any) ?? []); setLoading(false); });
  }, []);

  const submit = async () => {
    if (!user) return;
    if (!form.couple_names.trim() || !form.story.trim()) {
      toast({ title: "Please fill couple names and story", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("success_stories").insert({
      submitted_by: user.id,
      couple_names: form.couple_names,
      location: form.location || null,
      story: form.story,
      married_on: form.married_on || null,
    });
    setSubmitting(false);
    if (error) toast({ title: "Couldn't submit", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Thank you!", description: "Your story is awaiting review." });
      setForm({ couple_names: "", location: "", story: "", married_on: "" });
      setShowForm(false);
    }
  };

  return (
    <div className="container max-w-5xl py-12">
      <SeoHead
        title="Success Stories — Real Couples Who Found Love on Saath"
        description="Read inspiring stories of couples who met their life partner on Saath. Genuine matrimonial success stories from across India."
        canonical="https://heart-harmony-hub-47.lovable.app/success-stories"
      />
      <div className="mb-10 text-center">
        <p className="ornament-divider mx-auto max-w-xs text-xs uppercase tracking-widest">Inspired by love</p>
        <h1 className="mt-4 font-serif text-4xl text-primary md:text-5xl">Success Stories</h1>
        <p className="mt-2 text-muted-foreground">Real couples who began their forever on Saath.</p>
      </div>

      {loading ? (
        <p className="text-center text-muted-foreground">Loading stories…</p>
      ) : stories.length === 0 ? (
        <Card className="mx-auto max-w-xl p-10 text-center">
          <Sparkles className="mx-auto mb-3 h-8 w-8 text-accent" />
          <p className="font-serif text-xl text-primary">Your story could be the first.</p>
          <p className="mt-2 text-sm text-muted-foreground">When a Saath match leads to marriage, we'd love to celebrate it here.</p>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {stories.map((s, i) => (
            <Card key={s.id} className="group overflow-hidden border-border/60 transition-all hover:-translate-y-1 hover:shadow-elegant animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
              {s.photo_url && (
                <img src={s.photo_url} alt={`${s.couple_names} — Saath success story`} loading="lazy" className="h-56 w-full object-cover" />
              )}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl text-primary">{s.couple_names}</h2>
                  {s.featured && <span className="rounded-full bg-gradient-gold px-2 py-0.5 text-[10px] font-semibold text-accent-foreground shadow-gold">Featured</span>}
                </div>
                <p className="text-xs text-muted-foreground">
                  {[s.location, s.married_on ? `Married ${new Date(s.married_on).toLocaleDateString(undefined, { month: "long", year: "numeric" })}` : null].filter(Boolean).join(" · ")}
                </p>
                <Quote className="mt-4 h-5 w-5 text-accent/60" />
                <p className="mt-1 italic text-foreground/80">{s.story}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        {!user ? (
          <p className="text-sm text-muted-foreground">Sign in to share your own story.</p>
        ) : !showForm ? (
          <Button onClick={() => setShowForm(true)} className="bg-gradient-royal text-primary-foreground shadow-elegant">
            <Heart /> Share your story
          </Button>
        ) : (
          <Card className="mx-auto mt-6 max-w-xl p-6 text-left animate-fade-in">
            <h2 className="font-serif text-2xl text-primary">Share your story</h2>
            <p className="text-sm text-muted-foreground">We'll review it before publishing.</p>
            <div className="mt-4 grid gap-3">
              <div><Label>Couple names</Label><Input value={form.couple_names} onChange={(e) => setForm({ ...form, couple_names: e.target.value })} placeholder="Priya & Arjun" /></div>
              <div><Label>Location</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Bangalore, India" /></div>
              <div><Label>Married on</Label><Input type="date" value={form.married_on} onChange={(e) => setForm({ ...form, married_on: e.target.value })} /></div>
              <div><Label>Your story</Label><Textarea rows={5} value={form.story} onChange={(e) => setForm({ ...form, story: e.target.value })} placeholder="How you met, what made it special…" /></div>
              <div className="flex gap-2">
                <Button onClick={submit} disabled={submitting} className="bg-gradient-royal text-primary-foreground">
                  {submitting ? "Submitting…" : "Submit"}
                </Button>
                <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SuccessStories;