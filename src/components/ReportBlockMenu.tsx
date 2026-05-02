import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MoreVertical, Flag, Ban } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const REASONS = [
  "Fake profile",
  "Inappropriate photos",
  "Harassment / abuse",
  "Spam / scam",
  "Married / committed",
  "Other",
];

type Props = { profileId: string; profileName: string };

const ReportBlockMenu = ({ profileId, profileName }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reportOpen, setReportOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);
  const [reason, setReason] = useState(REASONS[0]);
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!user || user.id === profileId) return null;

  const submitReport = async () => {
    setSubmitting(true);
    const { error } = await supabase.from("reports").insert({
      reporter_id: user.id,
      reported_id: profileId,
      reason,
      details: details || null,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Couldn't submit", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Report submitted", description: "Our team will review it shortly." });
      setReportOpen(false);
      setDetails("");
    }
  };

  const submitBlock = async () => {
    setSubmitting(true);
    const { error } = await supabase.from("blocks").insert({
      blocker_id: user.id,
      blocked_id: profileId,
      reason: reason || null,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Couldn't block", description: error.message, variant: "destructive" });
    } else {
      toast({ title: `${profileName} blocked`, description: "They can no longer contact you." });
      setBlockOpen(false);
      navigate("/browse");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="More options">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setReportOpen(true)}>
            <Flag className="mr-2 h-4 w-4" /> Report profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setBlockOpen(true)} className="text-destructive">
            <Ban className="mr-2 h-4 w-4" /> Block user
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report {profileName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Reason</Label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <Label>Details (optional)</Label>
              <Textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={4} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReportOpen(false)}>Cancel</Button>
            <Button onClick={submitReport} disabled={submitting} className="bg-gradient-royal text-primary-foreground">
              {submitting ? "Submitting…" : "Submit report"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={blockOpen} onOpenChange={setBlockOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block {profileName}?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            They will no longer see your profile or be able to contact you. You will not see their profile either.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBlockOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={submitBlock} disabled={submitting}>
              {submitting ? "Blocking…" : "Block"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReportBlockMenu;
