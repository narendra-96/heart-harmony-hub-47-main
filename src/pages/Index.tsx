import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Sparkles, Users } from "lucide-react";
import { useAuth } from "@/lib/auth";
import hero from "@/assets/hero.jpg";
import RecommendedMatches from "@/components/RecommendedMatches";
import ProfileCompletenessCard from "@/components/ProfileCompletenessCard";
import SeoHead from "@/components/SeoHead";
import { Quote, Star } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  return (
    <main>
      <SeoHead
        title="one become together | Trusted Indian Matrimonial"
        description="Discover meaningful matches with verified profiles, smart filters, partner preferences and private messaging. Begin your journey on one become together today."
        canonical="https://heart-harmony-hub-47.lovable.app/"
      />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="Traditional matrimonial celebration" width={1600} height={900} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>
        <div className="container py-24 md:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-block bg-gradient-gold bg-clip-text font-medium uppercase tracking-[0.3em] text-transparent">
              · one become together · A Sacred Bond ·
            </p>
            <h1 className="font-serif text-5xl leading-[1.05] text-foreground md:text-7xl">
              Where two hearts<br />begin <em className="text-primary">forever</em>.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              An elegant matrimonial experience to discover meaningful matches—rooted in tradition, designed for today.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-gradient-royal text-primary-foreground shadow-elegant hover:opacity-95">
                <Link to={user ? "/browse" : "/auth?mode=signup"}>
                  <Heart className="h-5 w-5" /> {user ? "Browse matches" : "Begin your journey"}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5">
                <Link to={user ? "/profile" : "/auth"}>
                  {user ? "Complete profile" : "Sign in"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {user && (
        <section className="container -mt-10">
          <ProfileCompletenessCard />
        </section>
      )}

      {user && <RecommendedMatches />}

      {/* Features */}
      <section className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="ornament-divider mx-auto max-w-xs text-sm uppercase tracking-widest">Why one become together</p>
          <h2 className="mt-6 font-serif text-4xl text-foreground md:text-5xl">Crafted with care</h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            { icon: Users, title: "Verified members", body: "Authentic profiles with detailed family, education, and lifestyle information." },
            { icon: Sparkles, title: "Smart filters", body: "Discover matches by religion, community, profession, location, and more." },
            { icon: Shield, title: "Private & safe", body: "Chat is unlocked only when both members accept — your privacy stays sacred." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-border/60 bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-elegant">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-gold text-accent-foreground shadow-gold">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-2xl text-primary">{f.title}</h3>
              <p className="mt-2 text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-cream py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="ornament-divider mx-auto max-w-xs text-sm uppercase tracking-widest">Real stories</p>
            <h2 className="mt-6 font-serif text-4xl text-primary md:text-5xl">Forever begins here</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { name: "Priya & Arjun", from: "Bangalore", q: "We exchanged a single one become together interest and never looked back. Our families clicked, our hearts followed." },
              { name: "Meera & Rohan", from: "Mumbai", q: "Verified profiles and gentle privacy made it easy to trust. We were married within a year of matching." },
              { name: "Anjali & Vikram", from: "Delhi", q: "one become together felt different — quiet, dignified, traditional. The way matrimony is meant to be." },
            ].map((t, i) => (
              <div key={t.name} className="rounded-xl border border-border/60 bg-card p-7 shadow-sm animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                <Quote className="h-6 w-6 text-accent" />
                <p className="mt-3 italic text-foreground/85">"{t.q}"</p>
                <div className="mt-5 flex items-center gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-2 font-serif text-lg text-primary">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.from}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="border-primary/30 text-primary hover:bg-primary/5">
              <Link to="/success-stories">Read more success stories →</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 bg-card/40 py-10">
        <div className="container text-center text-sm text-muted-foreground">
          <p className="font-serif text-lg text-primary">one become together</p>
          <nav className="mt-3 flex flex-wrap justify-center gap-4">
            <Link to="/" className="hover:text-primary">Home</Link>
            <Link to="/success-stories" className="hover:text-primary">Success Stories</Link>
            <Link to="/auth" className="hover:text-primary">Sign in</Link>
            <Link to="/auth?mode=signup" className="hover:text-primary">Join Free</Link>
          </nav>
          <p className="mt-3">Crafted with reverence · {new Date().getFullYear()}</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
