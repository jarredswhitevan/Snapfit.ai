"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/auth/mock-login", { method: "POST" });
    if (!res.ok) {
      setError("Unable to authenticate. Please try again.");
      setLoading(false);
      return;
    }

    window.location.href = "/app";
  };

  return (
    <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
      <Input placeholder="Email" type="email" required />
      <Input placeholder="Password" type="password" required />
      {mode === "signup" && <Input placeholder="First name" required />}
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
      </Button>
      <p className="text-xs text-muted-foreground">
        Demo mode is active when Supabase credentials are not configured.
      </p>
    </form>
  );
}
