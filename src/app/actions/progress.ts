"use server";

import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const progressSchema = z.object({
  weight_lbs: z.coerce.number().optional().nullable(),
  workout_completed: z.boolean().optional().default(false)
});

export const logProgress = async (values: z.infer<typeof progressSchema>) => {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const payload = progressSchema.parse(values);

  const { error } = await supabase.from("progress_logs").insert({
    user_id: user.id,
    weight_lbs: payload.weight_lbs ?? null,
    workout_completed: payload.workout_completed ?? false
  });

  if (error) {
    throw new Error(error.message);
  }
};
