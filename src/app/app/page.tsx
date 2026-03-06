import Link from "next/link";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card } from "@/components/ui/card";
import { demoSubscription, mockProgress } from "@/lib/mock/data";

export default function AppDashboard() {
  return (
    <div>
      <PageHeader title="Welcome back, Alex" description="Goal: Build muscle · Keep momentum this week." />
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Calorie target" value="2,550" helper="Daily" />
        <StatCard label="Macro target" value="P185 C265 F80" />
        <StatCard label="Workouts this week" value="4" />
        <StatCard label="Latest weight" value={`${mockProgress.at(-1)?.weightKg ?? "--"} kg`} />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2"><p className="font-medium">Quick actions</p><div className="mt-3 flex flex-wrap gap-2">{[["Generate workout plan","/app/workouts"],["Generate meal plan","/app/meals"],["Log progress","/app/progress"],["Update habits","/app/habits"]].map(([l,h])=><Link className="rounded-lg border px-3 py-2 text-sm" href={h} key={l}>{l}</Link>)}</div></Card>
        <Card><p className="font-medium">Subscription tier</p><p className="mt-2 text-2xl capitalize">{demoSubscription.planTier}</p><p className="text-sm text-muted-foreground">Trial active</p>{demoSubscription.planTier === "core" && <Link href="/app/billing" className="mt-3 inline-block text-sm text-green-600">Unlock Elite insights</Link>}</Card>
      </div>
    </div>
  );
}
