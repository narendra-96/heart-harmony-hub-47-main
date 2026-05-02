import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Check, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Row = { id: string; status: string; sender_id: string; receiver_id: string; profile: any };

const Interests = () => {
  const { user } = useAuth();
  const [received, setReceived] = useState<Row[]>([]);
  const [sent, setSent] = useState<Row[]>([]);
  const [tab, setTab] = useState<"received" | "sent">("received");

  const load = async () => {
    if (!user) return;
    const [{ data: rec }, { data: snt }] = await Promise.all([
      supabase.from("interests").select("id, status, sender_id, receiver_id").eq("receiver_id", user.id),
      supabase.from("interests").select("id, status, sender_id, receiver_id").eq("sender_id", user.id),
    ]);
    const allIds = Array.from(new Set([...(rec ?? []).map((r: any) => r.sender_id), ...(snt ?? []).map((r: any) => r.receiver_id)]));
    const { data: profiles } = allIds.length
      ? await supabase.from("profiles").select("id, full_name, photo_url, city, profession").in("id", allIds)
      : { data: [] as any[] };
    const map = new Map((profiles ?? []).map((p: any) => [p.id, p]));
    setReceived((rec ?? []).map((r: any) => ({ ...r, profile: map.get(r.sender_id) })));
    setSent((snt ?? []).map((r: any) => ({ ...r, profile: map.get(r.receiver_id) })));
  };
  useEffect(() => { load(); }, [user]);

  const respond = async (id: string, status: "accepted" | "declined") => {
    const { error } = await supabase.from("interests").update({ status }).eq("id", id);
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else { toast({ title: status === "accepted" ? "It's a match!" : "Declined" }); load(); }
  };

  const list = tab === "received" ? received : sent;

  return (
    <div className="container py-10">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-4xl text-primary">Interests</h1>
      </div>
      <div className="mx-auto mb-6 flex w-fit gap-2 rounded-lg bg-muted p-1">
        {(["received", "sent"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize ${tab === t ? "bg-card text-primary shadow-sm" : "text-muted-foreground"}`}>
            {t} ({t === "received" ? received.length : sent.length})
          </button>
        ))}
      </div>
      {list.length === 0 ? (
        <p className="text-center text-muted-foreground">Nothing here yet.</p>
      ) : (
        <div className="mx-auto max-w-2xl space-y-3">
          {list.map((r) => (
            <Card key={r.id} className="flex items-center gap-4 p-4">
              <Link to={`/profile/${r.profile?.id}`} className="flex flex-1 items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-full bg-muted">
                  {r.profile?.photo_url
                    ? <img src={r.profile.photo_url} alt={r.profile.full_name} className="h-full w-full object-cover" />
                    : <div className="flex h-full w-full items-center justify-center"><Heart className="h-5 w-5 text-muted-foreground/40" /></div>}
                </div>
                <div className="flex-1">
                  <p className="font-serif text-lg text-primary">{r.profile?.full_name ?? "—"}</p>
                  <p className="text-xs text-muted-foreground">{[r.profile?.profession, r.profile?.city].filter(Boolean).join(" · ")}</p>
                </div>
              </Link>
              {tab === "received" && r.status === "pending" ? (
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => respond(r.id, "accepted")} className="bg-gradient-royal text-primary-foreground"><Check /> Accept</Button>
                  <Button size="sm" variant="outline" onClick={() => respond(r.id, "declined")}><X /> Decline</Button>
                </div>
              ) : (
                <span className={`rounded-full px-3 py-1 text-xs capitalize ${
                  r.status === "accepted" ? "bg-accent/20 text-accent-foreground" :
                  r.status === "declined" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
                }`}>{r.status}</span>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Interests;