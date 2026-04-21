import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";


export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — BridgeLearn" },
      { name: "description", content: "Create your free BridgeLearn account." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) { setError("Password must be at least 8 characters"); return; }
    setSubmitting(true);
    const { error } = await signUp(email, password, name);
    setSubmitting(false);
    if (error) {
      setError(error);
    } else {
      navigate({ to: "/onboarding" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral/10 via-background to-sunshine/10">
      <Header />
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-3xl shadow-[var(--shadow-card-hover)] border p-8">
                <h1 className="text-2xl font-extrabold text-center mb-2">Join BridgeLearn 🚀</h1>
                <p className="text-sm text-muted-foreground text-center mb-8">Start exploring careers for free</p>

                {error && (
                  <div className="bg-destructive/10 text-destructive text-sm rounded-xl px-4 py-3 mb-4">{error}</div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Full name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@school.edu" required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="8+ characters" required
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                      <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <Button variant="coral" size="lg" className="w-full" disabled={submitting}>
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create account <ArrowRight className="w-4 h-4" /></>}
                  </Button>
                </form>

                <p className="text-sm text-center text-muted-foreground mt-6">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary font-semibold hover:underline">Log in</Link>
                </p>
          </div>
        </div>
      </div>
    </div>
  );
}
