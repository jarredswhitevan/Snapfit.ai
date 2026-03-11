import Link from "next/link";
import { SnapfitLogo } from "@/components/branding/logo";
import { AuthForm } from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-20">
      <SnapfitLogo />
      <h1 className="mt-6 text-2xl font-semibold">Welcome back</h1>
      <p className="text-sm text-muted-foreground">Log in to continue your SnapFIT training dashboard.</p>
      <AuthForm mode="login" />
      <p className="mt-3 text-sm text-muted-foreground">
        New here? <Link href="/signup" className="text-green-600">Start your trial</Link>
      </p>
    </main>
  );
}
