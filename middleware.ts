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

  // Onboarding gate: if profile isn't complete, send to /app/onboarding
  if (!request.nextUrl.pathname.startsWith("/app/onboarding")) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_complete")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile?.onboarding_complete) {
      return NextResponse.redirect(new URL("/app/onboarding", request.url));
    }
  }

  return response;
}

export const config = { matcher: ["/app/:path*"] };
