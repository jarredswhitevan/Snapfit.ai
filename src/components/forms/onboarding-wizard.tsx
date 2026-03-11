"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { saveOnboarding } from "@/app/actions/onboarding";

const schema = z.object({
  firstName: z.string().min(2),
  age: z.coerce.number().min(13).max(90),
  sex: z.enum(["male", "female", "other"]),
  heightFt: z.coerce.number().min(3).max(7),
  heightIn: z.coerce.number().min(0).max(11.9),
  weightLbs: z.coerce.number().min(70).max(600),
  bodyType: z.string().optional(),
  activityLevel: z.enum(["sedentary", "light", "moderate", "very"]),
  goalType: z.enum(["lose_weight", "gain_weight", "maintain"]),
  targetWeightLbs: z.coerce.number().min(70).max(600).optional(),
  timeframeWeeks: z.coerce.number().min(1).max(260).optional(),
});

export function OnboardingWizard() {
  const [done, setDone] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      age: 28,
      sex: "male",
      heightFt: 5,
      heightIn: 10,
      weightLbs: 180,
      bodyType: "",
      activityLevel: "moderate",
      goalType: "maintain",
      targetWeightLbs: undefined,
      timeframeWeeks: 12,
    },
  });

  if (done)
    return (
      <div className="rounded-xl border bg-green-500/10 p-4 text-sm">
        Onboarding saved. Redirecting to dashboard...
      </div>
    );

  const goalType = form.watch("goalType");

  return (
    <form
      onSubmit={form.handleSubmit(async (values) => {
        setSaving(true);
        setError(null);
        try {
          const res = await saveOnboarding(values);
          if (res?.message) setNote(res.message);
          localStorage.setItem("snapfit_onboarding_complete", "1");
          setDone(true);
          setTimeout(() => (window.location.href = "/app"), 900);
        } catch (e: any) {
          setError(e?.message ?? "Unable to save onboarding.");
        } finally {
          setSaving(false);
        }
      })}
      className="grid gap-4 md:grid-cols-2"
    >
      <Input placeholder="First name" {...form.register("firstName")} />
      <Input type="number" placeholder="Age" {...form.register("age")} />

      <Select {...form.register("sex")}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </Select>

      <div className="grid gap-2 md:col-span-1">
        <Input type="number" placeholder="Height (ft)" {...form.register("heightFt")} />
      </div>
      <div className="grid gap-2 md:col-span-1">
        <Input type="number" placeholder="Height (in)" {...form.register("heightIn")} />
      </div>
      <Input type="number" placeholder="Weight (lbs)" {...form.register("weightLbs")} />

      <Select {...form.register("bodyType")}>
        <option value="">Body type (optional)</option>
        <option value="shredded">Shredded</option>
        <option value="lean">Lean</option>
        <option value="overweight">Overweight</option>
        <option value="obese">Obese</option>
      </Select>

      <Select {...form.register("activityLevel")}>
        <option value="sedentary">Sedentary</option>
        <option value="light">Lightly active</option>
        <option value="moderate">Moderately active</option>
        <option value="very">Very active</option>
      </Select>

      <Select {...form.register("goalType")}>
        <option value="lose_weight">Lose weight</option>
        <option value="gain_weight">Gain weight</option>
        <option value="maintain">Maintain</option>
      </Select>

      {goalType !== "maintain" ? (
        <>
          <Input type="number" placeholder="Target weight (lbs)" {...form.register("targetWeightLbs")} />
          <Input type="number" placeholder="Timeframe (weeks)" {...form.register("timeframeWeeks")} />
        </>
      ) : (
        <div className="md:col-span-2 text-sm text-muted-foreground">We’ll calculate maintenance calories.</div>
      )}

      {note ? <div className="md:col-span-2 rounded-lg border bg-muted p-3 text-sm">{note}</div> : null}
      {error ? <div className="md:col-span-2 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-700">{error}</div> : null}

      <Button className="md:col-span-2" type="submit" disabled={saving}>
        {saving ? "Saving..." : "Complete onboarding"}
      </Button>
    </form>
  );
}
