import OpenAI from "openai";
import { mockMealPlan, mockWorkoutPlan } from "@/lib/mock/data";
import type { MealPlan, WorkoutPlan } from "@/types/domain";

const resolvedApiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY;
export const isAiConfigured = Boolean(resolvedApiKey);

const defaultModel = "gpt-4.1-mini";

function safeJsonParse<T>(text: string): T | null {
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

function extractFirstJsonObject(text: string): string | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  return text.slice(start, end + 1);
}

export async function generateWorkoutPlan(): Promise<WorkoutPlan> {
  if (!isAiConfigured) return mockWorkoutPlan;

  try {
    const client = new OpenAI({ apiKey: resolvedApiKey });
    const model = process.env.AI_MODEL || process.env.OPENAI_MODEL || defaultModel;

    const prompt = `You are SnapFIT, an expert strength & conditioning coach.
Return ONLY valid JSON for a WorkoutPlan with fields:
{id,title,weeklyOverview,coachingNotes,progressionRecommendations,days:[{day,focus,exercises:[{name,sets,reps,rest,notes?}]}],createdAt}
- createdAt must be an ISO string.
- Keep it realistic for a general "build muscle" goal, 4 days/week.
- Keep strings concise.
`;

    const res = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: "You output strict JSON only." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const content = res.choices?.[0]?.message?.content ?? "";
    const jsonText = extractFirstJsonObject(content) ?? content;
    const parsed = safeJsonParse<WorkoutPlan>(jsonText);
    if (!parsed?.id || !parsed?.title) return mockWorkoutPlan;
    return parsed;
  } catch {
    return mockWorkoutPlan;
  }
}

export async function generateMealPlan(): Promise<MealPlan> {
  if (!isAiConfigured) return mockMealPlan;

  try {
    const client = new OpenAI({ apiKey: resolvedApiKey });
    const model = process.env.AI_MODEL || process.env.OPENAI_MODEL || defaultModel;

    const prompt = `You are SnapFIT, an expert sports nutrition coach.
Return ONLY valid JSON for a MealPlan with fields:
{id,title,dailyOverview,meals:[{name,calories,protein,carbs,fat,ingredients,prepNotes}],totalCalories,totalProtein,totalCarbs,totalFat,createdAt}
- createdAt must be an ISO string.
- Aim for ~2500 calories and high protein for building muscle.
- 3-5 meals, ingredients as an array of short strings.
`;

    const res = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: "You output strict JSON only." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const content = res.choices?.[0]?.message?.content ?? "";
    const jsonText = extractFirstJsonObject(content) ?? content;
    const parsed = safeJsonParse<MealPlan>(jsonText);
    if (!parsed?.id || !parsed?.title) return mockMealPlan;
    return parsed;
  } catch {
    return mockMealPlan;
  }
}
