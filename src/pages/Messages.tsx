import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type Conv = { id: string; full_name: string; photo_url: string | null };
type Msg = { id: string; sender_id: string; receiver_id: string; content: string; created_at: string };

const Messages = () => {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();
  const [convs, setConvs] = useState<Conv[]>([]);
  const [active, setActive] = useState<string | null>(params.get("with"));
  const [messages, setMessages] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  // Load matched conversations
  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: ints } = await supabase.from("interests")
        .select("sender_id, receiver_id")
        .eq("status", "accepted")
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`);
      const others = Array.from(new Set((ints ?? []).map((i: any) => i.sender_id === user.id ? i.receiver_id : i.sender_id)));
      if (others.length === 0) { setConvs([]); return; }
      const { data: ps } = await supabase.from("profiles").select("id, full_name, photo_url").in("id", others);
      setConvs((ps as Conv[]) ?? []);
      if (!active && others.length > 0) setActive(others[0]);
    })();
  }, [user]);

  // Load messages for active and subscribe
  useEffect(() => {
    if (!user || !active) return;
    setParams({ with: active }, { replace: true });
    (async () => {
      const { data } = await supabase.from("messages")
        .select("*")
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${active}),and(sender_id.eq.${active},receiver_id.eq.${user.id})`)
        .order("created_at", { ascending: true });
      setMessages((data as Msg[]) ?? []);
    })();

    const channel = supabase
      .channel(`msgs-${user.id}-${active}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        const m = payload.new as Msg;
        if ((m.sender_id === user.id && m.receiver_id === active) ||
            (m.sender_id === active && m.receiver_id === user.id)) {
          setMessages((prev) => [...prev, m]);
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user, active, setParams]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !user || !active) return;
    const content = text.trim();
    setText("");
    await supabase.from("messages").insert({ sender_id: user.id, receiver_id: active, content });
  };

  const activeConv = convs.find((c) => c.id === active);

  return (
    <div className="container py-10">
      <h1 className="mb-6 text-center font-serif text-4xl text-primary">Messages</h1>
      <Card className="grid h-[70vh] grid-cols-1 overflow-hidden border-border/60 md:grid-cols-[280px_1fr]">
        <aside className="border-r border-border/60 bg-muted/20">
          <div className="border-b border-border/60 p-3 font-serif text-lg text-primary">Conversations</div>
          <div className="overflow-y-auto">
            {convs.length === 0 && <p className="p-4 text-sm text-muted-foreground">No matches yet. Accept an interest to start chatting.</p>}
            {convs.map((c) => (
              <button key={c.id} onClick={() => setActive(c.id)}
                className={cn("flex w-full items-center gap-3 p-3 text-left hover:bg-accent/10",
                  active === c.id && "bg-accent/15")}>
                <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                  {c.photo_url ? <img src={c.photo_url} alt={c.full_name} className="h-full w-full object-cover" />
                    : <div className="flex h-full w-full items-center justify-center"><Heart className="h-4 w-4 text-muted-foreground/40" /></div>}
                </div>
                <span className="truncate text-sm font-medium text-foreground">{c.full_name}</span>
              </button>
            ))}
          </div>
        </aside>
        <section className="flex flex-col">
          {activeConv ? (
            <>
              <div className="border-b border-border/60 p-4 font-serif text-lg text-primary">{activeConv.full_name}</div>
              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {messages.map((m) => (
                  <div key={m.id} className={cn("flex", m.sender_id === user!.id ? "justify-end" : "justify-start")}>
                    <div className={cn("max-w-[75%] rounded-2xl px-4 py-2 text-sm",
                      m.sender_id === user!.id ? "bg-gradient-royal text-primary-foreground" : "bg-muted text-foreground")}>
                      {m.content}
                    </div>
                  </div>
                ))}
                <div ref={endRef} />
              </div>
              <form onSubmit={send} className="flex gap-2 border-t border-border/60 p-3">
                <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a message…" />
                <Button type="submit" className="bg-gradient-royal text-primary-foreground"><Send className="h-4 w-4" /></Button>
              </form>
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">Select a conversation</div>
          )}
        </section>
      </Card>
    </div>
  );
};

export default Messages;