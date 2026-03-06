import { demoCookieName } from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(demoCookieName, "1", { path: "/", httpOnly: true, sameSite: "lax" });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(demoCookieName, "0", { path: "/", expires: new Date(0) });
  return res;
}
