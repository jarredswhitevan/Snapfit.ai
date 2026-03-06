"use client";

import { Button } from "@/components/ui/button";

export function BillingPortalButton() {
  return (
    <Button
      className="bg-slate-700 hover:bg-slate-800"
      type="button"
      onClick={async () => {
        const res = await fetch("/api/stripe/portal", { method: "POST" });
        const data = await res.json();
        if (data.url) window.location.href = data.url;
      }}
    >
      Manage billing
    </Button>
  );
}
