import { redirect } from "next/navigation";
import { PageHeader } from "@/components/dashboard/page-header";
import { OnboardingWizard } from "@/components/forms/onboarding-wizard";
import { getSession } from "@/lib/auth/session";

export default async function OnboardingPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="mx-auto max-w-2xl p-6">
      <PageHeader
        title="Onboarding"
        description="Tell SnapFIT about your body, activity level, and goal. We'll calculate a safe daily calorie target."
      />
      <OnboardingWizard />
    </div>
  );
}
