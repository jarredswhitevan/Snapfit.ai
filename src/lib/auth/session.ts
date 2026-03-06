import { createSupabaseServerClient } from "@/lib/supabase/server";
import { demoSubscription } from "@/lib/mock/data";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const getSession = async () => {
  if (!isSupabaseConfigured) return null;

  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return {
    user: {
      id: user.id,
      email: user.email ?? "",
      firstName: user.user_metadata?.first_name ?? "Athlete",
      goal: "build_muscle" as const,
    },
    subscription: demoSubscription,
    isDemo: false,
  };
};

export const requireSession = async () => getSession();
