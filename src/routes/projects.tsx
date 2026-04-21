import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Micro-Projects — BridgeLearn" },
      { name: "description", content: "Complete hands-on micro-projects to earn points and explore careers." },
    ],
  }),
  component: ProjectsPage,
});

interface Project {
  id: string;
  title: string;
  description: string;
  points: number;
  duration: string;
  difficulty: string;
  career: string;
}

const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

function ProjectsPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [diff, setDiff] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("projects").select("*");
      if (data) setProjects(data);

      if (user) {
        const { data: completed } = await supabase
          .from("user_projects")
          .select("project_id")
          .eq("user_id", user.id);
        if (completed) setCompletedIds(new Set(completed.map((r) => r.project_id)));
      }
      setLoading(false);
    };
    load();
  }, [user]);

  const handleComplete = async (project: Project) => {
    if (!user) {
      toast.error("Please sign in to complete projects");
      return;
    }
    if (completedIds.has(project.id)) return;

    const { error } = await supabase.from("user_projects").insert({
      user_id: user.id,
      project_id: project.id,
      points_earned: project.points,
    });
    if (error) {
      toast.error("Failed to complete project");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("total_points")
      .eq("user_id", user.id)
      .single();
    if (profile) {
      await supabase
        .from("profiles")
        .update({ total_points: profile.total_points + project.points })
        .eq("user_id", user.id);
    }

    setCompletedIds((prev) => new Set(prev).add(project.id));
    toast.success(`+${project.points} points! 🎉 "${project.title}" completed!`);
  };

  const filtered = projects.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchDiff = diff === "All" || p.difficulty === diff;
    return matchSearch && matchDiff;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-extrabold mb-2">Micro-Projects ⚡</h1>
        <p className="text-muted-foreground mb-8">Complete projects to earn points and explore real careers hands-on.</p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => setDiff(d)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  diff === d ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border hover:bg-muted"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl border bg-card p-5 h-48 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <ProjectCard
                key={p.id}
                title={p.title}
                description={p.description}
                points={p.points}
                duration={p.duration}
                difficulty={p.difficulty as "Beginner" | "Intermediate" | "Advanced"}
                career={p.career}
                completed={completedIds.has(p.id)}
                onStart={() => handleComplete(p)}
                onClick={() => setSelectedProject(p)}
              />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No projects found. Try adjusting your filters.</p>
        )}

        <ProjectDetailModal
          project={selectedProject}
          open={!!selectedProject}
          onOpenChange={(open) => { if (!open) setSelectedProject(null); }}
          completed={selectedProject ? completedIds.has(selectedProject.id) : false}
          onComplete={() => { if (selectedProject) handleComplete(selectedProject); }}
        />
      </div>
    </div>
  );
}
