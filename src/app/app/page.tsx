import Link from "next/link";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card } from "@/components/ui/card";
import { getSession } from "@/lib/auth/session";

export default async function AppDashboard() {
  const session = await getSession();
  const name = session?.user?.firstName ? session.user.firstName : "there";

  return (
    <div>
      <PageHeader title={`Welcome back, ${name}`} description="Let's keep momentum this week." />
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Calorie target" value="--" helper="Daily" />
        <StatCard label="Macro target" value="--" />
        <StatCard label="Workouts this week" value="--" />
        <StatCard label="Latest weight" value="--" />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <p className="font-medium">Quick actions</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              ["Generate workout plan", "/app/workouts"],
              ["Generate meal plan", "/app/meals"],
              ["Calorie tracker", "/app/calories"],
              ["Log progress", "/app/progress"],
            ].map(([l, h]) => (
              <Link className="rounded-lg border px-3 py-2 text-sm" href={h} key={l}>
                {l}
              </Link>
            ))}
          </div>
        </Card>
        <Card>
          <p className="font-medium">Subscription</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your subscription and billing details.
          </p>
          <Link href="/app/billing" className="mt-3 inline-block text-sm text-green-600">
            Billing
          </Link>
        </Card>
      </div>
    </div>
  );
}
