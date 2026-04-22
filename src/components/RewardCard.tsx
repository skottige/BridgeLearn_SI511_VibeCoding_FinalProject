import { Button } from "@/components/ui/button";
import { Lock, Gift, CheckCircle2 } from "lucide-react";

interface RewardCardProps {
  title: string;
  description: string;
  cost: number;
  icon: string;
  unlocked: boolean;
  onClaim?: () => void;
}

export function RewardCard({ title, description, cost, icon, unlocked, onClaim }: RewardCardProps) {
  return (
    <div className={`rounded-2xl border p-5 transition-all duration-300 flex flex-col items-center text-center ${
      unlocked
        ? "bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]"
        : "bg-muted/50 opacity-70"
    }`}>
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-bold text-sm mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground mb-3">{description}</p>
      <div className="text-xs font-semibold text-sunshine-foreground bg-sunshine/30 px-2.5 py-1 rounded-full mb-3">
        {cost.toLocaleString()} pts
      </div>
      {onClaim === undefined && unlocked ? (
        <div className="flex items-center gap-1 text-xs font-semibold text-lime-foreground">
          <CheckCircle2 className="w-3.5 h-3.5" /> Claimed
        </div>
      ) : unlocked ? (
        <Button variant="lime" size="sm" className="w-full" onClick={onClaim}>
          <Gift className="w-3 h-3" /> Claim
        </Button>
      ) : (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Lock className="w-3 h-3" /> Locked
        </div>
      )}
    </div>
  );
}
