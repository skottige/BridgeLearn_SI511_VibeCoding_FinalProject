import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { RewardCard } from "@/components/RewardCard";
import { PointsBadge } from "@/components/PointsBadge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/rewards")({
  head: () => ({
    meta: [
      { title: "Rewards — BridgeLearn" },
      { name: "description", content: "Earn points and unlock awesome rewards on BridgeLearn." },
    ],
  }),
  component: RewardsPage,
});

interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  icon: string;
}

function RewardsPage() {
  const { user } = useAuth();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [claimedIds, setClaimedIds] = useState<Set<string>>(new Set());
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: rewardsData } = await supabase.from("rewards").select("*");
      if (rewardsData) setRewards(rewardsData);

      if (user) {
        const [profileRes, claimedRes] = await Promise.all([
          supabase.from("profiles").select("total_points").eq("user_id", user.id).single(),
          supabase.from("user_rewards").select("reward_id").eq("user_id", user.id),
        ]);
        if (profileRes.data) setTotalPoints(profileRes.data.total_points);
        if (claimedRes.data) setClaimedIds(new Set(claimedRes.data.map((r) => r.reward_id)));
      }
      setLoading(false);
    };
    load();
  }, [user]);

  const handleClaim = async (reward: Reward) => {
    if (!user) {
      toast.error("Please sign in to claim rewards");
      return;
    }
    if (claimedIds.has(reward.id)) return;
    if (totalPoints < reward.cost) {
      toast.error(`You need ${reward.cost - totalPoints} more points to unlock this reward`);
      return;
    }

    const { error } = await supabase.from("user_rewards").insert({
      user_id: user.id,
      reward_id: reward.id,
    });
    if (error) {
      toast.error("Failed to claim reward");
      return;
    }

    // Deduct points
    await supabase
      .from("profiles")
      .update({ total_points: totalPoints - reward.cost })
      .eq("user_id", user.id);

    setClaimedIds((prev) => new Set(prev).add(reward.id));
    setTotalPoints((p) => p - reward.cost);
    toast.success(`🎉 You claimed "${reward.title}"!`);
  };

  // Find next affordable unclaimed reward
  const nextReward = rewards
    .filter((r) => !claimedIds.has(r.id) && r.cost > totalPoints)
    .sort((a, b) => a.cost - b.cost)[0];

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold mb-2">Rewards Store 🎉</h1>
            <p className="text-muted-foreground">Spend your hard-earned points on awesome rewards.</p>
          </div>
          <PointsBadge points={totalPoints} size="lg" />
        </div>

        {nextReward && (
          <div className="bg-card rounded-2xl border p-6 mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold">Next reward: {nextReward.title}</span>
              <span className="text-xs text-muted-foreground">{totalPoints}/{nextReward.cost.toLocaleString()} pts</span>
            </div>
            <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-lavender to-primary transition-all duration-500"
                style={{ width: `${Math.min(100, (totalPoints / nextReward.cost) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl border bg-card p-5 h-40 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {rewards.map((r) => (
              <RewardCard
                key={r.id}
                title={r.title}
                description={r.description}
                cost={r.cost}
                icon={r.icon}
                unlocked={totalPoints >= r.cost || claimedIds.has(r.id)}
                onClaim={claimedIds.has(r.id) ? undefined : () => handleClaim(r)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
