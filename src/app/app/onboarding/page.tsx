import { PageHeader } from "@/components/dashboard/page-header";
import { OnboardingWizard } from "@/components/forms/onboarding-wizard";

export default function OnboardingPage() {
  return <div><PageHeader title="Premium onboarding" description="Tell SnapFIT about your goals, training style, and nutrition preferences." /><OnboardingWizard /></div>;
}
