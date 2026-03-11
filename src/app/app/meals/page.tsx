"use client";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MealPlan } from "@/types/domain";
import { MealPlanCard } from "@/components/ai/meal-plan-card";

export default function MealsPage() {
  const [plan, setPlan] = useState<MealPlan | null>(null);

  const [calories, setCalories] = useState("2550");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [preference, setPreference] = useState("Balanced");
  const [allergies, setAllergies] = useState("");

  return (
    <div>
      <PageHeader
        title="Meal Planner"
        description="Generate personalized nutrition plans with macro targets."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Input
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="Calories"
        />
        <Select value={preference} onChange={(e) => setPreference(e.target.value)}>
          <option>Balanced</option>
          <option>High protein</option>
          <option>Low carb</option>
        </Select>
        <Input
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          placeholder="Allergies"
        />
      </div>

      <div className="mt-3 grid gap-4 md:grid-cols-3">
        <Input
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
          placeholder="Protein (g)"
        />
        <Input
          value={carbs}
          onChange={(e) => setCarbs(e.target.value)}
          placeholder="Carbs (g)"
        />
        <Input value={fat} onChange={(e) => setFat(e.target.value)} placeholder="Fat (g)" />
      </div>

      <div className="mt-3 flex gap-2">
        <Button
          onClick={async () => {
            const r = await fetch("/api/ai/generate", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                type: "meal",
                calories,
                protein,
                carbs,
                fat,
                preference,
                allergies,
              }),
            });
            setPlan(await r.json());
          }}
        >
          Generate meal plan
        </Button>
        <Button className="bg-slate-700">Save plan</Button>
      </div>

      <div className="mt-6">
        {plan ? (
          <MealPlanCard plan={plan} />
        ) : (
          <p className="text-sm text-muted-foreground">No meal plan yet.</p>
        )}
      </div>
    </div>
  );
}
