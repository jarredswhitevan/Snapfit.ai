export type PlanTier = "core" | "elite";
export type BillingCycle = "monthly" | "annual";
export type GoalType =
  | "lose_fat"
  | "build_muscle"
  | "maintain"
  | "recomposition"
  | "athletic_performance";

export interface Profile {
  id: string;
  email: string;
  firstName: string;
  goal: GoalType;
  age?: number;
}

export interface Subscription {
  planTier: PlanTier;
  billingCycle: BillingCycle;
  trialEndsAt?: string;
  renewalDate?: string;
  status: "trialing" | "active" | "past_due" | "canceled";
}

export interface OnboardingProfile {
  firstName: string;
  age: number;
  sex: "male" | "female" | "other";
  heightCm: number;
  currentWeightKg: number;
  targetWeightKg: number;
  primaryGoal: GoalType;
  experience: "beginner" | "intermediate" | "advanced";
  trainingDays: number;
  workoutLocation: string;
  equipment: string[];
  sessionDuration: number;
  activityLevel: string;
  dietaryPreference: string;
  allergies: string;
  mealsPerDay: number;
  calorieGoalPreference: string;
  injuries: string;
}

export interface WorkoutExercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  notes?: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutPlan {
  id: string;
  title: string;
  weeklyOverview: string;
  coachingNotes: string[];
  progressionRecommendations: string[];
  days: WorkoutDay[];
  createdAt: string;
}

export interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  prepNotes: string;
}

export interface MealPlan {
  id: string;
  title: string;
  dailyOverview: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  createdAt: string;
}

export interface ProgressLog {
  date: string;
  weightKg: number;
}

export interface HabitLog {
  name: string;
  completed: boolean;
  streak: number;
}
