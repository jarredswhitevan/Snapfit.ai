import { Plan } from "@/types/plan";
import { Card } from "@/components/ui/Card";

export const PlanView = ({ plan }: { plan: Plan }) => {
  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <h2 className="text-xl font-semibold">Workout Plan</h2>
        <div className="space-y-4">
          {plan.workout_plan.map((day) => (
            <details
              key={day.day}
              className="rounded-lg border border-slate-200 p-4"
            >
              <summary className="cursor-pointer text-sm font-semibold">
                {day.day}: {day.focus}
              </summary>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <p><strong>Warmup:</strong> {day.warmup}</p>
                <ul className="space-y-2">
                  {day.exercises.map((exercise, index) => (
                    <li key={`${exercise.name}-${index}`}>
                      <p className="font-medium text-slate-900">{exercise.name}</p>
                      <p>
                        {exercise.sets} sets x {exercise.reps} reps · {exercise.rest_sec}s rest
                      </p>
                      {exercise.notes && <p>{exercise.notes}</p>}
                    </li>
                  ))}
                </ul>
                <p><strong>Finisher:</strong> {day.finisher}</p>
                <p><strong>Cooldown:</strong> {day.cooldown}</p>
              </div>
            </details>
          ))}
        </div>
      </Card>
      <Card className="space-y-4">
        <h2 className="text-xl font-semibold">Meal Plan</h2>
        <div className="space-y-4">
          {plan.meal_plan.map((day) => (
            <details
              key={day.day}
              className="rounded-lg border border-slate-200 p-4"
            >
              <summary className="cursor-pointer text-sm font-semibold">
                {day.day}: {day.calories} calories
              </summary>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <p>
                  <strong>Macros:</strong> {day.macros.protein_g}g protein · {day.macros.carbs_g}g carbs · {day.macros.fat_g}g fat
                </p>
                <ul className="space-y-2">
                  {day.meals.map((meal, index) => (
                    <li key={`${meal.name}-${index}`}>
                      <p className="font-medium text-slate-900">{meal.name}</p>
                      <p>{meal.foods.join(", ")}</p>
                      {meal.notes && <p>{meal.notes}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </Card>
      <Card className="space-y-2">
        <h3 className="text-lg font-semibold">Coach Tips</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
          {plan.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
};
