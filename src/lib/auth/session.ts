import { cookies } from "next/headers";
import { demoSubscription, demoUser } from "@/lib/mock/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const DEMO_COOKIE = "snapfit_demo_auth";

export const getSession = async () => {
  // Real mode (Supabase)
  if (isSupabaseConfigured) {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user?.id || !user.email) return null;

    const firstName =
      (user.user_metadata?.first_name as string | undefined) ??
      (user.user_metadata?.full_name as string | undefined) ??
      (user.user_metadata?.name as string | undefined) ??
      "";

    const derivedFirstName = firstName || user.email.split("@")[0] || "";

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: derivedFirstName,
        goal: "build_muscle" as const,
      },
      // TODO: pull subscription from DB (or compute from Stripe customer)
      subscription: null,
      isDemo: false,
    };
  }

  // Demo mode fallback
  const cookieStore = cookies();
  const isAuthed = cookieStore.get(DEMO_COOKIE)?.value === "1";
  if (!isAuthed) return null;
  return { user: demoUser, subscription: demoSubscription, isDemo: true };
};

export const requireSession = async () => {
  return getSession();
};

export const demoCookieName = DEMO_COOKIE;
