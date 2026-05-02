import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "No auth" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Identify caller
    const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const uid = userData.user.id;

    // Use service role to delete everything
    const admin = createClient(supabaseUrl, serviceKey);
    // Delete user-owned rows first (FK-safe, also RLS-bypass)
    await admin.from("messages").delete().or(`sender_id.eq.${uid},receiver_id.eq.${uid}`);
    await admin.from("interests").delete().or(`sender_id.eq.${uid},receiver_id.eq.${uid}`);
    await admin.from("shortlists").delete().or(`user_id.eq.${uid},shortlisted_id.eq.${uid}`);
    await admin.from("profile_views").delete().or(`viewer_id.eq.${uid},viewed_id.eq.${uid}`);
    await admin.from("blocks").delete().or(`blocker_id.eq.${uid},blocked_id.eq.${uid}`);
    await admin.from("reports").delete().or(`reporter_id.eq.${uid},reported_id.eq.${uid}`);
    await admin.from("payment_unlocks").delete().or(`payer_id.eq.${uid},unlocked_profile_id.eq.${uid}`);
    await admin.from("user_roles").delete().eq("user_id", uid);
    await admin.from("profiles").delete().eq("id", uid);

    const { error: delErr } = await admin.auth.admin.deleteUser(uid);
    if (delErr) {
      return new Response(JSON.stringify({ error: delErr.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
