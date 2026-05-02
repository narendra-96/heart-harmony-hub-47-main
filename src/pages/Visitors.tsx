import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, Clock, Check, X } from "lucide-react";
import { calcAge } from "@/lib/age";
import { formatDistanceToNow } from "date-fns";

type Row = {
  viewer_id: string;
  last_viewed_at: string;
  view_count: number;
  profile: any;
  interest_status: "none" | "pending" | "accepted" | "declined";
  interest_direction: "incoming" | "outgoing" | null;
};

const statusBadge = (s: Row["interest_status"], dir: Row["interest_direction"]) => {
  if (s === "accepted") return <Badge className="bg-green-600 hover:bg-green-600"><Check className="mr-1 h-3 w-3" /> Matched</Badge>;
  if (s === "pending" && dir === "incoming") return <Badge className="bg-accent text-accent-foreground"><Heart className="mr-1 h-3 w-3" /> Wants to connect</Badge>;
  if (s === "pending" && dir === "outgoing") return <Badge variant="secondary"><Clock className="mr-1 h-3 w-3" /> Awaiting their reply</Badge>;
  if (s === "declined") return <Badge variant="outline"><X className="mr-1 h-3 w-3" /> Declined</Badge>;
  return <Badge variant="outline">No interest yet</Badge>;
};

const Visitors = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      const { data: views } = await supabase
        .from("profile_views")
        .select("viewer_id, created_at")
        .eq("viewed_id", user.id)
        .order("created_at", { ascending: false })
        .limit(200);

      if (!views || views.length === 0) {
        setRows([]);
        setLoading(false);
        return;
      }

      // Aggregate per viewer
      const map = new Map<string, { last: string; count: number }>();
      for (const v of views) {
        const cur = map.get(v.viewer_id);
        if (!cur) map.set(v.viewer_id, { last: v.created_at, count: 1 });
        else cur.count += 1;
      }
      const viewerIds = [...map.keys()];

      const [{ data: profiles }, { data: interests }] = await Promise.all([
        supabase.from("profiles").select("*").in("id", viewerIds),
        supabase
          .from("interests")
          .select("sender_id, receiver_id, status")
          .or(`and(sender_id.eq.${user.id},receiver_id.in.(${viewerIds.join(",")})),and(receiver_id.eq.${user.id},sender_id.in.(${viewerIds.join(",")}))`),
      ]);

      const result: Row[] = viewerIds.map((vid) => {
        const profile = profiles?.find((p) => p.id === vid);
        const intr = interests?.find(
          (i) => (i.sender_id === vid && i.receiver_id === user.id) || (i.sender_id === user.id && i.receiver_id === vid)
        );
        const direction: Row["interest_direction"] = intr
          ? intr.sender_id === user.id
            ? "outgoing"
            : "incoming"
          : null;
        const agg = map.get(vid)!;
        return {
          viewer_id: vid,
          last_viewed_at: agg.last,
          view_count: agg.count,
          profile,
          interest_status: (intr?.status as any) ?? "none",
          interest_direction: direction,
        };
      }).filter((r) => r.profile);

      setRows(result);
      setLoading(false);
    })();
  }, [user]);

  return (
    <div className="container max-w-5xl py-10">
      <div className="mb-8">
        <h1 className="font-serif text-4xl text-primary flex items-center gap-2">
          <Eye className="h-8 w-8" /> Profile Visitors
        </h1>
        <p className="mt-1 text-muted-foreground">See who viewed your profile and where they stand.</p>
      </div>

      {loading ? (
        <p className="text-center text-muted-foreground">Loading…</p>
      ) : rows.length === 0 ? (
        <Card className="p-10 text-center text-muted-foreground">
          No one has viewed your profile yet. Complete your profile and browse to get noticed!
        </Card>
      ) : (
        <div className="grid gap-4">
          {rows.map((r) => {
            const age = calcAge(r.profile.date_of_birth);
            return (
              <Card key={r.viewer_id} className="flex items-center gap-4 p-4 transition-shadow hover:shadow-elegant">
                <Link to={`/profile/${r.viewer_id}`} className="shrink-0">
                  <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-accent/30 bg-muted">
                    {r.profile.photo_url ? (
                      <img src={r.profile.photo_url} alt={r.profile.full_name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        <Heart className="h-6 w-6 opacity-30" />
                      </div>
                    )}
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/profile/${r.viewer_id}`} className="font-serif text-lg text-primary hover:underline">
                    {r.profile.full_name}{age ? `, ${age}` : ""}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {[r.profile.city, r.profile.profession].filter(Boolean).join(" • ")}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Viewed {r.view_count > 1 ? `${r.view_count} times • ` : ""}
                    {formatDistanceToNow(new Date(r.last_viewed_at), { addSuffix: true })}
                  </p>
                </div>
                <div>{statusBadge(r.interest_status, r.interest_direction)}</div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Visitors;
