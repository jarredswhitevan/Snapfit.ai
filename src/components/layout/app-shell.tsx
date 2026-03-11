import Link from "next/link";
import { SnapfitLogo } from "@/components/branding/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SignOutButton } from "@/components/SignOutButton";

const links = ["", "workouts", "meals", "calories", "progress", "habits", "history", "billing", "settings"];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/20">
      <div className="mx-auto grid max-w-7xl md:grid-cols-[240px_1fr]">
        <aside className="border-r p-4">
          <SnapfitLogo href="/app" />
          <nav className="mt-6 grid gap-1 text-sm">
            {links.map((l) => (
              <Link key={l} href={`/app${l ? `/${l}` : ""}`} className="rounded-lg px-3 py-2 hover:bg-muted">
                {l ? l[0].toUpperCase() + l.slice(1) : "Dashboard"}
              </Link>
            ))}
          </nav>
          <div className="mt-4"><SignOutButton /></div>
        </aside>
        <main>
          <div className="flex justify-end p-4"><ThemeToggle /></div>
          <div className="px-4 pb-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
