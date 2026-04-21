import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

export function Header({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span>BridgeLearn</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <Link to="/careers">
                <Button variant="ghost" size="sm">Careers</Button>
              </Link>
              <Link to="/projects">
                <Button variant="ghost" size="sm">Projects</Button>
              </Link>
              <Link to="/rewards">
                <Button variant="ghost" size="sm">Rewards</Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="sm">Profile</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button variant="lavender" size="sm">Sign up free</Button>
              </Link>
            </>
          )}
        </nav>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 space-y-2">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="block py-2 px-3 rounded-lg hover:bg-muted" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              <Link to="/careers" className="block py-2 px-3 rounded-lg hover:bg-muted" onClick={() => setMobileOpen(false)}>Careers</Link>
              <Link to="/projects" className="block py-2 px-3 rounded-lg hover:bg-muted" onClick={() => setMobileOpen(false)}>Projects</Link>
              <Link to="/rewards" className="block py-2 px-3 rounded-lg hover:bg-muted" onClick={() => setMobileOpen(false)}>Rewards</Link>
              <Link to="/profile" className="block py-2 px-3 rounded-lg hover:bg-muted" onClick={() => setMobileOpen(false)}>Profile</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="block py-2 px-3 rounded-lg hover:bg-muted" onClick={() => setMobileOpen(false)}>Log in</Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)}>
                <Button variant="lavender" className="w-full">Sign up free</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
