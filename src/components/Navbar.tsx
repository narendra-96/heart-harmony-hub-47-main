// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "@/lib/auth";
// import { Button } from "@/components/ui/button";
// import { Heart, MessageCircle, Star, User, LogOut, Search, Eye, ShieldCheck } from "lucide-react";
// import { toast } from "@/hooks/use-toast";
// import { useEffect, useState } from "react";
// import { supabase } from "@/integrations/supabase/client";
// import NotificationsBell from "@/components/NotificationsBell";

// const Navbar = () => {
//   const { user, signOut } = useAuth();
//   const navigate = useNavigate();
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     if (!user) { setIsAdmin(false); return; }
//     supabase
//       .from("user_roles")
//       .select("role")
//       .eq("user_id", user.id)
//       .eq("role", "admin")
//       .maybeSingle()
//       .then(({ data }) => setIsAdmin(!!data));
//   }, [user]);

//   const linkCls = ({ isActive }: { isActive: boolean }) =>
//     `flex items-center gap-1.5 text-sm font-medium transition-colors ${
//       isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
//     }`;

//   return (
//     <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
//       <div className="container flex h-16 items-center justify-between gap-4">
//         <Link to="/" className="flex items-center gap-2">
//           <Heart className="h-6 w-6 fill-primary text-primary" />
//           <span className="font-serif text-2xl font-semibold tracking-wide text-primary">Saath</span>
//         </Link>

//         {user ? (
//           <nav className="hidden items-center gap-6 md:flex">
//             <NavLink to="/browse" className={linkCls}>
//               <Search className="h-4 w-4" /> Browse
//             </NavLink>
//             <NavLink to="/shortlist" className={linkCls}>
//               <Star className="h-4 w-4" /> Shortlist
//             </NavLink>
//             <NavLink to="/interests" className={linkCls}>
//               <Heart className="h-4 w-4" /> Interests
//             </NavLink>
//             <NavLink to="/visitors" className={linkCls}>
//               <Eye className="h-4 w-4" /> Visitors
//             </NavLink>
//             <NavLink to="/messages" className={linkCls}>
//               <MessageCircle className="h-4 w-4" /> Messages
//             </NavLink>
//             <NavLink to="/profile" className={linkCls}>
//               <User className="h-4 w-4" /> Profile
//             </NavLink>
//             {isAdmin && (
//               <NavLink to="/admin" className={linkCls}>
//                 <ShieldCheck className="h-4 w-4" /> Admin
//               </NavLink>
//             )}
//           </nav>
//         ) : null}

//         <div className="flex items-center gap-2">
//           {user ? (
//             <>
//             <NotificationsBell />
//             <Button variant="ghost" size="sm" onClick={async () => {
//               await signOut();
//               toast({
//                 title: "Until next time 🙏",
//                 description: "Be quiet when the opportunity leaves and think twice why the mistake happened.",
//               });
//               navigate("/");
//             }}>
//               <LogOut className="h-4 w-4" /> Sign out
//             </Button>
//             </>
//           ) : (
//             <>
//               <Button asChild variant="ghost" size="sm">
//                 <Link to="/auth">Sign in</Link>
//               </Button>
//               <Button asChild size="sm" className="bg-gradient-royal text-primary-foreground shadow-elegant hover:opacity-95">
//                 <Link to="/auth?mode=signup">Join Free</Link>
//               </Button>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageCircle,
  Star,
  User,
  LogOut,
  Search,
  Eye,
  ShieldCheck,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import NotificationsBell from "@/components/NotificationsBell";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingAdmin, setLoadingAdmin] = useState(true);

  // 🔐 Check admin role safely
  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoadingAdmin(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (error) {
          console.error("Admin check error:", error);
          setIsAdmin(false);
        } else {
          setIsAdmin(!!data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setIsAdmin(false);
      }

      setLoadingAdmin(false);
    };

    checkAdmin();
  }, [user]);

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-1.5 text-sm font-medium transition-colors ${
      isActive
        ? "text-primary"
        : "text-muted-foreground hover:text-primary"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Heart className="h-6 w-6 fill-primary text-primary" />
          <span className="font-serif text-2xl font-semibold tracking-wide text-primary">
            Saath
          </span>
        </Link>

        {/* Navigation */}
        {user && (
          <nav className="hidden items-center gap-6 md:flex">
            <NavLink to="/browse" className={linkCls}>
              <Search className="h-4 w-4" /> Browse
            </NavLink>

            <NavLink to="/shortlist" className={linkCls}>
              <Star className="h-4 w-4" /> Shortlist
            </NavLink>

            <NavLink to="/interests" className={linkCls}>
              <Heart className="h-4 w-4" /> Interests
            </NavLink>

            <NavLink to="/visitors" className={linkCls}>
              <Eye className="h-4 w-4" /> Visitors
            </NavLink>

            <NavLink to="/messages" className={linkCls}>
              <MessageCircle className="h-4 w-4" /> Messages
            </NavLink>

            <NavLink to="/profile" className={linkCls}>
              <User className="h-4 w-4" /> Profile
            </NavLink>

            {/* 🔥 ADMIN BUTTON */}
            {!loadingAdmin && isAdmin && (
              <NavLink to="/admin" className={linkCls}>
                <ShieldCheck className="h-4 w-4" /> Admin
              </NavLink>
            )}
          </nav>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <NotificationsBell />

              <Button
                variant="ghost"
                size="sm"
                onClick={async () => {
                  await signOut();
                  toast({
                    title: "thank you 🙏",
                    description:
                      "Be quiet when the opportunity leaves and think twice why the mistake happened.",
                  });
                  navigate("/");
                }}
              >
                <LogOut className="h-4 w-4" /> Sign out
              </Button>
            </>
          ) : (
            <>

            <Button asChild variant="ghost" size="sm">
                <Link to="/auth">admin</Link>
              </Button>

              




              <Button asChild variant="ghost" size="sm">
                <Link to="/auth">Sign in</Link>
              </Button>

              <Button
                asChild
                size="sm"
                className="bg-gradient-royal text-primary-foreground shadow-elegant hover:opacity-95"
              >
                <Link to="/auth?mode=signup">Join Free</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;