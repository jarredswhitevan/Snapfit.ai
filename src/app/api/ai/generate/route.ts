import { generateMealPlan, generateWorkoutPlan } from "@/lib/ai/provider";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { type } = await req.json();
  if (type === "workout") return NextResponse.json(await generateWorkoutPlan());
  if (type === "meal") return NextResponse.json(await generateMealPlan());
  return NextResponse.json({ error: "Invalid generation type" }, { status: 400 });
}
