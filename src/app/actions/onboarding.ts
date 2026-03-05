"use server";

import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const onboardingSchema = z.object({
  age: z.number(),
  height_cm: z.number(),
  weight_lbs: z.number(),
  goal: z.string(),
  training_days: z.number(),
  equipment: z.string(),
  dietary_prefs: z.string().optional().nullable()
});

export const saveOnboarding = async (values: z.infer<typeof onboardingSchema>) => {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const payload = onboardingSchema.parse(values);

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    onboarding_complete: true,
    ...payload
  });

  if (error) {
    throw new Error(error.message);
  }
};
