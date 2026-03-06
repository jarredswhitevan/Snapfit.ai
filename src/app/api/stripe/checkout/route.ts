import { isStripeConfigured } from "@/lib/stripe/config";
import { NextResponse } from "next/server";

export async function POST() {
  if (!isStripeConfigured) {
    return NextResponse.json({ mock: true, checkoutUrl: "/app/billing?mockCheckout=1" });
  }
  return NextResponse.json({ checkoutUrl: "/app/billing" });
}
