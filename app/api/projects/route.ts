 import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const createProjectSchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().max(5000).optional(),
});

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

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const membership = await getUserOrganization(session.user.id);

  if (!membership) {
    return NextResponse.json(
      { error: "Organization not found" },
      { status: 404 }
    );
  }

  const projects = await prisma.project.findMany({
    where: {
      organizationId: membership.organizationId,
      customerId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({
    projects,
  });
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const membership = await getUserOrganization(session.user.id);

  if (!membership) {
    return NextResponse.json(
      { error: "Organization not found" },
      { status: 404 }
    );
  }

  const body = await request.json();

  const parsed = createProjectSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid project data",
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  const project = await prisma.project.create({
    data: {
      organizationId: membership.organizationId,
      customerId: session.user.id,
      name: parsed.data.name,
      description: parsed.data.description ?? null,
      status: "DRAFT",
      paymentStatus: "PENDING",
      executionUnlocked: false,
    },
  });

  return NextResponse.json(
    {
      project,
    },
    { status: 201 }
  );
}
