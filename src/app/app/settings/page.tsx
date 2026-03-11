import { PageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { getSession } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { UnitSystemSelect } from "@/components/forms/unit-system-select";

export default async function SettingsPage() {
  const session = await getSession();
  const name = session?.user?.firstName || "";
  const email = session?.user?.email || "";

  let unitSystem: "imperial" | "metric" = "imperial";
  if (isSupabaseConfigured && session?.user?.id) {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase
      .from("profiles")
      .select("unit_system")
      .eq("id", session.user.id)
      .maybeSingle();
    unitSystem = (data as any)?.unit_system === "metric" ? "metric" : "imperial";
  }

  return (
    <div>
      <PageHeader title="Settings" description="Profile, preferences, and account controls." />
      <div className="space-y-3">
        <Card>
          <p className="font-medium">Profile</p>
          <p className="text-sm text-muted-foreground">
            {name || "User"}
            {email ? ` · ${email}` : ""}
          </p>
        </Card>
        <Card>
          <p className="font-medium">Theme</p>
          <div className="mt-2">
            <ThemeToggle />
          </div>
        </Card>
        <Card>
          <p className="font-medium">Units</p>
          <p className="text-sm text-muted-foreground">Choose how we display weight/height.</p>
          <div className="mt-2">
            <UnitSystemSelect initial={unitSystem} />
          </div>
        </Card>
        <Card>
          <p className="font-medium">Account</p>
          <p className="text-sm text-muted-foreground">Password reset available from login.</p>
        </Card>
      </div>
    </div>
  );
}
