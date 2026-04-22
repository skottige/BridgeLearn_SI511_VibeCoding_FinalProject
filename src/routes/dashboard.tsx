import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { PointsBadge } from "@/components/PointsBadge";
import { StatCard } from "@/components/StatCard";
import { ProjectCard } from "@/components/ProjectCard";
import { CareerPathCard } from "@/components/CareerPathCard";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";
import { Target, Trophy, Flame, BookOpen } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { projectStepsMap } from "@/data/projectStepsData";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — BridgeLearn" },
      { name: "description", content: "Your BridgeLearn dashboard" },
    ],
  }),
  component: DashboardPage,
});

interface Profile {
  display_name: string;
  total_points: number;
  streak_days: number;
  level: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  points: number;
  duration: string;
  difficulty: string;
  career: string;
}

interface Career {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  project_count: number;
  avg_salary: string;
}

function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [careers, setCareers] = useState<Career[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [rewardsCount, setRewardsCount] = useState(0);
  const [careersExplored, setCareersExplored] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [profileRes, projectsRes, completedRes, careersRes, rewardsRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", user.id).single(),
        supabase.from("projects").select("*").limit(3),
        supabase.from("user_projects").select("project_id").eq("user_id", user.id),
        supabase.from("career_pathways").select("*").limit(2),
        supabase.from("user_rewards").select("id").eq("user_id", user.id),
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (projectsRes.data) setProjects(projectsRes.data);
      if (completedRes.data) {
        const ids = new Set(completedRes.data.map((r) => r.project_id));
        setCompletedIds(ids);
        setCompletedCount(ids.size);
        // Count unique careers explored from completed projects
        const completedProjectIds = Array.from(ids);
        if (completedProjectIds.length > 0) {
          const { data: completedProjects } = await supabase
            .from("projects")
            .select("career")
            .in("id", completedProjectIds);
          if (completedProjects) {
            setCareersExplored(new Set(completedProjects.map((p) => p.career)).size);
          }
        }
      }
      if (careersRes.data) setCareers(careersRes.data);
      if (rewardsRes.data) setRewardsCount(rewardsRes.data.length);
    };
    load();
  }, [user]);

  const handleCompleteProject = async (projectId: string, points: number) => {
    if (!user || completedIds.has(projectId)) return;
    const { error } = await supabase.from("user_projects").insert({
      user_id: user.id,
      project_id: projectId,
      points_earned: points,
    });
    if (error) {
      toast.error("Failed to complete project");
      return;
    }
    await supabase
      .from("profiles")
      .update({ total_points: (profile?.total_points || 0) + points })
      .eq("user_id", user.id);

    setCompletedIds((prev) => new Set(prev).add(projectId));
    setCompletedCount((c) => c + 1);
    setProfile((p) => p ? { ...p, total_points: p.total_points + points } : p);
    toast.success(`+${points} points! Project completed 🎉`);
  };

  if (authLoading) return <div className="min-h-screen bg-background" />;

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold">
              Hey{profile?.display_name ? `, ${profile.display_name}` : " there"}, Explorer! 🌟
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {profile?.streak_days
                ? `Keep up the great work — you're on a ${profile.streak_days} day streak!`
                : "Start completing projects to build your streak!"}
            </p>
          </div>
          <PointsBadge points={profile?.total_points ?? 0} size="lg" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard label="Projects Done" value={completedCount} icon={<BookOpen className="w-5 h-5 text-primary" />} color="lavender" />
          <StatCard label="Day Streak" value={profile?.streak_days ?? 0} icon={<Flame className="w-5 h-5 text-coral" />} color="coral" />
          <StatCard label="Careers Explored" value={careersExplored} icon={<Target className="w-5 h-5 text-sky" />} color="sky" />
          <StatCard label="Rewards Earned" value={rewardsCount} icon={<Trophy className="w-5 h-5 text-sunshine-foreground" />} color="sunshine" />
        </div>

        {/* Suggested Projects */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Continue exploring 🚀</h2>
            <Link to="/projects" className="text-sm font-semibold text-primary hover:underline">View all</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p) => (
              <ProjectCard
                key={p.id}
                id={p.id}
                title={p.title}
                description={p.description}
                points={p.points}
                duration={p.duration}
                difficulty={p.difficulty as "Beginner" | "Intermediate" | "Advanced"}
                career={p.career}
                completed={completedIds.has(p.id)}
                onStart={projectStepsMap[p.title] ? undefined : () => handleCompleteProject(p.id, p.points)}
                onClick={() => setSelectedProject(p)}
              />
            ))}
          </div>
        </section>

        {/* Careers */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Careers for you 🎯</h2>
            <Link to="/careers" className="text-sm font-semibold text-primary hover:underline">View all</Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {careers.map((c) => (
              <CareerPathCard
                key={c.id}
                title={c.title}
                description={c.description}
                icon={c.icon}
                color={c.color}
                projectCount={c.project_count}
                avgSalary={c.avg_salary}
              />
            ))}
          </div>
        </section>

        <ProjectDetailModal
          project={selectedProject}
          open={!!selectedProject}
          onOpenChange={(open) => { if (!open) setSelectedProject(null); }}
          completed={selectedProject ? completedIds.has(selectedProject.id) : false}
          onComplete={() => { if (selectedProject) handleCompleteProject(selectedProject.id, selectedProject.points); }}
        />
      </div>
    </div>
  );
}
