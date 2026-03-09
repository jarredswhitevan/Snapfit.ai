"use client";

import { Button } from "@/components/ui/button";
import type { BillingCycle, PlanTier } from "@/types/domain";

export function CheckoutButton({
  label = "Upgrade",
  tier = "core",
  cycle = "monthly",
}: {
  label?: string;
  tier?: PlanTier;
  cycle?: BillingCycle;
}) {
  return (
    <Button
      type="button"
      onClick={async () => {
        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ tier, cycle }),
        });
        const data = await res.json();
        if (data.checkoutUrl) window.location.href = data.checkoutUrl;
      }}
    >
      {label}
    </Button>
  );
}
