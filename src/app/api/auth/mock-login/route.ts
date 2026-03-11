import { NextResponse } from "next/server";

// Demo auth has been removed.
export async function POST() {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
