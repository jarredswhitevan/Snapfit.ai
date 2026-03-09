import { PLAN_FEATURES, PLAN_PRICING, annualSavings, formatCurrency, monthlyEquivalent } from "@/constants/plans";
import type { BillingCycle, PlanTier } from "@/types/domain";
import { Card } from "@/components/ui/card";
import { CheckoutButton } from "@/components/CheckoutButton";

export function PricingCard({ tier, cycle, cta = "Start Trial" }: { tier: PlanTier; cycle: BillingCycle; cta?: string }) {
  const price = PLAN_PRICING[tier][cycle];
  return (
    <Card className={tier === "elite" ? "border-green-500" : ""}>
      <p className="text-xs uppercase text-muted-foreground">SnapFIT {tier === "core" ? "Core" : "Elite"}</p>
      <p className="mt-2 text-3xl font-semibold">
        {formatCurrency(price)}
        <span className="text-base text-muted-foreground">/{cycle === "monthly" ? "mo" : "yr"}</span>
      </p>
      {cycle === "annual" && (
        <p className="mt-1 text-xs text-green-600">
          Save {formatCurrency(annualSavings(tier))} · {formatCurrency(monthlyEquivalent(tier))}/mo equivalent
        </p>
      )}
      <ul className="mt-4 space-y-2 text-sm">
        {PLAN_FEATURES.core
          .concat(tier === "elite" ? PLAN_FEATURES.elite : [])
          .slice(0, 8)
          .map((f) => (
            <li key={f}>• {f}</li>
          ))}
      </ul>
      <div className="mt-5">
        <CheckoutButton tier={tier} cycle={cycle} label={cta} />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">7-day free trial included.</p>
    </Card>
  );
}
