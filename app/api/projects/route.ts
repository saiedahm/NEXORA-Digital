 import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const createProjectSchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().max(5000).optional(),
});

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const projects = await prisma.project.findMany({
    where: {
      ownerId: session.user.id,
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
      name: parsed.data.name,
      description: parsed.data.description ?? null,
      ownerId: session.user.id,
    },
  });

  return NextResponse.json(
    {
      project,
    },
    { status: 201 }
  );
}
