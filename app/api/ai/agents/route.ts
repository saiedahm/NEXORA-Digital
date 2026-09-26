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

    return NextResponse.json({ agents });
  } catch (error) {
    console.error("NEXORA AI agents GET error:", error);

    return NextResponse.json(
      { error: "Failed to load AI agents" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const [
      { auth },
      { prisma },
      { AGENTS },
    ] = await Promise.all([
      import("@/lib/auth/auth"),
      import("@/lib/db/client"),
      import("@/lib/ai/agents"),
    ]);

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (
      user.role !== "PLATFORM_ADMINISTRATOR" &&
      user.role !== "SUPPORT_ADMINISTRATOR"
    ) {
      return NextResponse.json(
        { error: "Administrator access required" },
        { status: 403 }
      );
    }

    let created = 0;
    let updated = 0;

    for (const agent of AGENTS) {
      const existing = await prisma.aiAgent.findUnique({
        where: {
          key: agent.id,
        },
        select: {
          id: true,
        },
      });

      await prisma.aiAgent.upsert({
        where: {
          key: agent.id,
        },
        update: {
          name: agent.name,
          role: agent.role,
          department: agent.role,
          systemPrompt: `You are ${agent.name}, the NEXORA DIGITAL ${agent.role}. Follow the NEXORA AI constitution and use only authorized tools.`,
          permissions: {
            tools: agent.tools,
          },
          tools: agent.tools,
        },
        create: {
          key: agent.id,
          name: agent.name,
          role: agent.role,
          department: agent.role,
          systemPrompt: `You are ${agent.name}, the NEXORA DIGITAL ${agent.role}. Follow the NEXORA AI constitution and use only authorized tools.`,
          permissions: {
            tools: agent.tools,
          },
          tools: agent.tools,
          status: "OFFLINE",
        },
      });

      if (existing) {
        updated++;
      } else {
        created++;
      }
    }

    return NextResponse.json({
      success: true,
      created,
      updated,
      total: AGENTS.length,
    });
  } catch (error) {
    console.error("NEXORA AI agents seed error:", error);

    return NextResponse.json(
      { error: "Failed to seed AI agents" },
      { status: 500 }
    );
  }
}
