
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/client";
import { NextResponse } from "next/server";

export async function GET() {
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
} 
