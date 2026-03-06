"use client";

import { useState } from "react";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PricingCard } from "@/components/pricing/pricing-card";
import { BillingCycle } from "@/types/domain";

export default function PricingPage() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  return (
    <div>
      <PublicNavbar />
      <main className="mx-auto max-w-5xl px-4 py-14">
        <h1 className="text-4xl font-semibold">Simple pricing, premium results.</h1>
        <div className="mt-4 inline-flex rounded-lg border p-1 text-sm">
          <button className={`rounded-md px-3 py-1 ${cycle === "monthly" ? "bg-green-500 text-white" : ""}`} onClick={() => setCycle("monthly")}>Monthly</button>
          <button className={`rounded-md px-3 py-1 ${cycle === "annual" ? "bg-green-500 text-white" : ""}`} onClick={() => setCycle("annual")}>Annual (20% off)</button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2"><PricingCard tier="core" cycle={cycle} /><PricingCard tier="elite" cycle={cycle} cta="Upgrade to Elite" /></div>
      </main>
    </div>
  );
}
