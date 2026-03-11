"use server";

import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const onboardingSchema = z.object({
  firstName: z.string().min(2),
  age: z.number().min(13),
  goal: z.string(),
});

export const saveOnboarding = async (values: z.infer<typeof onboardingSchema>) => {
  const parsed = onboardingSchema.parse(values);

  // Persist to auth user_metadata so we can greet the user by name on login.
  if (isSupabaseConfigured) {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.auth.updateUser({
      data: {
        first_name: parsed.firstName,
        age: parsed.age,
        goal: parsed.goal,
      },
    });
    if (error) throw error;
  }

  return { success: true };
};
