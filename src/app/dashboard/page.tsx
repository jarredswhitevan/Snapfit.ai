import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { PlanActions } from "@/components/dashboard/PlanActions";
import { PlanView } from "@/components/dashboard/PlanView";
import { ProgressForm } from "@/components/dashboard/ProgressForm";
import { CheckoutButton } from "@/components/CheckoutButton";
import { planSchema, type Plan } from "@/types/plan";

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: planRecord } = await supabase
    .from("plans")
    .select("plan_json")
    .eq("user_id", user?.id ?? "")
    .eq("active", true)
    .maybeSingle();

  const { data: profile } = await supabase
    .from("profiles")
    .select("free_generation_used")
    .eq("id", user?.id ?? "")
    .single();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status, current_period_end")
    .eq("user_id", user?.id ?? "")
    .maybeSingle();

  const hasActiveSub =
    subscription?.status === "active" || subscription?.status === "trialing";

  let plan: Plan | null = null;
  if (planRecord?.plan_json) {
    const parsed = planSchema.safeParse(planRecord.plan_json);
    if (parsed.success) {
      plan = parsed.data;
    }
  }

  return (
    <div className="container space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-semibold">Your Dashboard</h1>
          <p className="text-sm text-slate-600">
            Generate your plan, log progress, and stay consistent.
          </p>
        </div>
        <PlanActions hasPlan={Boolean(plan)} />
      </div>

      {!hasActiveSub && profile?.free_generation_used && (
        <Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Upgrade for more generations</h2>
            <p className="text-sm text-slate-600">
              You have used your free generation. Subscribe to keep regenerating plans.
            </p>
          </div>
          <CheckoutButton label="Subscribe" />
        </Card>
      )}

      {plan ? (
        <PlanView plan={plan} />
      ) : (
        <Card className="text-center">
          <h2 className="text-lg font-semibold">No plan yet</h2>
          <p className="mt-2 text-sm text-slate-600">
            Generate your first plan to see your workout and meal schedule.
          </p>
        </Card>
      )}

      <Card className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Log Progress</h2>
          <p className="text-sm text-slate-600">
            Keep SnapFIT up to date with your latest stats and completed workouts.
          </p>
        </div>
        <ProgressForm />
      </Card>
    </div>
  );
}
