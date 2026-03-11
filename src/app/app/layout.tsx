import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { requireSession } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();
  if (!session) redirect("/login");

  // Server-side onboarding gate (more reliable than middleware for some deployments)
  if (isSupabaseConfigured) {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase
      .from("profiles")
      .select("onboarding_complete")
      .eq("id", session.user.id)
      .maybeSingle();

    if (!data?.onboarding_complete) {
      redirect("/onboarding");
    }
  }

  return <AppShell>{children}</AppShell>;
}
