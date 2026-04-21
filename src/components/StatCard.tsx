import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  color: string;
}

const bgMap: Record<string, string> = {
  lavender: "bg-lavender/15",
  coral: "bg-coral/15",
  lime: "bg-lime/15",
  sky: "bg-sky/15",
  tangerine: "bg-tangerine/15",
  sunshine: "bg-sunshine/15",
};

export function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className={`w-10 h-10 rounded-xl ${bgMap[color] || bgMap.lavender} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
