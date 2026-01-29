"use server";

import { z } from "zod";
import { openai } from "@/lib/openai";
import { planSchema } from "@/types/plan";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const planInputSchema = z.object({
  regenerate: z.boolean().optional().default(false)
});

const SYSTEM_PROMPT = `You are a certified strength coach and nutrition coach. Provide safe, sustainable guidance. No medical claims. Always return JSON that matches the schema exactly.`;

const buildUserPrompt = (profile: {
  age: number | null;
  height_cm: number | null;
  weight_lbs: number | null;
  goal: string | null;
  training_days: number | null;
  equipment: string | null;
  dietary_prefs: string | null;
}) => `Create a 7-day workout split and 7-day meal plan for the following client. Use realistic foods and macros.

Client:
- age: ${profile.age}
- height_cm: ${profile.height_cm}
- weight_lbs: ${profile.weight_lbs}
- goal: ${profile.goal}
- training_days: ${profile.training_days}
- equipment: ${profile.equipment}
- dietary_prefs: ${profile.dietary_prefs ?? "none"}

Return STRICT JSON with fields:
{
  "meta": {"goal": string, "training_days": number, "equipment": string, "dietary_prefs": string},
  "workout_plan": [{"day": string, "focus": string, "warmup": string, "exercises": [{"name": string, "sets": string, "reps": string, "rest_sec": number, "notes": string}], "finisher": string, "cooldown": string}],
  "meal_plan": [{"day": string, "calories": number, "macros": {"protein_g": number, "carbs_g": number, "fat_g": number}, "meals": [{"name": string, "foods": [string], "notes": string}]}],
  "tips": [string]
}`;

const generatePlanJSON = async (profile: {
  age: number | null;
  height_cm: number | null;
  weight_lbs: number | null;
  goal: string | null;
  training_days: number | null;
  equipment: string | null;
  dietary_prefs: string | null;
}) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(profile) }
    ]
  });

  return response.choices[0]?.message?.content ?? "";
};

const fixPlanJSON = async (raw: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `Fix this JSON to match the required schema exactly. Return ONLY valid JSON.\n\n${raw}` }
    ]
  });

  return response.choices[0]?.message?.content ?? "";
};

export const generatePlan = async (input: z.infer<typeof planInputSchema>) => {
  const { regenerate } = planInputSchema.parse(input);
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select(
      "age, height_cm, weight_lbs, goal, training_days, equipment, dietary_prefs, free_generation_used, onboarding_complete"
    )
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    throw new Error("Profile not found");
  }

  if (!profile.onboarding_complete) {
    throw new Error("Complete onboarding first");
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", user.id)
    .maybeSingle();

  const hasActiveSub =
    subscription?.status === "active" || subscription?.status === "trialing";

  if (!hasActiveSub && profile.free_generation_used) {
    throw new Error("Subscription required");
  }

  if (regenerate) {
    const today = new Date().toISOString().slice(0, 10);
    const { data: limit } = await supabase
      .from("regen_limits")
      .select("count")
      .eq("user_id", user.id)
      .eq("date", today)
      .maybeSingle();

    if ((limit?.count ?? 0) >= 3) {
      throw new Error("Daily regeneration limit reached");
    }

    await supabase.from("regen_limits").upsert({
      user_id: user.id,
      date: today,
      count: (limit?.count ?? 0) + 1
    });
  }

  const raw = await generatePlanJSON(profile);

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
    planSchema.parse(parsed);
  } catch (error) {
    const fixed = await fixPlanJSON(raw);
    parsed = JSON.parse(fixed);
    planSchema.parse(parsed);
  }

  await supabase
    .from("plans")
    .update({ active: false })
    .eq("user_id", user.id);

  const { error: planError } = await supabase.from("plans").insert({
    user_id: user.id,
    plan_json: parsed,
    active: true
  });

  if (planError) {
    throw new Error(planError.message);
  }

  if (!hasActiveSub && !profile.free_generation_used) {
    await supabase
      .from("profiles")
      .update({ free_generation_used: true })
      .eq("id", user.id);
  }

  return { success: true };
};
