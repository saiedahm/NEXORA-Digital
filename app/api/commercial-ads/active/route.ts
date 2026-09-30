import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/client";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const projects = await prisma.project.findMany({ where: { type: "COMMERCIAL_AD", paymentStatus: "PAID", executionUnlocked: true }, orderBy: { createdAt: "desc" }, take: 20, select: { id: true, name: true, description: true, projectBrief: true, createdAt: true } });
  const ads = projects.map((project) => {
    let brief: any = {};
    try { brief = typeof project.projectBrief === "object" && project.projectBrief ? project.projectBrief : JSON.parse(project.description || "{}"); } catch {}
    return { id: project.id, space: Number(brief.space || 0), companyName: String(brief.companyName || project.name), message: String(brief.message || ""), destination: String(brief.destination || ""), createdAt: project.createdAt, ownerVisible: session?.user?.id ? true : false };
  }).filter((ad) => [1,2,3,4].includes(ad.space));
  return NextResponse.json({ ads });
}
