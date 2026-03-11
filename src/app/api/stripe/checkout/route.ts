import { NextRequest, NextResponse } from "next/server";
import { stripeEnv, isStripeConfigured } from "@/lib/stripe/config";
import { stripe } from "@/lib/stripe";
import { getSession } from "@/lib/auth/session";
import type { BillingCycle, PlanTier } from "@/types/domain";

function pickPriceId(tier: PlanTier, cycle: BillingCycle) {
  const ids = stripeEnv.priceIds;
  if (tier === "core" && cycle === "monthly") return ids.coreMonthly;
  if (tier === "core" && cycle === "annual") return ids.coreAnnual;
  if (tier === "elite" && cycle === "monthly") return ids.eliteMonthly;
  if (tier === "elite" && cycle === "annual") return ids.eliteAnnual;
  return null;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const tier = (body?.tier as PlanTier) ?? "core";
  const cycle = (body?.cycle as BillingCycle) ?? "monthly";

  if (!isStripeConfigured) {
    return NextResponse.json({ mock: true, checkoutUrl: `/app/billing?mockCheckout=1&tier=${tier}&cycle=${cycle}` });
  }

  const price = pickPriceId(tier, cycle);
  if (!price) {
    return NextResponse.json({ error: "Missing Stripe price ID env vars" }, { status: 500 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || `${req.nextUrl.protocol}//${req.nextUrl.host}`;

  const session = await getSession();
  const customerEmail = session?.user?.email;

  const subscriptionData: any = {
    trial_period_days: 7,
  };

  // $1 today, then $39.99/mo starting after the 7-day trial
  // Implemented as a one-time invoice item charged at checkout.
  if (tier === "core" && cycle === "monthly" && stripeEnv.trialSetupFeePriceId) {
    subscriptionData.add_invoice_items = [{ price: stripeEnv.trialSetupFeePriceId }];
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price, quantity: 1 }],
    subscription_data: subscriptionData,
    payment_method_collection: "always",
    customer_email: customerEmail || undefined,
    success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/cancel`,
    allow_promotion_codes: true,
    metadata: {
      tier,
      cycle,
      userId: session?.user?.id ?? "unknown",
    },
  });

  return NextResponse.json({ checkoutUrl: checkout.url });
}
