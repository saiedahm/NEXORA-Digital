 import { NextResponse } from "next/server";
import { checkDatabaseHealth } from "@/lib/db/health";

export async function GET() {
  const database = await checkDatabaseHealth();

  return NextResponse.json(
    {
      status: database ? "ok" : "degraded",
      service: "NEXORA DIGITAL",
      checks: {
        application: "ok",
        database: database ? "ok" : "error",
      },
      timestamp: new Date().toISOString(),
    },
    {
      status: database ? 200 : 503,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
