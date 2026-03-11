"use client";

import { Button } from "@/components/ui/button";

export function BillingPortalButton() {
  return (
    <Button
      className="bg-slate-700 hover:bg-slate-800"
      type="button"
      onClick={async () => {
        try {
          const res = await fetch("/api/stripe/portal", { method: "POST" });
          const data = await res.json().catch(() => ({}));
          if (!res.ok) {
            alert(data?.error ?? "Unable to open billing portal.");
            return;
          }
          if (data.url) window.location.href = data.url;
          else alert("No portal URL returned.");
        } catch (e: any) {
          alert(e?.message ?? "Network error opening billing portal.");
        }
      }}
    >
      Manage billing
    </Button>
  );
}
