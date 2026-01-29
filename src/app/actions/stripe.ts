"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";

export const createCheckoutSession = async () => {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: subscription?.stripe_customer_id ?? undefined,
    client_reference_id: user.id,
    metadata: {
      user_id: user.id
    },
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID ?? "",
        quantity: 1
      }
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
    allow_promotion_codes: true
  });

  return { url: session.url };
};

export const createBillingPortal = async () => {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!subscription?.stripe_customer_id) {
    throw new Error("No Stripe customer found");
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: subscription.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/account`
  });

  return { url: session.url };
};
