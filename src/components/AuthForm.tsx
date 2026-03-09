"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");

  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const isSupabaseConfigured = Boolean(supabase);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!isSupabaseConfigured) {
        // Demo fallback
        const res = await fetch("/api/auth/mock-login", { method: "POST" });
        if (!res.ok) throw new Error("Unable to authenticate. Please try again.");
        window.location.href = "/app";
        return;
      }

      if (mode === "login") {
        const { error } = await supabase!.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = "/app";
        return;
      }

      const { error } = await supabase!.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
          },
        },
      });
      if (error) throw error;

      // If email confirmations are enabled, user may need to confirm. Still redirect to app shell;
      // middleware will bounce them to /login if they aren't fully authed.
      window.location.href = "/app";
    } catch (err: any) {
      setError(err?.message ?? "Unable to authenticate. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
      <Input
        placeholder="Email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <Input
        placeholder="Password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete={mode === "login" ? "current-password" : "new-password"}
      />
      {mode === "signup" && (
        <Input
          placeholder="First name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          autoComplete="given-name"
        />
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
      </Button>
      <p className="text-xs text-muted-foreground">
        {isSupabaseConfigured
          ? "Connected to Supabase auth."
          : "Demo mode is active when Supabase credentials are not configured."}
      </p>
    </form>
  );
}
