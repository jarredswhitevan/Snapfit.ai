import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { OnboardingForm } from "@/components/OnboardingForm";

export default async function OnboardingPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("age, height_cm, weight_lbs, goal, training_days, equipment, dietary_prefs")
    .eq("id", user?.id ?? "")
    .single();

  return (
    <div className="container flex justify-center">
      <Card className="w-full max-w-3xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Tell us about you</h1>
          <p className="text-sm text-slate-600">
            We use this to build a training split and meal plan that fit your goals.
          </p>
        </div>
        <OnboardingForm defaultValues={profile ?? undefined} />
      </Card>
    </div>
  );
}
