import Link from "next/link";
import { SnapfitLogo } from "@/components/branding/logo";
import { AuthForm } from "@/components/AuthForm";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  return (
    <main className="mx-auto max-w-md px-4 py-20">
      <SnapfitLogo />
      <h1 className="mt-6 text-2xl font-semibold">Welcome back</h1>
      <p className="text-sm text-muted-foreground">Log in to continue your SnapFIT training dashboard.</p>
      {searchParams?.error === "supabase_not_configured" && (
        <p className="mt-3 rounded-lg border border-amber-400/40 bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-300">
          Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.
        </p>
      )}
      <AuthForm mode="login" />
      <p className="mt-3 text-sm text-muted-foreground">
        New here? <Link href="/signup" className="text-green-600">Start your trial</Link>
      </p>
    </main>
  );
}
