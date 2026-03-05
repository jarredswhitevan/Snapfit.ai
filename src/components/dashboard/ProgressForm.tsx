"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { logProgress } from "@/app/actions/progress";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const progressSchema = z.object({
  weight_lbs: z.coerce.number().optional().nullable(),
  workout_completed: z.boolean().optional().default(false)
});

type ProgressValues = z.infer<typeof progressSchema>;

export const ProgressForm = () => {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset
  } = useForm<ProgressValues>({
    resolver: zodResolver(progressSchema)
  });

  const onSubmit = (values: ProgressValues) => {
    startTransition(async () => {
      await logProgress(values);
      reset();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Weight (lbs)</label>
        <Input type="number" step="0.1" {...register("weight_lbs")} />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register("workout_completed")} />
        Workout completed today
      </label>
      <Button type="submit" variant="outline" disabled={isPending}>
        Save Progress
      </Button>
    </form>
  );
};
