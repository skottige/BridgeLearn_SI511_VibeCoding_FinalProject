import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { InterestCard } from "@/components/InterestCard";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Choose Your Interests — BridgeLearn" },
      { name: "description", content: "Select your interests to get personalized career recommendations." },
    ],
  }),
  component: OnboardingPage,
});

const interests = [
  { id: "tech", icon: "💻", label: "Technology", color: "lavender" as const },
  { id: "health", icon: "🩺", label: "Healthcare", color: "coral" as const },
  { id: "art", icon: "🎨", label: "Arts & Design", color: "tangerine" as const },
  { id: "business", icon: "📊", label: "Business", color: "sky" as const },
  { id: "science", icon: "🔬", label: "Science", color: "lime" as const },
  { id: "education", icon: "📚", label: "Education", color: "sunshine" as const },
  { id: "engineering", icon: "⚙️", label: "Engineering", color: "lavender" as const },
  { id: "media", icon: "🎬", label: "Media", color: "coral" as const },
  { id: "law", icon: "⚖️", label: "Law & Policy", color: "sky" as const },
  { id: "environment", icon: "🌍", label: "Environment", color: "lime" as const },
  { id: "sports", icon: "⚽", label: "Sports", color: "tangerine" as const },
  { id: "social", icon: "🤝", label: "Social Work", color: "sunshine" as const },
];

function OnboardingPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sunshine/5 via-background to-lavender/5">
      <Header isLoggedIn />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold mb-3">What interests you? 🎯</h1>
          <p className="text-muted-foreground">Pick at least 3 interests. We'll match you with careers and projects.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {interests.map((i) => (
            <InterestCard
              key={i.id}
              icon={i.icon}
              label={i.label}
              color={i.color}
              selected={selected.has(i.id)}
              onClick={() => toggle(i.id)}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <Link to="/dashboard">
            <Button variant="hero" size="lg" disabled={selected.size < 3}>
              Continue ({selected.size}/3 selected) <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
