import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/app")) {
    const authed = request.cookies.get("snapfit_demo_auth")?.value === "1";
    if (!authed) return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/app/:path*"] };
