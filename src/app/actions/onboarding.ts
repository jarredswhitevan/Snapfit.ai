"use server";

import { z } from "zod";

const onboardingSchema = z.object({
  firstName: z.string().min(2),
  age: z.number().min(13),
  goal: z.string(),
});

export const saveOnboarding = async (values: z.infer<typeof onboardingSchema>) => {
  onboardingSchema.parse(values);
  return { success: true };
};
