import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const getSession = async () => {
  if (!isSupabaseConfigured) return null;

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
  };
};

export const requireSession = async () => getSession();
