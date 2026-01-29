import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? ""
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id ?? session.client_reference_id;
    if (userId && session.customer) {
      await supabase.from("subscriptions").upsert({
        user_id: userId,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
        status: session.status,
        current_period_end: null
      });
    }
  }

  if (event.type.startsWith("customer.subscription")) {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    const { data: existing } = await supabase
      .from("subscriptions")
      .select("user_id")
      .eq("stripe_customer_id", customerId)
      .maybeSingle();

    if (existing?.user_id) {
      await supabase.from("subscriptions").upsert({
        user_id: existing.user_id,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscription.id,
        status: subscription.status,
        current_period_end: new Date(
          subscription.current_period_end * 1000
        ).toISOString()
      });
    }
  }

  return NextResponse.json({ received: true });
}
