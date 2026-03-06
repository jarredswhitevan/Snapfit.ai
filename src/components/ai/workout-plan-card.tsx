import { Card } from "@/components/ui/card";
import { WorkoutPlan } from "@/types/domain";

export function WorkoutPlanCard({ plan }: { plan: WorkoutPlan }) {
  return (
    <Card>
      <h3 className="text-lg font-semibold">{plan.title}</h3>
      <p className="text-sm text-muted-foreground">{plan.weeklyOverview}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {plan.days.map((d) => (
          <div key={d.day} className="rounded-xl border p-3">
            <p className="font-medium">{d.day} · {d.focus}</p>
            <ul className="mt-2 space-y-1 text-sm">
              {d.exercises.map((e) => <li key={e.name}>{e.name} — {e.sets}x{e.reps} ({e.rest})</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
}
