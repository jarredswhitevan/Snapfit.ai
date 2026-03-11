"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/dashboard/page-header";
import { PricingCard } from "@/components/pricing/pricing-card";
import { Card } from "@/components/ui/card";
import { BillingCycle } from "@/types/domain";
import { BillingPortalButton } from "@/components/BillingPortalButton";
import { CheckoutButton } from "@/components/CheckoutButton";

export default function BillingPage() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const sp = useSearchParams();

  useEffect(() => {
    const start = sp.get("startCheckout");
    if (start !== "1") return;

    const tier = (sp.get("tier") as any) ?? "elite";
    const cycle = (sp.get("cycle") as any) ?? "monthly";

    (async () => {
      try {
        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ tier, cycle }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          alert(data?.error ?? "Unable to start checkout (server error).");
          return;
        }
        if (data?.checkoutUrl) window.location.href = data.checkoutUrl;
        else alert(data?.error ?? "Unable to start checkout.");
      } catch (e: any) {
        alert(e?.message ?? "Unable to start checkout (network error).");
      }
    })();
  }, [sp]);

  return (
    <div>
      <PageHeader title="Billing & Subscription" description="Manage your plan, cycle, and renewal settings." />
      <Card>
        <p className="font-medium">Current plan: SnapFIT Core</p>
        <p className="text-sm text-muted-foreground">Manage your subscription details below.</p>
        <div className="mt-3 flex gap-2">
          <CheckoutButton label="Upgrade" />
          <BillingPortalButton />
        </div>
      </Card>

      <div className="mt-4 inline-flex rounded-lg border p-1 text-sm">
        <button className={`rounded-md px-3 py-1 ${cycle === "monthly" ? "bg-green-500 text-white" : ""}`} onClick={() => setCycle("monthly")}>Monthly</button>
        <button className={`rounded-md px-3 py-1 ${cycle === "annual" ? "bg-green-500 text-white" : ""}`} onClick={() => setCycle("annual")}>Annual</button>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <PricingCard tier="core" cycle={cycle} cta="Switch plan" />
        <PricingCard tier="elite" cycle={cycle} cta="Upgrade to Elite" />
      </div>
    </div>
  );
}
