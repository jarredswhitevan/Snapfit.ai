import { cookies } from "next/headers";
import { demoSubscription, demoUser } from "@/lib/mock/data";

const DEMO_COOKIE = "snapfit_demo_auth";

export const getSession = async () => {
  const cookieStore = cookies();
  const isAuthed = cookieStore.get(DEMO_COOKIE)?.value === "1";
  if (!isAuthed) return null;
  return { user: demoUser, subscription: demoSubscription, isDemo: true };
};

export const requireSession = async () => {
  const session = await getSession();
  return session;
};

export const demoCookieName = DEMO_COOKIE;
