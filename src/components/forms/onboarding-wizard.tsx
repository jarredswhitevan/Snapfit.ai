"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const schema = z.object({
  firstName: z.string().min(2),
  age: z.coerce.number().min(13).max(90),
  sex: z.string(),
  primaryGoal: z.string(),
  trainingDays: z.coerce.number().min(1).max(7),
  dietaryPreference: z.string(),
  injuries: z.string().optional(),
});

export function OnboardingWizard() {
  const [done, setDone] = useState(false);
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { firstName: "", age: 28, sex: "male", primaryGoal: "build_muscle", trainingDays: 4, dietaryPreference: "balanced", injuries: "" } });

  if (done) return <div className="rounded-xl border bg-green-500/10 p-4 text-sm">Onboarding saved. Redirecting to dashboard...</div>;

  return (
    <form onSubmit={form.handleSubmit(() => { localStorage.setItem("snapfit_onboarding_complete", "1"); setDone(true); setTimeout(() => (window.location.href = "/app"), 700); })} className="grid gap-4 md:grid-cols-2">
      <Input placeholder="First name" {...form.register("firstName")} />
      <Input type="number" placeholder="Age" {...form.register("age")} />
      <Select {...form.register("sex")}><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></Select>
      <Select {...form.register("primaryGoal")}><option value="lose_fat">Lose fat</option><option value="build_muscle">Build muscle</option><option value="maintain">Maintain</option><option value="recomposition">Body recomposition</option><option value="athletic_performance">Athletic performance</option></Select>
      <Input type="number" placeholder="Training days/week" {...form.register("trainingDays")} />
      <Select {...form.register("dietaryPreference")}><option>Balanced</option><option>High-protein</option><option>Vegetarian</option><option>Vegan</option></Select>
      <Input className="md:col-span-2" placeholder="Injuries or limitations" {...form.register("injuries")} />
      <Button className="md:col-span-2" type="submit">Complete onboarding</Button>
    </form>
  );
}
