// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import { useAuth } from "@/lib/auth";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { ShieldCheck, Users, Heart, MessageCircle, TrendingUp, Search, Eye, BadgeCheck, Ban, Flag } from "lucide-react";
// import { toast } from "@/hooks/use-toast";
// import { formatDistanceToNow, format } from "date-fns";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// type AdminUser = {
//   id: string;
//   email: string;
//   full_name: string;
//   gender: string;
//   date_of_birth: string | null;
//   marital_status: string | null;
//   religion: string | null;
//   community: string | null;
//   mother_tongue: string | null;
//   height_cm: number | null;
//   city: string | null;
//   state: string | null;
//   country: string | null;
//   education: string | null;
//   profession: string | null;
//   annual_income: string | null;
//   about_me: string | null;
//   photo_url: string | null;
//   is_complete: boolean;
//   contact_phone: string | null;
//   created_at: string;
//   updated_at: string;
//   last_sign_in_at: string | null;
//   is_admin: boolean;
//   is_verified: boolean;
//   is_banned: boolean;
// };

// type Report = {
//   id: string;
//   reporter_id: string;
//   reporter_name: string | null;
//   reported_id: string;
//   reported_name: string | null;
//   reason: string;
//   details: string | null;
//   status: string;
//   created_at: string;
// };

// const Admin = () => {
//   const { user, loading: authLoading } = useAuth();
//   const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
//   const [users, setUsers] = useState<AdminUser[]>([]);
//   const [stats, setStats] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [selected, setSelected] = useState<AdminUser | null>(null);
//   const [tab, setTab] = useState<"users" | "reports">("users");
//   const [reports, setReports] = useState<Report[]>([]);

//   useEffect(() => {
//     if (authLoading || !user) return;
//     (async () => {
//       const { data } = await supabase
//         .from("user_roles")
//         .select("role")
//         .eq("user_id", user.id)
//         .eq("role", "admin")
//         .maybeSingle();
//       setIsAdmin(!!data);
//     })();
//   }, [user, authLoading]);

//   useEffect(() => {
//     if (!isAdmin) return;
//     loadData();
//   }, [isAdmin]);

//   const loadData = async () => {
//     setLoading(true);
//     const [{ data: u, error: ue }, { data: s, error: se }, { data: r }] = await Promise.all([
//       supabase.rpc("admin_list_users"),
//       supabase.rpc("admin_stats"),
//       supabase.rpc("admin_list_reports"),
//     ]);
//     if (ue) toast({ title: "Couldn't load users", description: ue.message, variant: "destructive" });
//     if (se) toast({ title: "Couldn't load stats", description: se.message, variant: "destructive" });
//     setUsers((u as AdminUser[]) || []);
//     setStats(s || null);
//     setReports((r as Report[]) || []);
//     setLoading(false);
//   };

//   const toggleAdmin = async (u: AdminUser) => {
//     if (u.is_admin) {
//       const { error } = await supabase.from("user_roles").delete().eq("user_id", u.id).eq("role", "admin");
//       if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
//       toast({ title: "Admin removed", description: u.full_name });
//     } else {
//       const { error } = await supabase.from("user_roles").insert({ user_id: u.id, role: "admin" });
//       if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
//       toast({ title: "Admin granted", description: u.full_name });
//     }
//     loadData();
//   };

//   const deleteProfile = async (u: AdminUser) => {
//     if (!confirm(`Delete profile of ${u.full_name}? This cannot be undone.`)) return;
//     const { error } = await supabase.from("profiles").delete().eq("id", u.id);
//     if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
//     toast({ title: "Profile deleted" });
//     loadData();
//   };

//   const toggleVerified = async (u: AdminUser) => {
//     const { error } = await supabase.from("profiles").update({ is_verified: !u.is_verified } as any).eq("id", u.id);
//     if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
//     toast({ title: u.is_verified ? "Verification removed" : "Profile verified" });
//     loadData();
//   };

//   const toggleBanned = async (u: AdminUser) => {
//     if (!u.is_banned && !confirm(`Ban ${u.full_name}? They will be hidden from all members.`)) return;
//     const { error } = await supabase.from("profiles").update({ is_banned: !u.is_banned } as any).eq("id", u.id);
//     if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
//     toast({ title: u.is_banned ? "User unbanned" : "User banned" });
//     loadData();
//   };

//   const updateReportStatus = async (id: string, status: string) => {
//     const { error } = await supabase.from("reports").update({ status }).eq("id", id);
//     if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
//     toast({ title: `Report marked ${status}` });
//     loadData();
//   };

//   if (authLoading || isAdmin === null) {
//     return <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">Loading…</div>;
//   }
//   if (!user) return <Navigate to="/auth" replace />;
//   if (!isAdmin) {
//     return (
//       <div className="container py-16 text-center">
//         <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
//         <h1 className="font-serif text-3xl text-primary">Admin only</h1>
//         <p className="mt-2 text-muted-foreground">You don't have access to this area.</p>
//       </div>
//     );
//   }

//   const filtered = users.filter((u) =>
//     !search ||
//     u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
//     u.email?.toLowerCase().includes(search.toLowerCase()) ||
//     u.city?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="container py-10">
//       <div className="mb-8 flex items-center gap-3">
//         <ShieldCheck className="h-8 w-8 text-primary" />
//         <div>
//           <h1 className="font-serif text-3xl text-primary">Admin Dashboard</h1>
//           <p className="text-sm text-muted-foreground">Manage users, monitor activity, grant access.</p>
//         </div>
//       </div>

//       {/* Stats */}
//       {stats && (
//         <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
//           <StatCard icon={<Users className="h-5 w-5" />} label="Total Users" value={stats.total_users} sub={`${stats.complete_profiles} complete`} />
//           <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Active (7d)" value={stats.active_last_7d} sub={`${stats.signups_last_7d} new signups`} />
//           <StatCard icon={<Heart className="h-5 w-5" />} label="Interests" value={stats.total_interests} sub={`${stats.matches} matches`} />
//           <StatCard icon={<MessageCircle className="h-5 w-5" />} label="Messages" value={stats.total_messages} sub={`${stats.male_count}M / ${stats.female_count}F`} />
//         </div>
//       )}

//       {/* Search */}
//       <div className="mb-4 flex items-center gap-2 flex-wrap">
//         <div className="flex gap-1 rounded-lg bg-muted p-1">
//           {(["users", "reports"] as const).map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`rounded-md px-3 py-1 text-sm font-medium capitalize ${tab === t ? "bg-card text-primary shadow-sm" : "text-muted-foreground"}`}
//             >
//               {t} {t === "reports" && reports.filter(r => r.status === "pending").length > 0 && (
//                 <span className="ml-1 rounded-full bg-destructive px-1.5 text-[10px] text-destructive-foreground">
//                   {reports.filter(r => r.status === "pending").length}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>
//         {tab === "users" && <>
//         <Search className="h-4 w-4 text-muted-foreground" />
//         <Input
//           placeholder="Search by name, email, or city…"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="max-w-sm"
//         />
//         <span className="text-sm text-muted-foreground">{filtered.length} of {users.length}</span>
//         </>}
//       </div>

//       {/* Users table */}
//       {tab === "users" && (
//       <Card className="overflow-hidden border-border/60">
//         {loading ? (
//           <div className="p-8 text-center text-muted-foreground">Loading users…</div>
//         ) : (
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Email / Phone</TableHead>
//                 <TableHead>City</TableHead>
//                 <TableHead>Joined</TableHead>
//                 <TableHead>Profile filled at</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filtered.map((u) => (
//                 <TableRow key={u.id} className={u.is_banned ? "opacity-60" : ""}>
//                   <TableCell className="font-medium">
//                     {u.full_name}
//                     {u.is_admin && <Badge variant="default" className="ml-2 bg-primary">Admin</Badge>}
//                     {u.is_verified && <Badge variant="outline" className="ml-2 border-accent text-accent"><BadgeCheck className="mr-1 h-3 w-3" />Verified</Badge>}
//                     {u.is_banned && <Badge variant="destructive" className="ml-2">Banned</Badge>}
//                   </TableCell>
//                   <TableCell className="text-xs text-muted-foreground">
//                     <div>{u.email}</div>
//                     {u.contact_phone && <div>{u.contact_phone}</div>}
//                   </TableCell>
//                   <TableCell className="text-sm">{u.city || "—"}</TableCell>
//                   <TableCell className="text-xs text-muted-foreground">
//                     {formatDistanceToNow(new Date(u.created_at), { addSuffix: true })}
//                   </TableCell>
//                   <TableCell className="text-xs text-muted-foreground">
//                     {u.updated_at ? (
//                       <div>
//                         <div>{format(new Date(u.updated_at), "dd MMM yyyy, HH:mm")}</div>
//                         <div className="text-[10px]">{formatDistanceToNow(new Date(u.updated_at), { addSuffix: true })}</div>
//                       </div>
//                     ) : "—"}
//                   </TableCell>
//                   <TableCell>
//                     {u.is_complete ? (
//                       <Badge variant="secondary">Complete</Badge>
//                     ) : (
//                       <Badge variant="outline">Incomplete</Badge>
//                     )}
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <Button size="sm" variant="ghost" onClick={() => setSelected(u)}>
//                       <Eye className="h-4 w-4" />
//                     </Button>
//                     <Button size="sm" variant="ghost" onClick={() => toggleVerified(u)} title={u.is_verified ? "Remove verification" : "Mark verified"}>
//                       <BadgeCheck className={`h-4 w-4 ${u.is_verified ? "text-accent" : ""}`} />
//                     </Button>
//                     <Button size="sm" variant="ghost" onClick={() => toggleBanned(u)} title={u.is_banned ? "Unban" : "Ban"}>
//                       <Ban className={`h-4 w-4 ${u.is_banned ? "text-destructive" : ""}`} />
//                     </Button>
//                     <Button size="sm" variant="ghost" onClick={() => toggleAdmin(u)}>
//                       {u.is_admin ? "Revoke" : "Make Admin"}
//                     </Button>
//                     <Button size="sm" variant="ghost" className="text-destructive" onClick={() => deleteProfile(u)}>
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         )}
//       </Card>
//       )}

//       {tab === "reports" && (
//         <Card className="overflow-hidden border-border/60">
//           {reports.length === 0 ? (
//             <div className="p-8 text-center text-muted-foreground">
//               <Flag className="mx-auto mb-2 h-6 w-6" /> No reports yet.
//             </div>
//           ) : (
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>When</TableHead>
//                   <TableHead>Reporter</TableHead>
//                   <TableHead>Reported</TableHead>
//                   <TableHead>Reason</TableHead>
//                   <TableHead>Details</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {reports.map((r) => (
//                   <TableRow key={r.id}>
//                     <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
//                       {formatDistanceToNow(new Date(r.created_at), { addSuffix: true })}
//                     </TableCell>
//                     <TableCell className="text-sm">{r.reporter_name || "—"}</TableCell>
//                     <TableCell className="text-sm font-medium">{r.reported_name || "—"}</TableCell>
//                     <TableCell className="text-sm">{r.reason}</TableCell>
//                     <TableCell className="max-w-[280px] text-xs text-muted-foreground">{r.details || "—"}</TableCell>
//                     <TableCell>
//                       <Badge variant={r.status === "pending" ? "outline" : r.status === "actioned" ? "default" : "secondary"}>
//                         {r.status}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="text-right">
//                       {r.status === "pending" && (
//                         <>
//                           <Button size="sm" variant="ghost" onClick={() => updateReportStatus(r.id, "actioned")}>Actioned</Button>
//                           <Button size="sm" variant="ghost" onClick={() => updateReportStatus(r.id, "dismissed")}>Dismiss</Button>
//                         </>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </Card>
//       )}

//       {/* Profile detail dialog — shows what fields the user actually filled */}
//       <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
//         <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="font-serif text-2xl text-primary">
//               {selected?.full_name}
//             </DialogTitle>
//           </DialogHeader>
//           {selected && (
//             <div className="space-y-4 text-sm">
//               <div className="rounded-md bg-muted/50 p-3 text-xs">
//                 <div><span className="text-muted-foreground">Signed up:</span> {format(new Date(selected.created_at), "dd MMM yyyy, HH:mm")}</div>
//                 <div><span className="text-muted-foreground">Last updated profile:</span> {format(new Date(selected.updated_at), "dd MMM yyyy, HH:mm")}</div>
//                 <div><span className="text-muted-foreground">Last sign-in:</span> {selected.last_sign_in_at ? format(new Date(selected.last_sign_in_at), "dd MMM yyyy, HH:mm") : "Never"}</div>
//               </div>
//               <div className="grid grid-cols-2 gap-3">
//                 <Field label="Email" value={selected.email} />
//                 <Field label="Phone" value={selected.contact_phone} />
//                 <Field label="Gender" value={selected.gender} />
//                 <Field label="DOB" value={selected.date_of_birth} />
//                 <Field label="Marital status" value={selected.marital_status?.replace(/_/g, " ")} />
//                 <Field label="Religion" value={selected.religion} />
//                 <Field label="Community" value={selected.community} />
//                 <Field label="Mother tongue" value={selected.mother_tongue} />
//                 <Field label="Height (cm)" value={selected.height_cm?.toString()} />
//                 <Field label="City" value={selected.city} />
//                 <Field label="State" value={selected.state} />
//                 <Field label="Country" value={selected.country} />
//                 <Field label="Education" value={selected.education} />
//                 <Field label="Profession" value={selected.profession} />
//                 <Field label="Annual income" value={selected.annual_income} />
//               </div>
//               {selected.about_me && (
//                 <div>
//                   <div className="text-xs uppercase tracking-wider text-muted-foreground">About</div>
//                   <p className="mt-1">{selected.about_me}</p>
//                 </div>
//               )}
//               {selected.photo_url && (
//                 <img src={selected.photo_url} alt={selected.full_name} className="mt-2 max-h-64 rounded-md" />
//               )}
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// const StatCard = ({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: number; sub?: string }) => (
//   <Card className="border-border/60 p-4">
//     <div className="flex items-center justify-between">
//       <span className="text-sm text-muted-foreground">{label}</span>
//       <span className="text-primary">{icon}</span>
//     </div>
//     <div className="mt-2 font-serif text-3xl text-primary">{value ?? 0}</div>
//     {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
//   </Card>
// );

// const Field = ({ label, value }: { label: string; value: string | null | undefined }) => (
//   <div>
//     <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
//     <div className={value ? "text-foreground" : "text-muted-foreground/60 italic"}>{value || "not filled"}</div>
//   </div>
// );

// export default Admin;


import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  ShieldCheck, Search, Eye, BadgeCheck, Ban, Flag
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

/* ---------------- TYPES ---------------- */
type AdminUser = {
  id: string;
  email: string;
  full_name: string;
  city: string | null;
  created_at: string;
  is_admin: boolean;
  is_verified: boolean;
  is_banned: boolean;
};

type Report = {
  id: string;
  reporter_name: string | null;
  reported_name: string | null;
  reason: string;
  status: string;
  created_at: string;
};

/* ---------------- MAIN ---------------- */
const Admin = () => {
  const { user, loading: authLoading } = useAuth();

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<AdminUser | null>(null);
  const [tab, setTab] = useState<"users" | "reports">("users");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  /* 🔐 CHECK ADMIN */
  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      setIsAdmin(!!data);
    })();
  }, [user]);

  /* 📦 LOAD DATA */
  const loadData = async () => {
    setLoading(true);

    const [{ data: u }, { data: r }] = await Promise.all([
      supabase.rpc("admin_list_users"),
      supabase.rpc("admin_list_reports"),
    ]);

    setUsers(u || []);
    setReports(r || []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) loadData();
  }, [isAdmin]);

  /* 🔥 REALTIME */
  useEffect(() => {
    if (!isAdmin) return;

    const channel = supabase
      .channel("admin-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, loadData)
      .on("postgres_changes", { event: "*", schema: "public", table: "reports" }, loadData)
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [isAdmin]);

  /* 🧾 AUDIT LOG (NEW) */
  const logAction = async (action: string, target: string) => {
    await supabase.from("admin_logs").insert({
      admin_id: user?.id,
      action,
      target,
    });
  };

  /* ⚙️ ACTIONS */
  const toggleBanned = async (u: AdminUser) => {
    setActionLoading(u.id);

    const { error } = await supabase
      .from("profiles")
      .update({ is_banned: !u.is_banned })
      .eq("id", u.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      await logAction("toggle_ban", u.full_name);
      toast({ title: u.is_banned ? "Unbanned" : "Banned" });
    }

    setActionLoading(null);
    loadData();
  };

  const deleteUser = async (u: AdminUser) => {
    if (!confirm("Delete user?")) return;

    setActionLoading(u.id);

    const { error } = await supabase.from("profiles").delete().eq("id", u.id);

    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      await logAction("delete_user", u.full_name);
      toast({ title: "User deleted" });
    }

    setActionLoading(null);
    loadData();
  };

  /* 🔍 FILTER */
  const filtered = users.filter((u) =>
    u.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  /* ⛔ ACCESS */
  if (authLoading || isAdmin === null)
    return <div className="p-10 text-center">Loading admin...</div>;

  if (!user) return <Navigate to="/auth" />;
  if (!isAdmin) return <div className="p-10 text-red-500 text-center">Access Denied</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        <ShieldCheck /> Admin Dashboard
      </h1>

      {/* 🔍 SEARCH */}
      <div className="flex gap-2 items-center">
        <Search className="h-4 w-4" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." />
      </div>

      {/* USERS */}
      <Card>
        {loading ? (
          <div className="p-10 text-center">Loading users...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.full_name}</TableCell>
                    <TableCell>
                      {u.is_banned && <Badge variant="destructive">Banned</Badge>}
                      {u.is_verified && <Badge>Verified</Badge>}
                    </TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(u.created_at))} ago
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        disabled={actionLoading === u.id}
                        onClick={() => toggleBanned(u)}
                      >
                        <Ban className="h-4 w-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={actionLoading === u.id}
                        onClick={() => deleteUser(u)}
                      >
                        Delete
                      </Button>

                      <Button size="sm" onClick={() => setSelected(u)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* REPORTS */}
      <Card>
        {reports.length === 0 ? (
          <div className="p-6 text-center">No reports</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reported</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {reports.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.reported_name}</TableCell>
                  <TableCell>{r.reason}</TableCell>
                  <TableCell>{r.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* MODAL */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.full_name}</DialogTitle>
          </DialogHeader>
          <p>Email: {selected?.email}</p>
          <p>Status: {selected?.is_banned ? "Banned" : "Active"}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;