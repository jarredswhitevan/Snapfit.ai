import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

  const { unitSystem } = await req.json().catch(() => ({}));
  if (unitSystem !== "imperial" && unitSystem !== "metric") {
    return NextResponse.json({ error: "Invalid unitSystem" }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user?.id) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { error } = await supabase.from("profiles").upsert({ id: data.user.id, unit_system: unitSystem }, { onConflict: "id" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
