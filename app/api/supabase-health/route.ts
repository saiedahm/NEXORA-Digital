import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase
      .from("organizations")
      .select("id")
      .limit(1);

    if (error) {
      return NextResponse.json(
        { ok: false, service: "supabase", error: error.message },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      service: "supabase",
      database: "connected",
    });
  } catch {
    return NextResponse.json(
      { ok: false, service: "supabase", error: "Supabase is not configured." },
      { status: 503 }
    );
  }
}
