import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PointsBadge } from "@/components/PointsBadge";
import { projectStepsMap } from "@/data/projectStepsData";
import type { ProjectStep } from "@/data/projectStepsData";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Lightbulb,
  Trophy,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/project/$projectId")({
  head: () => ({
    meta: [
      { title: "Project Progress — BridgeLearn" },
      { name: "description", content: "Track your progress through project steps and actions." },
    ],
  }),
  component: ProjectProgressPage,
});

interface CompletedAction {
  step_index: number;
  action_index: number;
}

function ProjectProgressPage() {
  const { projectId } = Route.useParams();
  const { user } = useAuth();
  const [project, setProject] = useState<{ id: string; title: string; description: string; points: number; difficulty: string; career: string; duration: string } | null>(null);
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());
  const [expandedStep, setExpandedStep] = useState<number>(0);
  const [projectCompleted, setProjectCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  const makeKey = (s: number, a: number) => `${s}-${a}`;

  useEffect(() => {
    const load = async () => {
      const { data: proj } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();
      if (proj) setProject(proj);

      if (user) {
        const [{ data: steps }, { data: completed }] = await Promise.all([
          supabase
            .from("user_project_steps")
            .select("step_index, action_index")
            .eq("user_id", user.id)
            .eq("project_id", projectId),
          supabase
            .from("user_projects")
            .select("id")
            .eq("user_id", user.id)
            .eq("project_id", projectId),
        ]);

        if (steps) {
          setCompletedActions(new Set(steps.map((s: CompletedAction) => makeKey(s.step_index, s.action_index))));
        }
        if (completed && completed.length > 0) {
          setProjectCompleted(true);
        }
      }
      setLoading(false);
    };
    load();
  }, [projectId, user]);

  const stepsData = project ? projectStepsMap[project.title] : null;
  const steps = stepsData?.steps || [];

  const totalActions = steps.reduce((sum, s) => sum + s.actions.length, 0);
  const completedCount = completedActions.size;
  const progressPercent = totalActions > 0 ? Math.round((completedCount / totalActions) * 100) : 0;

  const toggleAction = useCallback(
    async (stepIndex: number, actionIndex: number) => {
      if (!user) {
        toast.error("Please sign in to track progress");
        return;
      }
      const key = makeKey(stepIndex, actionIndex);
      const isCompleted = completedActions.has(key);

      if (isCompleted) {
        await supabase
          .from("user_project_steps")
          .delete()
          .eq("user_id", user.id)
          .eq("project_id", projectId)
          .eq("step_index", stepIndex)
          .eq("action_index", actionIndex);
        setCompletedActions((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      } else {
        await supabase.from("user_project_steps").insert({
          user_id: user.id,
          project_id: projectId,
          step_index: stepIndex,
          action_index: actionIndex,
        });
        setCompletedActions((prev) => new Set(prev).add(key));
        toast.success("Action completed! ✓");
      }
    },
    [user, projectId, completedActions],
  );

  const handleFinishProject = async () => {
    if (!user || !project) return;
    if (projectCompleted) return;

    const { error } = await supabase.from("user_projects").insert({
      user_id: user.id,
      project_id: project.id,
      points_earned: project.points,
    });
    if (error) {
      toast.error("Failed to complete project");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("total_points")
      .eq("user_id", user.id)
      .single();
    if (profile) {
      await supabase
        .from("profiles")
        .update({ total_points: profile.total_points + project.points })
        .eq("user_id", user.id);
    }

    setProjectCompleted(true);
    toast.success(`🎉 Project complete! +${project.points} points earned!`);
  };

  const isStepComplete = (stepIndex: number) => {
    if (!steps[stepIndex]) return false;
    return steps[stepIndex].actions.every((_, ai) => completedActions.has(makeKey(stepIndex, ai)));
  };

  const stepProgress = (stepIndex: number) => {
    if (!steps[stepIndex]) return 0;
    const total = steps[stepIndex].actions.length;
    const done = steps[stepIndex].actions.filter((_, ai) => completedActions.has(makeKey(stepIndex, ai))).length;
    return total > 0 ? Math.round((done / total) * 100) : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header isLoggedIn />
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-2/3" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-3 bg-muted rounded-full w-full" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-muted rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!project || !stepsData) {
    return (
      <div className="min-h-screen bg-background">
        <Header isLoggedIn />
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <p className="text-xl font-semibold mb-2">Project not found</p>
          <p className="text-muted-foreground mb-6">This project doesn't have a step-by-step guide yet.</p>
          <Link to="/projects">
            <Button variant="lavender">← Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  const diffColors: Record<string, string> = {
    Beginner: "bg-lime/20 text-lime-foreground",
    Intermediate: "bg-tangerine/20 text-tangerine-foreground",
    Advanced: "bg-coral/20 text-coral-foreground",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Back link */}
        <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>

        {/* Project header */}
        <div className="rounded-2xl border bg-card p-6 mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${diffColors[project.difficulty] || ""}`}>
                  {project.difficulty}
                </span>
                <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full">{project.career}</span>
              </div>
              <h1 className="text-2xl font-extrabold mb-1">{project.title}</h1>
              <p className="text-muted-foreground text-sm">{project.description}</p>
            </div>
            <PointsBadge points={project.points} size="lg" />
          </div>

          {/* Overall progress */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-semibold">Overall Progress</span>
              <span className="text-muted-foreground">{completedCount}/{totalActions} actions · {progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-3" />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, si) => {
            const isExpanded = expandedStep === si;
            const complete = isStepComplete(si);
            const prog = stepProgress(si);

            return (
              <div key={si} className={`rounded-2xl border transition-all duration-200 ${complete ? "border-lime/50 bg-lime/5" : "bg-card"}`}>
                {/* Step header */}
                <button
                  onClick={() => setExpandedStep(isExpanded ? -1 : si)}
                  className="w-full flex items-center gap-4 p-4 sm:p-5 text-left"
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${complete ? "bg-lime/20" : "bg-primary/10"}`}>
                    {complete ? <CheckCircle2 className="w-5 h-5 text-lime-foreground" /> : <span className="text-primary text-sm">{si + 1}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold">{step.icon} {step.title}</span>
                    </div>
                    {!isExpanded && (
                      <div className="mt-1">
                        <Progress value={prog} className="h-1.5" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {step.actions.filter((_, ai) => completedActions.has(makeKey(si, ai))).length}/{step.actions.length}
                  </span>
                  {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                </button>

                {/* Expanded actions */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-0">
                    <p className="text-sm text-muted-foreground mb-4 pl-14">{step.description}</p>
                    <div className="space-y-2">
                      {step.actions.map((action, ai) => {
                        const actionDone = completedActions.has(makeKey(si, ai));
                        return (
                          <ActionItem
                            key={ai}
                            label={action.label}
                            hint={action.hint}
                            completed={actionDone}
                            onToggle={() => toggleAction(si, ai)}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Finish project */}
        <div className="mt-8 rounded-2xl border bg-card p-6 text-center">
          {projectCompleted ? (
            <div className="flex flex-col items-center gap-3">
              <Trophy className="w-12 h-12 text-sunshine-foreground" />
              <h3 className="text-xl font-extrabold">Project Complete! 🎉</h3>
              <p className="text-muted-foreground text-sm">You earned {project.points} points for completing this project.</p>
              <Link to="/projects">
                <Button variant="lavender" className="mt-2">Explore More Projects</Button>
              </Link>
            </div>
          ) : (
            <>
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-bold mb-1">Ready to finish?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Complete all steps above, then claim your {project.points} points!
              </p>
              <Button
                variant="lavender"
                size="lg"
                disabled={progressPercent < 100}
                onClick={handleFinishProject}
              >
                {progressPercent < 100
                  ? `Complete all actions first (${progressPercent}%)`
                  : `Finish & Earn ${project.points} pts 🎉`}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ActionItem({ label, hint, completed, onToggle }: { label: string; hint?: string; completed: boolean; onToggle: () => void }) {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className={`rounded-xl border p-3 sm:p-4 transition-all duration-200 ${completed ? "bg-lime/5 border-lime/30" : "bg-background hover:border-primary/30"}`}>
      <div className="flex items-start gap-3">
        <button onClick={onToggle} className="flex-shrink-0 mt-0.5">
          {completed ? (
            <CheckCircle2 className="w-5 h-5 text-lime-foreground" />
          ) : (
            <Circle className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <span className={`text-sm font-medium ${completed ? "line-through text-muted-foreground" : ""}`}>{label}</span>
          {hint && (
            <>
              <button
                onClick={() => setShowHint(!showHint)}
                className="ml-2 inline-flex items-center gap-1 text-xs text-primary/70 hover:text-primary transition-colors"
              >
                <Lightbulb className="w-3 h-3" />
                {showHint ? "hide hint" : "hint"}
              </button>
              {showHint && (
                <p className="mt-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 border border-dashed">
                  💡 {hint}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
