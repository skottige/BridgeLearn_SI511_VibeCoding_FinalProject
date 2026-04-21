import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const colorMap = {
  lavender: "bg-[var(--gradient-card-lavender)] border-lavender",
  coral: "bg-[var(--gradient-card-coral)] border-coral",
  lime: "bg-[var(--gradient-card-lime)] border-lime",
  sky: "bg-[var(--gradient-card-sky)] border-sky",
  tangerine: "bg-[var(--gradient-card-tangerine)] border-tangerine",
  sunshine: "bg-[var(--gradient-card-sunshine)] border-sunshine",
};

interface InterestCardProps {
  icon: ReactNode;
  label: string;
  color: keyof typeof colorMap;
  selected?: boolean;
  onClick?: () => void;
}

export function InterestCard({ icon, label, color, selected, onClick }: InterestCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer",
        "hover:scale-[1.04] hover:shadow-[var(--shadow-card-hover)]",
        selected
          ? `${colorMap[color]} border-current shadow-[var(--shadow-card-hover)] scale-[1.02]`
          : "bg-card border-transparent shadow-[var(--shadow-card)]"
      )}
    >
      <div className="text-3xl">{icon}</div>
      <span className="font-semibold text-sm">{label}</span>
      {selected && (
        <span className="text-xs font-bold text-primary">✓ Selected</span>
      )}
    </button>
  );
}
