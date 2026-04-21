import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const bgColors: Record<string, string> = {
  lavender: "from-lavender/20 to-lavender/5",
  coral: "from-coral/20 to-coral/5",
  lime: "from-lime/20 to-lime/5",
  sky: "from-sky/20 to-sky/5",
  tangerine: "from-tangerine/20 to-tangerine/5",
  sunshine: "from-sunshine/20 to-sunshine/5",
};

const iconBg: Record<string, string> = {
  lavender: "bg-lavender/30",
  coral: "bg-coral/30",
  lime: "bg-lime/30",
  sky: "bg-sky/30",
  tangerine: "bg-tangerine/30",
  sunshine: "bg-sunshine/30",
};

interface CareerPathCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  projectCount: number;
  avgSalary: string;
}

export function CareerPathCard({ title, description, icon, color, projectCount, avgSalary }: CareerPathCardProps) {
  return (
    <div className={`group rounded-2xl p-6 bg-gradient-to-br ${bgColors[color] || bgColors.lavender} border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:-translate-y-1`}>
      <div className={`w-14 h-14 rounded-xl ${iconBg[color] || iconBg.lavender} flex items-center justify-center text-2xl mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
        <span>{projectCount} projects</span>
        <span>~{avgSalary}/yr</span>
      </div>
      <Link
        to="/projects"
        className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all"
      >
        Explore <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
