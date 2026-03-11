import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/app")) return NextResponse.next();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase isn't configured, hard-fail to login.
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Supabase auth gate.
  const response = NextResponse.next();
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: any) {
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: any) {
        response.cookies.set({ name, value: "", ...options });
      },
    },
  });

  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) return NextResponse.redirect(new URL("/login", request.url));

  const path = request.nextUrl.pathname;

  // Onboarding gate: if profile isn't complete, send to /app/onboarding
  if (!path.startsWith("/app/onboarding")) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_complete")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile?.onboarding_complete) {
      return NextResponse.redirect(new URL("/app/onboarding", request.url));
    }
  }

  // Paywall gate: allow only billing + settings until subscription is active/trialing
  const paywallAllowed = path.startsWith("/app/billing") || path.startsWith("/app/settings") || path.startsWith("/app/onboarding");
  if (!paywallAllowed) {
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("status")
      .eq("user_id", user.id)
      .maybeSingle();

    const status = (sub as any)?.status;
    const ok = status === "trialing" || status === "active";
    if (!ok) {
      return NextResponse.redirect(new URL("/app/billing?startCheckout=1&tier=elite&cycle=monthly", request.url));
    }
  }

  return response;
}

export const config = { matcher: ["/app/:path*"] };
