"use client";

import { useState } from "react";
import { BillingCycle } from "@/types/domain";
import { PricingCard } from "@/components/pricing/pricing-card";

export function PricingPreview() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold">Pricing preview</h2>
        <div className="inline-flex rounded-lg border p-1 text-sm">
          <button className={`rounded-md px-3 py-1 ${cycle === "monthly" ? "bg-green-500 text-white" : ""}`} onClick={() => setCycle("monthly")}>Monthly</button>
          <button className={`rounded-md px-3 py-1 ${cycle === "annual" ? "bg-green-500 text-white" : ""}`} onClick={() => setCycle("annual")}>Annual</button>
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <PricingCard tier="core" cycle={cycle} />
        <PricingCard tier="elite" cycle={cycle} />
      </div>
    </section>
  );
}
