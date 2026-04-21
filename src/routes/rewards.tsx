import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { RewardCard } from "@/components/RewardCard";
import { PointsBadge } from "@/components/PointsBadge";

export const Route = createFileRoute("/rewards")({
  head: () => ({
    meta: [
      { title: "Rewards — BridgeLearn" },
      { name: "description", content: "Earn points and unlock awesome rewards on BridgeLearn." },
    ],
  }),
  component: RewardsPage,
});

const currentPoints = 1250;

const rewards = [
  { title: "Custom Avatar", description: "Unlock a special profile avatar", cost: 200, icon: "🎭", unlocked: true },
  { title: "Certificate", description: "Download a career explorer certificate", cost: 500, icon: "📜", unlocked: true },
  { title: "Mentor Chat", description: "30 min chat with a real professional", cost: 1000, icon: "💬", unlocked: true },
  { title: "Gift Card $10", description: "Amazon or Target gift card", cost: 2000, icon: "🎁", unlocked: false },
  { title: "College Essay Review", description: "Get feedback from an admissions counselor", cost: 1500, icon: "📝", unlocked: false },
  { title: "Internship Referral", description: "A referral to a summer internship program", cost: 3000, icon: "💼", unlocked: false },
  { title: "Laptop Scholarship", description: "Enter a drawing for a free laptop", cost: 5000, icon: "💻", unlocked: false },
  { title: "VIP Badge", description: "Special badge visible on your profile", cost: 750, icon: "⭐", unlocked: true },
];

function RewardsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold mb-2">Rewards Store 🎉</h1>
            <p className="text-muted-foreground">Spend your hard-earned points on awesome rewards.</p>
          </div>
          <PointsBadge points={currentPoints} size="lg" />
        </div>

        {/* Progress bar */}
        <div className="bg-card rounded-2xl border p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold">Next reward: Gift Card $10</span>
            <span className="text-xs text-muted-foreground">{currentPoints}/2,000 pts</span>
          </div>
          <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-lavender to-primary transition-all duration-500"
              style={{ width: `${(currentPoints / 2000) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {rewards.map((r) => (
            <RewardCard key={r.title} {...r} />
          ))}
        </div>
      </div>
    </div>
  );
}
