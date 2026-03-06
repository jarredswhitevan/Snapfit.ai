import { PlanTier } from "@/types/domain";

export const PLAN_PRICING = {
  core: { monthly: 19.99, annual: 191.9 },
  elite: { monthly: 39.99, annual: 383.9 },
} as const;

export const PLAN_FEATURES: Record<PlanTier, string[]> = {
  core: [
    "AI workout plan generation",
    "AI meal plan generation",
    "Onboarding profile",
    "Basic dashboard",
    "Weight tracking + macro targets",
    "Workout calendar view",
    "Theme switching",
    "Basic plan history",
  ],
  elite: [
    "Advanced goal personalization",
    "Custom workout split builder",
    "Meal regeneration with tighter controls",
    "Advanced macro adjustment tools",
    "Body metrics tracking",
    "Habit streak analytics",
    "Premium dashboard insights",
    "Downloadable weekly plans",
  ],
};

export const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

export const annualSavings = (tier: PlanTier) =>
  PLAN_PRICING[tier].monthly * 12 - PLAN_PRICING[tier].annual;

export const monthlyEquivalent = (tier: PlanTier) => PLAN_PRICING[tier].annual / 12;
