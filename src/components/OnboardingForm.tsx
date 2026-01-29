"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { saveOnboarding } from "@/app/actions/onboarding";

const onboardingSchema = z.object({
  age: z.coerce.number().min(16).max(100),
  height_cm: z.coerce.number().min(120).max(230),
  weight_lbs: z.coerce.number().min(80).max(400),
  goal: z.enum(["lose fat", "gain muscle", "recomp"]),
  training_days: z.coerce.number().min(3).max(6),
  equipment: z.enum(["gym", "home", "dumbbells"]),
  dietary_prefs: z.string().optional().nullable()
});

type OnboardingValues = z.infer<typeof onboardingSchema>;

export const OnboardingForm = ({
  defaultValues
}: {
  defaultValues?: Partial<OnboardingValues>;
}) => {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues
  });

  const onSubmit = (values: OnboardingValues) => {
    startTransition(async () => {
      await saveOnboarding(values);
      window.location.href = "/dashboard";
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="text-sm font-medium">Age</label>
          <Input type="number" {...register("age")} />
          {errors.age && (
            <p className="mt-1 text-xs text-red-500">{errors.age.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium">Height (cm)</label>
          <Input type="number" {...register("height_cm")} />
          {errors.height_cm && (
            <p className="mt-1 text-xs text-red-500">{errors.height_cm.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium">Weight (lbs)</label>
          <Input type="number" {...register("weight_lbs")} />
          {errors.weight_lbs && (
            <p className="mt-1 text-xs text-red-500">{errors.weight_lbs.message}</p>
          )}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Goal</label>
          <select
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
            {...register("goal")}
          >
            <option value="lose fat">Lose fat</option>
            <option value="gain muscle">Gain muscle</option>
            <option value="recomp">Recomp</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Training days / week</label>
          <Input type="number" {...register("training_days")} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Equipment</label>
          <select
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
            {...register("equipment")}
          >
            <option value="gym">Full gym</option>
            <option value="home">Home / bodyweight</option>
            <option value="dumbbells">Dumbbells only</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Dietary preferences</label>
          <Input
            placeholder="e.g. vegetarian, picky with fish"
            {...register("dietary_prefs")}
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        Save & Continue
      </Button>
    </form>
  );
};
