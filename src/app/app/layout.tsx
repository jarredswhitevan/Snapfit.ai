import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { requireSession } from "@/lib/auth/session";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();
  if (!session) redirect("/login");
  return <AppShell>{children}</AppShell>;
}
