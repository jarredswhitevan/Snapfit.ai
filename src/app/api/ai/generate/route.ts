import { generateMealPlan, generateWorkoutPlan } from "@/lib/ai/provider";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const type = body?.type;

  if (type === "workout") return NextResponse.json(await generateWorkoutPlan());

  if (type === "meal") {
    const calories = Number(body?.calories);
    const protein = Number(body?.protein);
    const carbs = Number(body?.carbs);
    const fat = Number(body?.fat);

    return NextResponse.json(
      await generateMealPlan({
        calories: Number.isFinite(calories) && calories > 0 ? calories : undefined,
        protein: Number.isFinite(protein) && protein > 0 ? protein : undefined,
        carbs: Number.isFinite(carbs) && carbs > 0 ? carbs : undefined,
        fat: Number.isFinite(fat) && fat > 0 ? fat : undefined,
        preference: typeof body?.preference === "string" ? body.preference : undefined,
        allergies: typeof body?.allergies === "string" ? body.allergies : undefined,
      })
    );
  }

  return NextResponse.json({ error: "Invalid generation type" }, { status: 400 });
}
