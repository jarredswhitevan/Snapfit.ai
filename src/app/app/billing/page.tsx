"use client";

import { useState } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { PricingCard } from "@/components/pricing/pricing-card";
import { Card } from "@/components/ui/card";
import { BillingCycle } from "@/types/domain";
import { BillingPortalButton } from "@/components/BillingPortalButton";
import { CheckoutButton } from "@/components/CheckoutButton";

export default function BillingPage() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  return (
    <div>
      <PageHeader title="Billing & Subscription" description="Manage your plan, cycle, and renewal settings." />
      <Card>
        <p className="font-medium">Current plan: SnapFIT Core</p>
        <p className="text-sm text-muted-foreground">Monthly · Trial ends in 5 days · Renews automatically</p>
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
