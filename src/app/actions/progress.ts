"use server";

import { z } from "zod";

const progressSchema = z.object({
  weightKg: z.coerce.number().positive(),
});

export const logProgress = async (values: z.infer<typeof progressSchema>) => {
  const payload = progressSchema.parse(values);
  return { success: true, ...payload };
};
