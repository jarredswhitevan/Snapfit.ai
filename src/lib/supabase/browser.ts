import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured, supabaseEnv } from "./config";

export const createSupabaseBrowserClient = () => {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(supabaseEnv.url!, supabaseEnv.anonKey!);
};
