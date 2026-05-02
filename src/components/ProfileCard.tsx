import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Briefcase, GraduationCap, Star, BadgeCheck, Lock } from "lucide-react";
import { calcAge } from "@/lib/age";
import { cn } from "@/lib/utils";

export type ProfileLite = {
  id: string;
  full_name: string;
  date_of_birth: string;
  city: string | null;
  state: string | null;
  religion: string | null;
  education: string | null;
  profession: string | null;
  height_cm: number | null;
  photo_url: string | null;
  is_verified?: boolean;
  photo_privacy?: string | null;
  last_seen_at?: string | null;
};

type Props = {
  profile: ProfileLite;
  shortlisted?: boolean;
  interestSent?: boolean;
  matched?: boolean;
  onShortlist?: () => void;
  onInterest?: () => void;
};

const ProfileCard = ({ profile, shortlisted, interestSent, matched, onShortlist, onInterest }: Props) => {
  const age = calcAge(profile.date_of_birth);
  const heightFt = profile.height_cm ? `${Math.floor(profile.height_cm / 30.48)}'${Math.round((profile.height_cm % 30.48) / 2.54)}"` : null;
  const photoHidden = profile.photo_privacy === "matches_only" && !matched;
  const onlineMins = profile.last_seen_at
    ? Math.floor((Date.now() - new Date(profile.last_seen_at).getTime()) / 60000)
    : null;
  const isOnline = onlineMins !== null && onlineMins < 5;
  const activeToday = onlineMins !== null && onlineMins < 60 * 24;

  return (
    <Card className="group overflow-hidden border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant hover:border-accent/40">
      <Link to={`/profile/${profile.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          {profile.photo_url && !photoHidden ? (
            <img
              src={profile.photo_url}
              alt={`${profile.full_name} matrimonial profile photo`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : photoHidden && profile.photo_url ? (
            <>
              <img
                src={profile.photo_url}
                alt=""
                aria-hidden
                className="h-full w-full object-cover blur-2xl scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/40 text-center text-foreground">
                <Lock className="h-7 w-7 text-accent" />
                <p className="text-xs font-medium">Photo visible after match</p>
              </div>
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-cream text-muted-foreground">
              <Heart className="h-16 w-16 opacity-30" />
            </div>
          )}
          {profile.is_verified && (
            <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-medium text-primary shadow-sm">
              <BadgeCheck className="h-3.5 w-3.5 text-accent" /> Verified
            </span>
          )}
          {isOnline ? (
            <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-medium text-emerald-700 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" /> Online
            </span>
          ) : activeToday ? (
            <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-medium text-muted-foreground shadow-sm">
              Active today
            </span>
          ) : null}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
            <h3 className="font-serif text-xl text-primary-foreground">
              {profile.full_name}{age ? `, ${age}` : ""}
            </h3>
            {heightFt && <p className="text-xs text-primary-foreground/80">{heightFt} • {profile.religion ?? ""}</p>}
          </div>
        </div>
      </Link>
      <div className="space-y-2 p-4">
        {profile.city && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-accent" /> {profile.city}{profile.state ? `, ${profile.state}` : ""}
          </p>
        )}
        {profile.profession && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-3.5 w-3.5 text-accent" /> {profile.profession}
          </p>
        )}
        {profile.education && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <GraduationCap className="h-3.5 w-3.5 text-accent" /> {profile.education}
          </p>
        )}
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            className={cn("flex-1", shortlisted && "border-accent text-accent")}
            onClick={onShortlist}
          >
            <Star className={cn("h-4 w-4", shortlisted && "fill-accent")} />
            {shortlisted ? "Saved" : "Shortlist"}
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-gradient-royal text-primary-foreground hover:opacity-95"
            onClick={onInterest}
            disabled={interestSent}
          >
            <Heart className={cn("h-4 w-4", interestSent && "fill-current")} />
            {interestSent ? "Sent" : "Interest"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;