"use client";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";
import { mockHabits } from "@/lib/mock/data";

export default function HabitsPage() {
  const [habits, setHabits] = useState(mockHabits);
  return <div><PageHeader title="Habits" description="Build consistency with daily completion and streaks." /><div className="grid gap-3 md:grid-cols-2">{habits.map((h,idx)=><Card key={h.name}><label className="flex items-center justify-between"><span>{h.name}</span><input type="checkbox" checked={h.completed} onChange={()=>setHabits(habits.map((x,i)=>i===idx?{...x,completed:!x.completed}:x))} /></label><p className="text-xs text-muted-foreground">Current streak: {h.streak} days</p></Card>)}</div><Card className="mt-4"><p className="font-medium">Elite analytics preview</p><p className="text-sm text-muted-foreground">Upgrade to Elite for trend scoring and recovery recommendations.</p></Card></div>;
}
