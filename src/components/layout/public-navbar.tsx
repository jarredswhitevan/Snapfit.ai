import Link from "next/link";
import { SnapfitLogo } from "@/components/branding/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <SnapfitLogo />
        <nav className="hidden gap-6 text-sm md:flex">
          <Link href="/#features">Features</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/login">Login</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/signup" className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white">Start Free Trial</Link>
        </div>
      </div>
    </header>
  );
}
