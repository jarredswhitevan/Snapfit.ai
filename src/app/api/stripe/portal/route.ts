import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { isStripeConfigured } from "@/lib/stripe/config";
import { getSession } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  if (!isStripeConfigured) return NextResponse.json({ url: "/app/billing?portal=mock" });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || `${req.nextUrl.protocol}//${req.nextUrl.host}`;

  const session = await getSession();
  const email = session?.user?.email;
  if (!email) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  // MVP: find or create customer by email.
  const existing = await stripe.customers.list({ email, limit: 1 });
  const customer = existing.data[0] ?? (await stripe.customers.create({ email }));

  const portal = await stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: `${appUrl}/app/billing`,
  });

  return NextResponse.json({ url: portal.url });
}
