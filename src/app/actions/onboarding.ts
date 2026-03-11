"use server";

import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const onboardingSchema = z.object({
  firstName: z.string().min(2),
  age: z.number().min(13).max(90),
  sex: z.enum(["male", "female", "other"]),
  heightCm: z.number().min(120).max(230),
  weightLbs: z.number().min(70).max(600),
  bodyType: z.string().optional(),
  activityLevel: z.enum(["sedentary", "light", "moderate", "very"]),
  goalType: z.enum(["lose_weight", "gain_weight", "maintain"]),
  targetWeightLbs: z.number().min(70).max(600).optional(),
  timeframeWeeks: z.number().min(1).max(260).optional(),
});

export const saveOnboarding = async (values: z.infer<typeof onboardingSchema>) => {
  const parsed = onboardingSchema.parse(values);

  if (!isSupabaseConfigured) return { success: true };

  const supabase = createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user?.id) throw new Error("Not authenticated");

  const { computeCalorieTarget } = await import("@/lib/calories");
  const computed = computeCalorieTarget({
    sex: parsed.sex,
    age: parsed.age,
    heightCm: parsed.heightCm,
    weightLbs: parsed.weightLbs,
    activityLevel: parsed.activityLevel,
    goalType: parsed.goalType,
    targetWeightLbs: parsed.targetWeightLbs,
    timeframeWeeks: parsed.timeframeWeeks,
  });

  // 1) Persist to auth user_metadata for display
  const { error: authErr } = await supabase.auth.updateUser({
    data: {
      first_name: parsed.firstName,
    },
  });
  if (authErr) throw authErr;

  // 2) Persist profile + computed calorie target
  const { error: profErr } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        onboarding_complete: true,
        age: parsed.age,
        height_cm: Math.round(parsed.heightCm),
        weight_lbs: Math.round(parsed.weightLbs),
        body_type: parsed.bodyType ?? null,
        activity_level: parsed.activityLevel,
        goal: parsed.goalType,
        goal_timeframe_weeks: parsed.timeframeWeeks ?? null,
        target_weight_lbs: parsed.targetWeightLbs ?? null,
        calorie_target: computed.calorieTarget,
      },
      { onConflict: "id" }
    );
  if (profErr) throw profErr;

  return { success: true, calorieTarget: computed.calorieTarget, message: computed.message };
};
