import { NavLink } from "react-router-dom";
import { Search, Heart, MessageCircle, User } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const items = [
  { to: "/browse", label: "Browse", Icon: Search },
  { to: "/interests", label: "Interests", Icon: Heart },
  { to: "/messages", label: "Messages", Icon: MessageCircle },
  { to: "/profile", label: "Profile", Icon: User },
];

const MobileBottomNav = () => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border/60 bg-background/95 backdrop-blur-md shadow-[0_-4px_16px_-4px_rgba(0,0,0,0.08)] md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Primary"
    >
      <ul className="grid grid-cols-4">
        {items.map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={cn("h-5 w-5 transition-transform", isActive && "scale-110")} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;