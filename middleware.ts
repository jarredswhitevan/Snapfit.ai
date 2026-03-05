import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PROTECTED_ROUTES = ["/dashboard", "/onboarding", "/account"];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: { [key: string]: string }) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: { [key: string]: string }) {
          response.cookies.set({ name, value: "", ...options });
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  if (!user && isProtected) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_complete")
      .eq("id", user.id)
      .maybeSingle();

    const onboardingComplete = profile?.onboarding_complete ?? false;

    if (!onboardingComplete && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    if (!onboardingComplete && pathname.startsWith("/account")) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    if (onboardingComplete && pathname.startsWith("/onboarding")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(
        new URL(onboardingComplete ? "/dashboard" : "/onboarding", request.url)
      );
    }
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*", "/account/:path*", "/auth"]
};
