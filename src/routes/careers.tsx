import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { CareerPathCard } from "@/components/CareerPathCard";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Career Pathways — BridgeLearn" },
      { name: "description", content: "Explore 50+ career pathways and find your dream job." },
    ],
  }),
  component: CareersPage,
});

interface Career {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  project_count: number;
  avg_salary: string;
  category: string;
}

function CareersPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("career_pathways").select("*");
      if (data) setCareers(data);
      setLoading(false);
    };
    load();
  }, []);

  const categories = ["All", ...Array.from(new Set(careers.map((c) => c.category).filter(Boolean)))];

  const filtered = careers.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || c.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-extrabold mb-2">Career Pathways 🗺️</h1>
        <p className="text-muted-foreground mb-8">Explore careers that match your skills and interests.</p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search careers..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  category === cat ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl border bg-card p-6 h-56 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
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
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No careers found. Try a different search.</p>
        )}
      </div>
    </div>
  );
}
