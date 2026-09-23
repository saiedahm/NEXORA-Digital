 import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/client";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

async function getUserOrganization(userId: string) {
  return prisma.organizationMember.findFirst({
    where: {
      userId,
    },
    orderBy: {
      id: "asc",
    },
    select: {
      organizationId: true,
    },
  });
}

export async function GET(
  request: Request,
  context: RouteContext
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  const membership = await getUserOrganization(session.user.id);

  if (!membership) {
    return NextResponse.json(
      { error: "Organization not found" },
      { status: 404 }
    );
  }

  const project = await prisma.project.findFirst({
    where: {
      id,
      organizationId: membership.organizationId,
      customerId: session.user.id,
    },
    include: {
      tasks: {
        orderBy: {
          createdAt: "asc",
        },
      },
      activities: {
        orderBy: {
          createdAt: "desc",
        },
        take: 50,
      },
    },
  });

  if (!project) {
    return NextResponse.json(
      { error: "Project not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    project,
  });
}
