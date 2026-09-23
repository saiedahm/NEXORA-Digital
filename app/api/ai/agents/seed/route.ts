
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/client";
import { AGENTS } from "@/lib/ai/agents";
import { NextResponse } from "next/server";

export async function POST() {
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
}
