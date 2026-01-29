import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { BillingPortalButton } from "@/components/BillingPortalButton";

export default async function AccountPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status, current_period_end")
    .eq("user_id", user?.id ?? "")
    .maybeSingle();

  return (
    <div className="container space-y-6">
      <Card className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">Account</h1>
          <p className="text-sm text-slate-600">Manage your subscription.</p>
        </div>
        <div className="space-y-2 text-sm text-slate-700">
          <p>
            <strong>Status:</strong> {subscription?.status ?? "Not subscribed"}
          </p>
          {subscription?.current_period_end && (
            <p>
              <strong>Renews:</strong>{" "}
              {new Date(subscription.current_period_end).toLocaleDateString()}
            </p>
          )}
        </div>
        {subscription?.status && <BillingPortalButton />}
      </Card>
    </div>
  );
}
