"use client";

import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function SignOutButton() {
  return (
    <Button
      className="bg-slate-700 hover:bg-slate-800"
      type="button"
      onClick={async () => {
        const supabase = createSupabaseBrowserClient();
        if (supabase) {
          await supabase.auth.signOut();
        }
        window.location.href = "/login";
      }}
    >
      Sign out
    </Button>
  );
}
