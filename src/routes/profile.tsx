import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { PointsBadge } from "@/components/PointsBadge";
import { StatCard } from "@/components/StatCard";
import { Trophy, Flame, Target, BookOpen, Star, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — BridgeLearn" },
      { name: "description", content: "Your BridgeLearn profile and achievements." },
    ],
  }),
  component: ProfilePage,
});

const badges = [
  { icon: "🚀", label: "First Project", earned: true },
  { icon: "🔥", label: "5-Day Streak", earned: true },
  { icon: "⭐", label: "VIP Explorer", earned: true },
  { icon: "🏆", label: "10 Projects", earned: false },
  { icon: "💎", label: "Career Master", earned: false },
  { icon: "🎓", label: "Scholar", earned: false },
];

const completedProjects = [
  { title: "Build a Personal Website", career: "Web Dev", points: 150 },
  { title: "Design a Logo", career: "Design", points: 100 },
  { title: "Write a Press Release", career: "Marketing", points: 120 },
  { title: "Create a Budget Plan", career: "Finance", points: 150 },
  { title: "Design a Patient Form", career: "Healthcare", points: 130 },
  { title: "Video Storyboard", career: "Media", points: 160 },
  { title: "Analyze Survey Data", career: "Data Science", points: 200 },
  { title: "Social Media Campaign", career: "Marketing", points: 180 },
];

function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile header */}
        <div className="bg-gradient-to-br from-lavender/20 via-sky/10 to-lime/10 rounded-3xl border p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-3xl text-primary-foreground font-bold">
              A
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-extrabold">Alex Rivera</h1>
              <p className="text-muted-foreground text-sm">Sophomore • Lincoln High School</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <PointsBadge points={1250} />
                <span className="text-xs text-muted-foreground">Level 5 Explorer</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" /> Edit
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Points" value="1,250" icon={<Star className="w-5 h-5 text-primary" />} color="lavender" />
          <StatCard label="Projects Done" value={8} icon={<BookOpen className="w-5 h-5 text-coral" />} color="coral" />
          <StatCard label="Day Streak" value={5} icon={<Flame className="w-5 h-5 text-tangerine-foreground" />} color="tangerine" />
          <StatCard label="Careers Explored" value={4} icon={<Target className="w-5 h-5 text-sky-foreground" />} color="sky" />
        </div>

        {/* Badges */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Badges 🏅</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {badges.map((b) => (
              <div key={b.label} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border ${b.earned ? "bg-card shadow-[var(--shadow-card)]" : "bg-muted/50 opacity-50"}`}>
                <span className="text-2xl">{b.icon}</span>
                <span className="text-xs font-semibold text-center">{b.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Completed projects */}
        <section>
          <h2 className="text-xl font-bold mb-4">Completed Projects ✅</h2>
          <div className="bg-card rounded-2xl border divide-y">
            {completedProjects.map((p) => (
              <div key={p.title} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="font-semibold text-sm">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.career}</p>
                </div>
                <PointsBadge points={p.points} size="sm" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
