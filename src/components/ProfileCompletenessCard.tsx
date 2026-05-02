import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { profileCompleteness } from "@/lib/profileCompleteness";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProfileCompletenessCard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()
      .then(({ data }) => setProfile(data));
  }, [user]);

  if (!user || !profile) return null;
  const { percent, missing } = profileCompleteness(profile);
  if (percent >= 100) return null;

  const tip = missing[0];
  const boost = percent < 50 ? "3× more interests" : percent < 80 ? "more visibility" : "top recommendations";

  return (
    <Card className="animate-fade-in border-accent/30 bg-gradient-cream p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-gold text-accent-foreground shadow-gold">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="font-serif text-lg text-primary">Your profile is {percent}% complete</p>
          <p className="text-sm text-muted-foreground">
            {tip ? `${tip} to get ${boost}.` : "Complete your profile to attract great matches."}
          </p>
          <Progress value={percent} className="mt-3 h-2" />
          <Button asChild size="sm" variant="outline" className="mt-3 border-primary/30 text-primary hover:bg-primary/5">
            <Link to="/profile">Complete profile</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCompletenessCard;