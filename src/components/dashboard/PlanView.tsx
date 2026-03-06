import { MealPlan, WorkoutPlan } from "@/types/domain";
import { MealPlanCard } from "@/components/ai/meal-plan-card";
import { WorkoutPlanCard } from "@/components/ai/workout-plan-card";

export function PlanView({ plan }: { plan: WorkoutPlan | MealPlan | null }) {
  if (!plan) return <p className="text-sm text-muted-foreground">No saved plan yet.</p>;
  if ("days" in plan) return <WorkoutPlanCard plan={plan} />;
  return <MealPlanCard plan={plan} />;
}
