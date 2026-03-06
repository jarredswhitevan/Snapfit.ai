"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const supabase = createSupabaseBrowserClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!supabase) {
      setError("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const firstName = String(formData.get("firstName") ?? "").trim();

    if (mode === "login") {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      window.location.href = "/app";
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName },
        emailRedirectTo:
          typeof window !== "undefined" ? `${window.location.origin}/login` : undefined,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    setSuccess("Account created. Check your inbox for a confirmation link if email confirmation is enabled.");
    setLoading(false);
  };

  return (
    <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
      <Input name="email" placeholder="Email" type="email" required />
      <Input name="password" placeholder="Password" type="password" required minLength={6} />
      {mode === "signup" && <Input name="firstName" placeholder="First name" required />}
      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}
      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
      </Button>
      <p className="text-xs text-muted-foreground">
        Supabase authentication is enabled. Demo login has been disabled.
      </p>
    </form>
  );
}
