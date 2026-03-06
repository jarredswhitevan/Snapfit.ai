import { Card } from "@/components/ui/card";
import { MealPlan } from "@/types/domain";

export function MealPlanCard({ plan }: { plan: MealPlan }) {
  return (
    <Card>
      <h3 className="text-lg font-semibold">{plan.title}</h3>
      <p className="text-sm text-muted-foreground">{plan.dailyOverview}</p>
      <p className="mt-2 text-sm">{plan.totalCalories} kcal · P{plan.totalProtein}/C{plan.totalCarbs}/F{plan.totalFat}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {plan.meals.map((meal) => (
          <div key={meal.name} className="rounded-xl border p-3">
            <p className="font-medium">{meal.name}</p>
            <p className="text-xs text-muted-foreground">{meal.calories} kcal · P{meal.protein}/C{meal.carbs}/F{meal.fat}</p>
            <p className="mt-1 text-xs">{meal.ingredients.join(", ")}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
