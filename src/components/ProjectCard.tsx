import { Button } from "@/components/ui/button";
import { PointsBadge } from "@/components/PointsBadge";
import { Clock, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { projectStepsMap } from "@/data/projectStepsData";

interface ProjectCardProps {
  id?: string;
  title: string;
  description: string;
  points: number;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  career: string;
  completed?: boolean;
  onStart?: () => void;
  onClick?: () => void;
}

const diffColors: Record<string, string> = {
  Beginner: "bg-lime/20 text-lime-foreground",
  Intermediate: "bg-tangerine/20 text-tangerine-foreground",
  Advanced: "bg-coral/20 text-coral-foreground",
};

export function ProjectCard({ id, title, description, points, duration, difficulty, career, completed, onStart, onClick }: ProjectCardProps) {
  const hasSteps = !!projectStepsMap[title];

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 flex flex-col cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${diffColors[difficulty]}`}>
          {difficulty}
        </span>
        <PointsBadge points={points} size="sm" />
      </div>
      <h3 className="font-bold text-base mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">{description}</p>
      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{duration}</span>
        <span className="px-2 py-0.5 bg-muted rounded-full">{career}</span>
      </div>
      {completed ? (
        <div className="flex items-center gap-2 text-lime-foreground font-semibold text-sm">
          <CheckCircle2 className="w-4 h-4" /> Completed
        </div>
      ) : hasSteps && id ? (
        <Link to="/project/$projectId" params={{ projectId: id }} onClick={(e) => e.stopPropagation()}>
          <Button variant="lavender" size="sm" className="w-full">
            Start Project
          </Button>
        </Link>
      ) : (
        <Button variant="lavender" size="sm" onClick={(e) => { e.stopPropagation(); onStart?.(); }} className="w-full">
          Start Project
        </Button>
      )}
    </div>
  );
}
