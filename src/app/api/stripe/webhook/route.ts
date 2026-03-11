import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET" }, { status: 500 });

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook signature verification failed: ${err?.message ?? "unknown"}` }, { status: 400 });
  }

  const supabaseAdmin = createSupabaseAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = (session.metadata as any)?.userId as string | undefined;
      const subscriptionId = session.subscription as string | null;
      const customerId = session.customer as string | null;

      if (userId && subscriptionId) {
        const sub = await stripe.subscriptions.retrieve(subscriptionId);
        await supabaseAdmin.from("subscriptions").upsert(
          {
            user_id: userId,
            stripe_customer_id: customerId ?? (sub.customer as string),
            stripe_subscription_id: sub.id,
            status: sub.status,
            current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
          },
          { onConflict: "user_id" }
        );
      }
      break;
    }

    case "customer.subscription.updated":
    case "customer.subscription.deleted":
    case "customer.subscription.created": {
      const sub = event.data.object as Stripe.Subscription;
      const subscriptionId = sub.id;

      // Update by subscription id (in case user_id isn't in metadata)
      const { data: row } = await supabaseAdmin
        .from("subscriptions")
        .select("user_id")
        .eq("stripe_subscription_id", subscriptionId)
        .maybeSingle();

      const userId = (row as any)?.user_id;
      if (userId) {
        await supabaseAdmin.from("subscriptions").upsert(
          {
            user_id: userId,
            stripe_customer_id: sub.customer as string,
            stripe_subscription_id: sub.id,
            status: sub.status,
            current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
          },
          { onConflict: "user_id" }
        );
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
