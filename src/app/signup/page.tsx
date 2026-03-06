import Link from "next/link";
import { SnapfitLogo } from "@/components/branding/logo";
import { AuthForm } from "@/components/AuthForm";

export default function SignupPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-20">
      <SnapfitLogo />
      <h1 className="mt-6 text-2xl font-semibold">Create your SnapFIT account</h1>
      <p className="text-sm text-muted-foreground">Start your 7-day free trial and generate your first plan.</p>
      <AuthForm mode="signup" />
      <p className="mt-3 text-sm text-muted-foreground">
        Already have an account? <Link href="/login" className="text-green-600">Log in</Link>
      </p>
    </main>
  );
}
