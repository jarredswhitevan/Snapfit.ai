import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { SignOutButton } from "@/components/SignOutButton";

export const Navbar = async () => {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          SnapFIT
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/pricing" className="text-slate-600 hover:text-slate-900">
            Pricing
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
                Dashboard
              </Link>
              <Link href="/account" className="text-slate-600 hover:text-slate-900">
                Account
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link href="/auth">
              <Button>Get Started</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
