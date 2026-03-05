"use client";

import { useTransition } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/Button";

export const SignOutButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
      window.location.href = "/";
    });
  };

  return (
    <Button variant="ghost" onClick={handleSignOut} disabled={isPending}>
      Sign Out
    </Button>
  );
};
