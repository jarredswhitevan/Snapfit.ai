import { z } from "zod";

export const workoutExerciseSchema = z.object({
  name: z.string(),
  sets: z.string(),
  reps: z.string(),
  rest_sec: z.number(),
  notes: z.string().optional().nullable()
});

export const workoutDaySchema = z.object({
  day: z.string(),
  focus: z.string(),
  warmup: z.string(),
  exercises: z.array(workoutExerciseSchema),
  finisher: z.string(),
  cooldown: z.string()
});

export const mealSchema = z.object({
  name: z.string(),
  foods: z.array(z.string()),
  notes: z.string().optional().nullable()
});

export const mealDaySchema = z.object({
  day: z.string(),
  calories: z.number(),
  macros: z.object({
    protein_g: z.number(),
    carbs_g: z.number(),
    fat_g: z.number()
  }),
  meals: z.array(mealSchema)
});

export const planSchema = z.object({
  meta: z.object({
    goal: z.string(),
    training_days: z.number(),
    equipment: z.string(),
    dietary_prefs: z.string().optional().nullable()
  }),
  workout_plan: z.array(workoutDaySchema),
  meal_plan: z.array(mealDaySchema),
  tips: z.array(z.string())
});

export type Plan = z.infer<typeof planSchema>;
