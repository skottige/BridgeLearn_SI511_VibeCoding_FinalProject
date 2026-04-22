import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { PointsBadge } from "@/components/PointsBadge";
import { StatCard } from "@/components/StatCard";
import { Trophy, Flame, Target, BookOpen, Star, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — BridgeLearn" },
      { name: "description", content: "Your BridgeLearn profile and achievements." },
    ],
  }),
  component: ProfilePage,
});

interface Profile {
  display_name: string;
  school: string | null;
  grade: string | null;
  total_points: number;
  streak_days: number;
  level: number;
}

interface CompletedProject {
  points_earned: number;
  project: { title: string; career: string } | null;
}

const badges = [
  { icon: "🚀", label: "First Project", threshold: 1 },
  { icon: "🔥", label: "5-Day Streak", threshold: 5 },
  { icon: "⭐", label: "VIP Explorer", threshold: 500 },
  { icon: "🏆", label: "10 Projects", threshold: 10 },
  { icon: "💎", label: "Career Master", threshold: 2000 },
  { icon: "🎓", label: "Scholar", threshold: 5000 },
];

function ProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [completedProjects, setCompletedProjects] = useState<CompletedProject[]>([]);
  const [careersExplored, setCareersExplored] = useState(0);
  const [redeemedPoints, setRedeemedPoints] = useState(0);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [profileRes, completedRes, rewardsRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", user.id).single(),
        supabase.from("user_projects").select("points_earned, project:projects(title, career)").eq("user_id", user.id),
        supabase.from("user_rewards").select("reward:rewards(cost)").eq("user_id", user.id),
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (completedRes.data) {
        const mapped = completedRes.data.map((r: any) => ({
          points_earned: r.points_earned,
          project: r.project,
        }));
        setCompletedProjects(mapped);
        const uniqueCareers = new Set(mapped.filter((p: any) => p.project).map((p: any) => p.project.career));
        setCareersExplored(uniqueCareers.size);
      }
      if (rewardsRes.data) {
        const totalRedeemed = rewardsRes.data.reduce((sum: number, r: any) => sum + (r.reward?.cost ?? 0), 0);
        setRedeemedPoints(totalRedeemed);
      }
    };
    load();
  }, [user]);

  const projectCount = completedProjects.length;
  const earnedBadges = badges.map((b) => {
    if (b.label === "First Project") return { ...b, earned: projectCount >= b.threshold };
    if (b.label === "5-Day Streak") return { ...b, earned: (profile?.streak_days ?? 0) >= b.threshold };
    if (b.label === "10 Projects") return { ...b, earned: projectCount >= b.threshold };
    return { ...b, earned: (profile?.total_points ?? 0) >= b.threshold };
  });

  const initials = profile?.display_name
    ? profile.display_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile header */}
        <div className="bg-gradient-to-br from-lavender/20 via-sky/10 to-lime/10 rounded-3xl border p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-3xl text-primary-foreground font-bold">
              {initials}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-extrabold">{profile?.display_name || "Explorer"}</h1>
              <p className="text-muted-foreground text-sm">
                {[profile?.grade, profile?.school].filter(Boolean).join(" • ") || "BridgeLearn Explorer"}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <PointsBadge points={profile?.total_points ?? 0} />
                <span className="text-xs text-muted-foreground">Level {profile?.level ?? 1} Explorer</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" /> Edit
              </Button>
              <Button variant="outline" size="sm" onClick={async () => { await signOut(); navigate({ to: "/" }); }} className="text-destructive hover:text-destructive">
                <LogOut className="w-4 h-4" /> Log out
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Points" value={((profile?.total_points ?? 0) + redeemedPoints).toLocaleString()} icon={<Star className="w-5 h-5 text-primary" />} color="lavender" />
          <StatCard label="Projects Done" value={projectCount} icon={<BookOpen className="w-5 h-5 text-coral" />} color="coral" />
          <StatCard label="Day Streak" value={profile?.streak_days ?? 0} icon={<Flame className="w-5 h-5 text-tangerine-foreground" />} color="tangerine" />
          <StatCard label="Careers Explored" value={careersExplored} icon={<Target className="w-5 h-5 text-sky-foreground" />} color="sky" />
        </div>

        {/* Badges */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Badges 🏅</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {earnedBadges.map((b) => (
              <div key={b.label} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border ${b.earned ? "bg-card shadow-[var(--shadow-card)]" : "bg-muted/50 opacity-50"}`}>
                <span className="text-2xl">{b.icon}</span>
                <span className="text-xs font-semibold text-center">{b.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Completed projects */}
        <section>
          <h2 className="text-xl font-bold mb-4">Completed Projects ✅</h2>
          {completedProjects.length === 0 ? (
            <p className="text-muted-foreground text-sm">No projects completed yet. Start exploring!</p>
          ) : (
            <div className="bg-card rounded-2xl border divide-y">
              {completedProjects.map((p, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="font-semibold text-sm">{p.project?.title ?? "Unknown"}</p>
                    <p className="text-xs text-muted-foreground">{p.project?.career ?? ""}</p>
                  </div>
                  <PointsBadge points={p.points_earned} size="sm" />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
