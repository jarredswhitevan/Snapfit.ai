import { mockMealPlan, mockWorkoutPlan } from "@/lib/mock/data";

export const isAiConfigured = Boolean(process.env.AI_API_KEY);

export async function generateWorkoutPlan() {
  if (!isAiConfigured) return mockWorkoutPlan;
  return mockWorkoutPlan;
}

export async function generateMealPlan() {
  if (!isAiConfigured) return mockMealPlan;
  return mockMealPlan;
}
