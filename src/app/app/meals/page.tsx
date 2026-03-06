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
  return <div><PageHeader title="Meal Planner" description="Generate personalized nutrition plans with macro targets." />
  <div className="grid gap-4 md:grid-cols-3"><Input defaultValue="2550" placeholder="Calories"/><Select><option>Balanced</option><option>High protein</option><option>Low carb</option></Select><Input placeholder="Allergies"/></div>
  <div className="mt-3 flex gap-2"><Button onClick={async()=>{const r=await fetch('/api/ai/generate',{method:'POST',body:JSON.stringify({type:'meal'})});setPlan(await r.json());}}>Generate meal plan</Button><Button className="bg-slate-700">Save plan</Button></div>
  <div className="mt-6">{plan ? <MealPlanCard plan={plan} /> : <p className="text-sm text-muted-foreground">No meal plan yet.</p>}</div></div>;
}
