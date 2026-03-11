export type Sex = "male" | "female" | "other";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "very";
export type GoalType = "lose_weight" | "gain_weight" | "maintain";

export function lbsToKg(lbs: number) {
  return lbs / 2.2046226218;
}

export function mifflinStJeorBmr(input: { sex: Sex; age: number; heightCm: number; weightKg: number }) {
  const { sex, age, heightCm, weightKg } = input;
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (sex === "male") return base + 5;
  if (sex === "female") return base - 161;
  // "other": use midpoint constant
  return base - 78;
}

export function activityMultiplier(level: ActivityLevel) {
  if (level === "sedentary") return 1.2;
  if (level === "light") return 1.375;
  if (level === "moderate") return 1.55;
  return 1.725;
}

export function computeCalorieTarget(input: {
  sex: Sex;
  age: number;
  heightCm: number;
  weightLbs: number;
  activityLevel: ActivityLevel;
  goalType: GoalType;
  targetWeightLbs?: number;
  timeframeWeeks?: number;
}) {
  const weightKg = lbsToKg(input.weightLbs);
  const bmr = mifflinStJeorBmr({ sex: input.sex, age: input.age, heightCm: input.heightCm, weightKg });
  const tdee = bmr * activityMultiplier(input.activityLevel);

  let calories = tdee;
  let message: string | null = null;

  if (input.goalType === "maintain") {
    calories = tdee;
  } else {
    const targetWeightLbs = input.targetWeightLbs;
    const weeks = input.timeframeWeeks;

    if (!targetWeightLbs || !weeks || weeks <= 0) {
      // Missing data: fallback to modest goal adjustment.
      const delta = input.goalType === "lose_weight" ? -400 : 250;
      calories = tdee + delta;
      message = "Set a target weight + timeframe for a more precise (and safer) calorie target.";
    } else {
      const deltaLbs = targetWeightLbs - input.weightLbs; // negative means loss
      const perWeek = Math.abs(deltaLbs) / weeks;

      const bw = input.weightLbs;
      const safeLossMax = Math.max(0.5, bw * 0.01); // lbs/week, cap by 1%/wk with floor
      const safeLossMin = Math.max(0.25, bw * 0.0025);

      const safeGainMax = Math.max(0.25, bw * 0.005); // 0.5%/wk
      const safeGainMin = 0.25;

      if (input.goalType === "lose_weight") {
        if (deltaLbs >= 0) {
          message = "Your target weight is not below your current weight. Switching to maintenance calories.";
          calories = tdee;
        } else {
          const desired = perWeek;
          const clamped = Math.min(Math.max(desired, safeLossMin), safeLossMax);
          const dailyDeficit = (clamped * 3500) / 7;
          const cappedDeficit = Math.min(Math.max(dailyDeficit, 250), 1000);
          calories = tdee - cappedDeficit;
          if (desired > safeLossMax) {
            message = `That timeline is too aggressive. Using a safer loss rate (~${clamped.toFixed(1)} lb/week).`;
          }
        }
      }

      if (input.goalType === "gain_weight") {
        if (deltaLbs <= 0) {
          message = "Your target weight is not above your current weight. Switching to maintenance calories.";
          calories = tdee;
        } else {
          const desired = perWeek;
          const clamped = Math.min(Math.max(desired, safeGainMin), safeGainMax);
          const dailySurplus = (clamped * 3500) / 7;
          const cappedSurplus = Math.min(Math.max(dailySurplus, 150), 500);
          calories = tdee + cappedSurplus;
          if (desired > safeGainMax) {
            message = `That timeline is too aggressive. Using a safer gain rate (~${clamped.toFixed(1)} lb/week).`;
          }
        }
      }
    }
  }

  // floor/ceiling sanity guardrails
  const minCalories = input.sex === "male" ? 1500 : 1200;
  const safeCalories = Math.max(calories, minCalories);

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    calorieTarget: Math.round(safeCalories),
    message,
  };
}
