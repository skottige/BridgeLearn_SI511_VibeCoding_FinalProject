import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { PointsBadge } from "@/components/PointsBadge";
import { StatCard } from "@/components/StatCard";
import { ProjectCard } from "@/components/ProjectCard";
import { CareerPathCard } from "@/components/CareerPathCard";
import { Target, Trophy, Flame, BookOpen } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — BridgeLearn" },
      { name: "description", content: "Your BridgeLearn dashboard" },
    ],
  }),
  component: DashboardPage,
});

const suggestedProjects = [
  { title: "Build a Personal Website", description: "Create a simple portfolio site using HTML & CSS", points: 150, duration: "45 min", difficulty: "Beginner" as const, career: "Web Dev" },
  { title: "Design a Logo", description: "Create a brand logo using free design tools", points: 100, duration: "30 min", difficulty: "Beginner" as const, career: "Design" },
  { title: "Analyze Survey Data", description: "Use spreadsheets to find patterns in real data", points: 200, duration: "1 hr", difficulty: "Intermediate" as const, career: "Data Science" },
];

const suggestedCareers = [
  { title: "Software Developer", description: "Build apps, websites, and tech that millions use", icon: "💻", color: "lavender", projectCount: 24, avgSalary: "$95k" },
  { title: "UX Designer", description: "Design beautiful, user-friendly digital experiences", icon: "🎨", color: "coral", projectCount: 18, avgSalary: "$85k" },
];

function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold">Hey there, Explorer! 🌟</h1>
            <p className="text-muted-foreground text-sm mt-1">Keep up the great work — you're on a 5 day streak!</p>
          </div>
          <PointsBadge points={1250} size="lg" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard label="Projects Done" value={8} icon={<BookOpen className="w-5 h-5 text-primary" />} color="lavender" />
          <StatCard label="Day Streak" value={5} icon={<Flame className="w-5 h-5 text-coral" />} color="coral" />
          <StatCard label="Careers Explored" value={4} icon={<Target className="w-5 h-5 text-sky" />} color="sky" />
          <StatCard label="Rewards Earned" value={3} icon={<Trophy className="w-5 h-5 text-sunshine-foreground" />} color="sunshine" />
        </div>

        {/* Suggested Projects */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Continue exploring 🚀</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedProjects.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        </section>

        {/* Careers */}
        <section>
          <h2 className="text-xl font-bold mb-4">Careers for you 🎯</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {suggestedCareers.map((c) => (
              <CareerPathCard key={c.title} {...c} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
