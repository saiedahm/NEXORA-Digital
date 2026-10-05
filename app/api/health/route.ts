import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "nexora",
    environment: process.env.VERCEL_ENV || "development",
    timestamp: new Date().toISOString(),
  });
}
