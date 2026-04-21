import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Sparkles, Rocket, Target, Trophy, Users, ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BridgeLearn — Discover Your Future Career" },
      { name: "description", content: "A gamified career exploration platform helping underserved high school students discover careers through micro-projects." },
      { property: "og:title", content: "BridgeLearn — Discover Your Future Career" },
      { property: "og:description", content: "Explore careers, complete projects, earn rewards." },
    ],
  }),
  component: LandingPage,
});

const features = [
  { icon: <Target className="w-6 h-6" />, title: "Explore Careers", desc: "Discover 20+ career pathways matched to your interests", color: "bg-lavender/15" },
  { icon: <Rocket className="w-6 h-6" />, title: "Micro-Projects", desc: "Hands-on projects you can finish in under an hour", color: "bg-coral/15" },
  { icon: <Trophy className="w-6 h-6" />, title: "Earn Rewards", desc: "Collect points and unlock real rewards as you learn", color: "bg-sunshine/15" },
  { icon: <Users className="w-6 h-6" />, title: "Community", desc: "Connect with mentors and peers on the same path", color: "bg-sky/15" },
];

const stats = [
  { value: "5,000+", label: "Students" },
  { value: "200+", label: "Projects" },
  { value: "50+", label: "Career Paths" },
  { value: "95%", label: "Satisfaction" },
];

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-lavender/10 via-sky/5 to-lime/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-sunshine/20 text-sunshine-foreground px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <Star className="w-4 h-4" /> Free for all students
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
                Your future starts{" "}
                <span className="text-primary">here</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Explore real careers, build cool projects, earn rewards — all while discovering what you love. No experience needed.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/signup">
                  <Button variant="hero" size="lg">
                    Get started free <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/careers">
                  <Button variant="outline" size="lg">
                    Browse careers
                  </Button>
                </Link>
              </div>
            </div>
            <div className="animate-slide-up stagger-2 flex justify-center">
              <img
                src={heroImage}
                alt="Diverse students exploring careers"
                className="w-full max-w-md rounded-3xl shadow-[var(--shadow-card-hover)] animate-float"
                width={1280}
                height={800}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-3">How BridgeLearn works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Four simple steps to explore your future career — no boring lectures, just real-world projects.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={f.title} className={`rounded-2xl border p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:-translate-y-1 animate-slide-up stagger-${i + 1}`}>
              <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                {f.icon}
              </div>
              <h3 className="font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-primary/5 via-lavender/10 to-sky/5">
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold mb-4">Ready to discover your path?</h2>
          <p className="text-muted-foreground mb-8">Join thousands of students already exploring their dream careers.</p>
          <Link to="/signup">
            <Button variant="hero" size="lg">
              Start exploring — it's free <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold">
            <Sparkles className="w-5 h-5 text-primary" /> BridgeLearn
          </div>
          <p className="text-xs text-muted-foreground">© 2026 BridgeLearn. Built with love for every student.</p>
        </div>
      </footer>
    </div>
  );
}
