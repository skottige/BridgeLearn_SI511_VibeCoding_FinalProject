import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { useState } from "react";
import { Search } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Micro-Projects — BridgeLearn" },
      { name: "description", content: "Complete hands-on micro-projects to earn points and explore careers." },
    ],
  }),
  component: ProjectsPage,
});

const allProjects = [
  { title: "Build a Personal Website", description: "Create a portfolio site using HTML & CSS basics", points: 150, duration: "45 min", difficulty: "Beginner" as const, career: "Web Dev", completed: true },
  { title: "Design a Logo", description: "Create a brand logo using free online design tools", points: 100, duration: "30 min", difficulty: "Beginner" as const, career: "Design", completed: true },
  { title: "Analyze Survey Data", description: "Use spreadsheets to find patterns in real survey data", points: 200, duration: "1 hr", difficulty: "Intermediate" as const, career: "Data Science" },
  { title: "Write a Press Release", description: "Draft a professional press release for a fictional company", points: 120, duration: "40 min", difficulty: "Beginner" as const, career: "Marketing" },
  { title: "Build a Simple App", description: "Create a basic calculator app with JavaScript", points: 250, duration: "1.5 hrs", difficulty: "Intermediate" as const, career: "Web Dev" },
  { title: "3D Print a Prototype", description: "Design a 3D model and learn about rapid prototyping", points: 300, duration: "2 hrs", difficulty: "Advanced" as const, career: "Engineering" },
  { title: "Create a Budget Plan", description: "Build a personal budget spreadsheet with charts", points: 150, duration: "45 min", difficulty: "Beginner" as const, career: "Finance" },
  { title: "Social Media Campaign", description: "Plan and design a social media campaign for a cause", points: 180, duration: "1 hr", difficulty: "Intermediate" as const, career: "Marketing" },
  { title: "Lab Report Analysis", description: "Analyze a biology lab report and present findings", points: 200, duration: "1 hr", difficulty: "Intermediate" as const, career: "Science" },
  { title: "Video Storyboard", description: "Create a storyboard for a short documentary", points: 160, duration: "50 min", difficulty: "Beginner" as const, career: "Media" },
  { title: "Machine Learning Basics", description: "Train a simple ML model to classify images", points: 350, duration: "2 hrs", difficulty: "Advanced" as const, career: "Data Science" },
  { title: "Design a Patient Form", description: "Create a digital patient intake form for a clinic", points: 130, duration: "35 min", difficulty: "Beginner" as const, career: "Healthcare" },
];

const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [diff, setDiff] = useState("All");

  const filtered = allProjects.filter((p) => {
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No projects found. Try adjusting your filters.</p>
        )}
      </div>
    </div>
  );
}
