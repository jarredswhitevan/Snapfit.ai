import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error:
        "Demo login is disabled. Use Supabase auth from /login and /signup.",
    },
    { status: 410 },
  );
}

export async function DELETE() {
  return NextResponse.json({ ok: true });
}
