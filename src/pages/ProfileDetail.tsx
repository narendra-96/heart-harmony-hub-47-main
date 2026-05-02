import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Star, MessageCircle, MapPin, GraduationCap, Briefcase, Home, Calendar, Lock, Phone, BadgeCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { calcAge } from "@/lib/age";
import ReportBlockMenu from "@/components/ReportBlockMenu";
import { Sparkles } from "lucide-react";

const Row = ({ icon: Icon, label, value }: any) =>
  value ? (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 text-accent" />
      <div><p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p><p className="text-foreground">{value}</p></div>
    </div>
  ) : null;

const ProfileDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [p, setP] = useState<any>(null);
  const [shortlisted, setShortlisted] = useState(false);
  const [interest, setInterest] = useState<{ status: string; sender_id: string } | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!id || !user) return;
    (async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", id).maybeSingle();
      setP(data);
      const { data: sl } = await supabase.from("shortlists").select("id").eq("user_id", user.id).eq("shortlisted_id", id).maybeSingle();
      setShortlisted(!!sl);
      const { data: ints } = await supabase.from("interests").select("status, sender_id")
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${id}),and(sender_id.eq.${id},receiver_id.eq.${user.id})`)
        .maybeSingle();
      setInterest(ints as any);
      const { data: pay } = await supabase
        .from("payment_unlocks")
        .select("id")
        .eq("payer_id", user.id)
        .eq("unlocked_profile_id", id)
        .maybeSingle();
      setUnlocked(!!pay || user.id === id);
      // Log a view (skip self-views; RLS also enforces this)
      if (user.id !== id) {
        await supabase.from("profile_views").insert({ viewer_id: user.id, viewed_id: id });
      }
    })();
  }, [id, user]);

  if (!p) return <div className="container py-12 text-center text-muted-foreground">Loading…</div>;
  const age = calcAge(p.date_of_birth);
  const isSelf = user?.id === p.id;
  const matched = interest?.status === "accepted";
  const photoHidden = p.photo_privacy === "matches_only" && !matched && !isSelf;
  const contactVisible = isSelf || matched || unlocked;

  const toggleShortlist = async () => {
    if (!user) return;
    if (shortlisted) {
      await supabase.from("shortlists").delete().eq("user_id", user.id).eq("shortlisted_id", p.id);
      setShortlisted(false);
    } else {
      await supabase.from("shortlists").insert({ user_id: user.id, shortlisted_id: p.id });
      setShortlisted(true);
    }
  };

  const sendInterest = async () => {
    const { error } = await supabase.from("interests").insert({ sender_id: user!.id, receiver_id: p.id });
    if (error) toast({ title: "Could not send", description: error.message, variant: "destructive" });
    else { setInterest({ status: "pending", sender_id: user!.id }); toast({ title: "Interest sent" }); }
  };

  const unlockContact = async () => {
    if (!user || !p) return;
    setPaying(true);
    try {
      const { data, error } = await supabase.functions.invoke("razorpay-create-order", {
        body: { unlocked_profile_id: p.id },
      });
      if (error || !data?.order) throw new Error(error?.message || "Order failed");

      const rzp = new window.Razorpay({
        key: data.key_id,
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        name: "Saath",
        description: `Unlock contact for ${p.full_name}`,
        prefill: { email: user.email },
        theme: { color: "#7c2d12" },
        handler: async (resp: any) => {
          const { error: vErr } = await supabase.functions.invoke("razorpay-verify-payment", {
            body: {
              razorpay_order_id: resp.razorpay_order_id,
              razorpay_payment_id: resp.razorpay_payment_id,
              razorpay_signature: resp.razorpay_signature,
              unlocked_profile_id: p.id,
            },
          });
          if (vErr) toast({ title: "Verification failed", description: vErr.message, variant: "destructive" });
          else { setUnlocked(true); toast({ title: "Contact unlocked 🔓" }); }
        },
      });
      rzp.open();
    } catch (e: any) {
      toast({ title: "Payment error", description: e.message, variant: "destructive" });
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="container max-w-5xl py-10">
      <Link to="/browse" className="mb-4 inline-block text-sm text-muted-foreground hover:text-primary">← Back to browse</Link>
      <Card className="overflow-hidden border-border/60">
        <div className="grid md:grid-cols-[2fr_3fr]">
          <div className="relative aspect-[4/5] bg-muted md:aspect-auto">
            {p.photo_url && !photoHidden ? (
              <img src={p.photo_url} alt={p.full_name} className="h-full w-full object-cover" />
            ) : photoHidden && p.photo_url ? (
              <>
                <img src={p.photo_url} alt="" aria-hidden className="h-full w-full object-cover blur-2xl scale-110" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/40 text-foreground">
                  <Lock className="h-8 w-8 text-accent" />
                  <p className="text-sm font-medium">Photo visible after match</p>
                </div>
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-cream">
                <Heart className="h-20 w-20 text-muted-foreground/30" />
              </div>
            )}
          </div>
          <div className="p-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-accent">Matrimonial profile</p>
                <h1 className="mt-2 flex items-center gap-2 font-serif text-4xl text-primary">
                  {p.full_name}{age ? `, ${age}` : ""}
                  {p.is_verified && (
                    <span title="Verified profile" className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent-foreground">
                      <BadgeCheck className="h-4 w-4 text-accent" /> Verified
                    </span>
                  )}
                </h1>
              </div>
              <ReportBlockMenu profileId={p.id} profileName={p.full_name} />
            </div>
            <p className="mt-1 text-muted-foreground">{[p.city, p.state, p.country].filter(Boolean).join(", ")}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Row icon={Calendar} label="Born" value={p.date_of_birth} />
              <Row icon={Home} label="Religion" value={[p.religion, p.community].filter(Boolean).join(" · ")} />
              <Row icon={GraduationCap} label="Education" value={p.education} />
              <Row icon={Briefcase} label="Profession" value={p.profession} />
              <Row icon={MapPin} label="Mother tongue" value={p.mother_tongue} />
              <Row icon={Heart} label="Marital status" value={p.marital_status?.replace(/_/g, " ")} />
            </div>

            {p.about_me && (
              <div className="mt-6">
                <h3 className="font-serif text-lg text-primary">About</h3>
                <p className="mt-1 text-muted-foreground">{p.about_me}</p>
              </div>
            )}
            {p.family_details && (
              <div className="mt-4">
                <h3 className="font-serif text-lg text-primary">Family</h3>
                <p className="mt-1 text-muted-foreground">{p.family_details}</p>
              </div>
            )}

            {(p.nakshatram || p.rasi || p.gothram || p.manglik || p.thidi || p.time_of_birth || p.place_of_birth) && (
              <div className="mt-6 rounded-lg border border-accent/30 bg-gradient-cream p-5 animate-fade-in">
                <h3 className="flex items-center gap-2 font-serif text-lg text-primary">
                  <Sparkles className="h-4 w-4 text-accent" /> Horoscope
                </h3>
                <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  {p.nakshatram && <p><span className="text-muted-foreground">Nakshatram:</span> {p.nakshatram}</p>}
                  {p.rasi && <p><span className="text-muted-foreground">Rasi:</span> {p.rasi}</p>}
                  {p.gothram && <p><span className="text-muted-foreground">Gothram:</span> {p.gothram}</p>}
                  {p.thidi && <p><span className="text-muted-foreground">Thidi:</span> {p.thidi}</p>}
                  {p.manglik && <p><span className="text-muted-foreground">Manglik:</span> {p.manglik}</p>}
                  {p.time_of_birth && <p><span className="text-muted-foreground">Time of birth:</span> {p.time_of_birth}{p.time_of_birth_period ? ` ${p.time_of_birth_period}` : ""}</p>}
                  {p.place_of_birth && <p><span className="text-muted-foreground">Place of birth:</span> {p.place_of_birth}</p>}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="outline" onClick={toggleShortlist}>
                <Star className={shortlisted ? "fill-accent text-accent" : ""} /> {shortlisted ? "Shortlisted" : "Shortlist"}
              </Button>
              {matched ? (
                <Button className="bg-gradient-royal text-primary-foreground" onClick={() => navigate(`/messages?with=${p.id}`)}>
                  <MessageCircle /> Message
                </Button>
              ) : interest ? (
                <Button disabled variant="secondary">
                  <Heart /> {interest.sender_id === user!.id ? `Interest ${interest.status}` : "Awaiting your response"}
                </Button>
              ) : (
                <Button className="bg-gradient-royal text-primary-foreground" onClick={sendInterest}>
                  <Heart /> Express interest
                </Button>
              )}
            </div>

            {/* Contact details — paywalled */}
            <div className="mt-8 rounded-lg border border-border/60 bg-muted/30 p-5">
              <h3 className="font-serif text-lg text-primary flex items-center gap-2">
                <Phone className="h-4 w-4" /> Contact details
              </h3>
              {contactVisible ? (
                <div className="mt-3 space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Phone:</span> {p.contact_phone || "—"}</p>
                  <p><span className="text-muted-foreground">Alt phone:</span> {p.alternate_phone || "—"}</p>
                  <p><span className="text-muted-foreground">Parent:</span> {p.parent_name || "—"} {p.parent_phone ? `(${p.parent_phone})` : ""}</p>
                  {matched && !unlocked && (
                    <p className="mt-2 text-xs text-accent-foreground/80">Visible because you matched.</p>
                  )}
                </div>
              ) : (
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Lock className="h-4 w-4" /> Contact details unlock when your interest is accepted, or pay ₹50 to view now.
                  </p>
                  <Button
                    onClick={unlockContact}
                    disabled={paying}
                    className="mt-3 bg-gradient-royal text-primary-foreground"
                  >
                    {paying ? "Opening…" : "Unlock for ₹50"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileDetail;