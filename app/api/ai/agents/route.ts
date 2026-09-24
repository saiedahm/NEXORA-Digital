
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [{ auth }, { prisma }] = await Promise.all([
      import("@/lib/auth/auth"),
      import("@/lib/db/client"),
    ]);

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const agents = await prisma.aiAgent.findMany({
      select: {
        id: true,
        key: true,
        name: true,
        role: true,
        department: true,
        permissions: true,
        tools: true,
        status: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({
      agents,
    });
  } catch (error) {
    console.error("NEXORA AI agents API error:", error);

    return NextResponse.json(
      {
        error: "Failed to load AI agents",
      },
      { status: 500 }
    );
  }
}
