import { Sparkles } from "lucide-react";

export function PointsBadge({ points, size = "md" }: { points: number; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-3 py-1 gap-1.5",
    lg: "text-base px-4 py-1.5 gap-2",
  };
  return (
    <span className={`inline-flex items-center font-bold rounded-full bg-sunshine text-sunshine-foreground ${sizes[size]}`}>
      <Sparkles className={size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4"} />
      {points.toLocaleString()} pts
    </span>
  );
}
