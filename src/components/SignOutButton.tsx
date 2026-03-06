"use client";

import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <Button
      className="bg-slate-700 hover:bg-slate-800"
      type="button"
      onClick={async () => {
        await fetch("/api/auth/mock-login", { method: "DELETE" });
        window.location.href = "/login";
      }}
    >
      Sign out
    </Button>
  );
}
