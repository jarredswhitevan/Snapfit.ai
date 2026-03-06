"use server";

import { z } from "zod";
import { mockMealPlan, mockWorkoutPlan } from "@/lib/mock/data";

const planInputSchema = z.object({
  type: z.enum(["workout", "meal"]),
});

export const generatePlan = async (input: z.infer<typeof planInputSchema>) => {
  const payload = planInputSchema.parse(input);
  return payload.type === "workout" ? mockWorkoutPlan : mockMealPlan;
};
