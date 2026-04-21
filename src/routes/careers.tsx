import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { CareerPathCard } from "@/components/CareerPathCard";
import { useState } from "react";
import { Search } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Career Pathways — BridgeLearn" },
      { name: "description", content: "Explore 50+ career pathways and find your dream job." },
    ],
  }),
  component: CareersPage,
});

const careers = [
  { title: "Software Developer", description: "Build apps, websites, and systems used by millions of people", icon: "💻", color: "lavender", projectCount: 24, avgSalary: "$95k", category: "Technology" },
  { title: "UX Designer", description: "Design intuitive and beautiful digital experiences", icon: "🎨", color: "coral", projectCount: 18, avgSalary: "$85k", category: "Arts & Design" },
  { title: "Data Scientist", description: "Analyze data to uncover insights and make predictions", icon: "📊", color: "sky", projectCount: 15, avgSalary: "$105k", category: "Technology" },
  { title: "Nurse Practitioner", description: "Provide advanced healthcare to patients in need", icon: "🩺", color: "coral", projectCount: 12, avgSalary: "$75k", category: "Healthcare" },
  { title: "Environmental Scientist", description: "Research and develop solutions for environmental challenges", icon: "🌍", color: "lime", projectCount: 10, avgSalary: "$70k", category: "Science" },
  { title: "Marketing Manager", description: "Create strategies to promote products and grow brands", icon: "📣", color: "tangerine", projectCount: 14, avgSalary: "$80k", category: "Business" },
  { title: "Mechanical Engineer", description: "Design and build machines, engines, and structures", icon: "⚙️", color: "sky", projectCount: 16, avgSalary: "$90k", category: "Engineering" },
  { title: "Graphic Designer", description: "Create visual content for print and digital media", icon: "✏️", color: "sunshine", projectCount: 20, avgSalary: "$60k", category: "Arts & Design" },
  { title: "Financial Analyst", description: "Help businesses make smart investment decisions", icon: "💰", color: "lime", projectCount: 11, avgSalary: "$85k", category: "Business" },
  { title: "Biomedical Researcher", description: "Advance medical knowledge through scientific research", icon: "🔬", color: "lavender", projectCount: 8, avgSalary: "$80k", category: "Science" },
  { title: "Film Producer", description: "Manage and oversee the creation of films and media", icon: "🎬", color: "coral", projectCount: 9, avgSalary: "$75k", category: "Media" },
  { title: "Social Worker", description: "Support individuals and communities facing challenges", icon: "🤝", color: "sunshine", projectCount: 7, avgSalary: "$55k", category: "Social Work" },
];

const categories = ["All", ...Array.from(new Set(careers.map((c) => c.category)))];

function CareersPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <CareerPathCard key={c.title} {...c} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No careers found. Try a different search.</p>
        )}
      </div>
    </div>
  );
}
