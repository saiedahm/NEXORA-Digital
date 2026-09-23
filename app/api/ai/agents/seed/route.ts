 import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/client";
import { AI_AGENTS } from "@/lib/ai/agents";
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

  for (const agent of AI_AGENTS) {
    const existing = await prisma.aiAgent.findUnique({
      where: {
        key: agent.key,
      },
      select: {
        id: true,
      },
    });

    await prisma.aiAgent.upsert({
      where: {
        key: agent.key,
      },
      update: {
        name: agent.name,
        role: agent.role,
        department: agent.department,
        systemPrompt: agent.systemPrompt,
        permissions: agent.permissions,
        tools: agent.tools,
      },
      create: {
        key: agent.key,
        name: agent.name,
        role: agent.role,
        department: agent.department,
        systemPrompt: agent.systemPrompt,
        permissions: agent.permissions,
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
    total: AI_AGENTS.length,
  });
}
