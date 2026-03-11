import { HabitLog, MealPlan, ProgressLog, Subscription, WorkoutPlan } from "@/types/domain";

export const demoUser = { id: "demo-user", email: "demo@snapfit.ai", firstName: "Alex", goal: "build_muscle" as const };

export const demoSubscription: Subscription = {
  planTier: "core",
  billingCycle: "monthly",
  status: "trialing",
  trialEndsAt: new Date(Date.now() + 5 * 86400000).toISOString(),
  renewalDate: new Date(Date.now() + 35 * 86400000).toISOString(),
};

export const mockWorkoutPlan: WorkoutPlan = {
  id: "w1",
  title: "Strength + Conditioning Split",
  weeklyOverview: "4-day upper/lower split focused on progressive overload and conditioning.",
  coachingNotes: ["Keep 1-2 reps in reserve on compounds", "Track load increases weekly"],
  progressionRecommendations: ["Increase weight 2.5-5% after hitting top reps", "Deload every 5th week"],
  createdAt: new Date().toISOString(),
  days: [
    { day: "Monday", focus: "Upper Strength", exercises: [{ name: "Barbell Bench Press", sets: "4", reps: "5-6", rest: "120s" }, { name: "Chest Supported Row", sets: "4", reps: "8", rest: "90s" }] },
    { day: "Tuesday", focus: "Lower Strength", exercises: [{ name: "Back Squat", sets: "4", reps: "5", rest: "150s" }, { name: "Romanian Deadlift", sets: "3", reps: "8", rest: "120s" }] },
  ],
};

export const mockMealPlan: MealPlan = {
  id: "m1",
  title: "Lean Muscle Daily Meal Plan",
  dailyOverview: "High-protein, moderate-carb structure with easy meal prep.",
  totalCalories: 2550,
  totalProtein: 185,
  totalCarbs: 265,
  totalFat: 80,
  createdAt: new Date().toISOString(),
  meals: [
    { name: "Protein Oats", calories: 520, protein: 38, carbs: 62, fat: 14, ingredients: ["Oats", "Whey", "Blueberries", "Almond butter"], prepNotes: "Mix oats and whey after cooking." },
    { name: "Chicken Rice Bowl", calories: 710, protein: 55, carbs: 78, fat: 20, ingredients: ["Chicken breast", "Jasmine rice", "Avocado", "Spinach"], prepNotes: "Cook chicken in bulk for 3 days." },
  ],
};

export const mockProgress: ProgressLog[] = [
  { date: "2026-02-01", weightKg: 82.4 },
  { date: "2026-02-08", weightKg: 81.9 },
  { date: "2026-02-15", weightKg: 81.2 },
  { date: "2026-02-22", weightKg: 80.8 },
];

export const mockHabits: HabitLog[] = [
  { name: "3L water", completed: true, streak: 8 },
  { name: "8k steps", completed: false, streak: 5 },
  { name: "Workout complete", completed: true, streak: 12 },
];
