import { NextResponse } from "next/server";
import { checkDatabaseHealth } from "@/lib/db/health";

export async function GET() {
  const database = await checkDatabaseHealth();

  const healthy = database.ok;

  return NextResponse.json(
    {
      ok: healthy,
      service: "nexora-digital",
      timestamp: new Date().toISOString(),
      database,
    },
    {
      status: healthy ? 200 : 503,
    }
  );
}
