import { redirect } from "next/navigation";

export default function OnboardingPage() {
  // Onboarding now lives at /onboarding (outside the /app layout gate)
  redirect("/onboarding");
}
