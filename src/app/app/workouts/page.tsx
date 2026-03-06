"use client";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { WorkoutPlanCard } from "@/components/ai/workout-plan-card";
import { WorkoutPlan } from "@/types/domain";

export default function WorkoutsPage() {
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(false);
  return <div><PageHeader title="Workout Planner" description="Generate smart weekly splits and save your favorite versions." />
    <div className="grid gap-4 md:grid-cols-3"><Input placeholder="Goal" defaultValue="Build muscle"/><Select defaultValue="4"><option value="3">3 days</option><option value="4">4 days</option><option value="5">5 days</option></Select><Input placeholder="Equipment" defaultValue="Dumbbells, bench"/></div>
    <div className="mt-3 flex gap-2"><Button onClick={async()=>{setLoading(true);const r=await fetch('/api/ai/generate',{method:'POST',body:JSON.stringify({type:'workout'})});setPlan(await r.json());setLoading(false);}}>{loading?'Generating...':'Generate plan'}</Button><Button className="bg-slate-700" onClick={()=>setPlan(null)}>Regenerate</Button></div>
    <div className="mt-6">{plan ? <WorkoutPlanCard plan={plan} /> : <p className="text-sm text-muted-foreground">No plan yet. Generate your first plan.</p>}</div></div>;
}
