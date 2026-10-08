import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { currentUser } from "@/lib/auth/current-user";
import { getPlanLimits, isActiveSubscription } from "@/lib/billing/plans";

const statuses = ["DRAFT", "PUBLISHED", "CLOSED"] as const;

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await currentUser();
    if (!user || user.role !== "COMPANY" || !user.company) return NextResponse.json({ error: "Company access required" }, { status: 403 });
    const { id } = await params;
    const job = await db.job.findFirst({
      where: { id, companyId: user.company.id },
      select: {
        id: true, title: true, description: true, country: true, city: true,
        employmentType: true, salaryRange: true, status: true, createdAt: true,
        applications: {
          select: {
            id: true, status: true, coverMessage: true, createdAt: true,
            candidate: {
              select: {
                id: true, headline: true, summary: true, skills: true,
                yearsExperience: true, education: true, languages: true,
                preferredLocations: true, employmentPreference: true,
                user: { select: { name: true, email: true } },
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });
    if (!job) return NextResponse.json({ error: "Vacancy not found" }, { status: 404 });
    return NextResponse.json(job);
  } catch (error) {
    console.error("Company vacancy lookup failed", error);
    return NextResponse.json({ error: "Unable to load vacancy." }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await currentUser();
    if (!user?.company) return NextResponse.json({ error: "Company access required" }, { status: 403 });
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const status = typeof body.status === "string" ? body.status : "";
    if (!statuses.includes(status as typeof statuses[number])) {
      return NextResponse.json({ error: "Invalid vacancy status." }, { status: 400 });
    }
    const job = await db.job.findFirst({
      where: { id, companyId: user.company.id },
      select: { id: true, status: true },
    });
    if (!job) return NextResponse.json({ error: "Vacancy not found" }, { status: 404 });
    if (status === "PUBLISHED") {
      if (!user.company.verified) {
        return NextResponse.json({ error: "Company verification is required before publishing jobs." }, { status: 403 });
      }
      const sub = await db.subscription.findFirst({
        where: { userId: user.id },
        orderBy: { updatedAt: "desc" },
        select: { plan: true, status: true },
      });
      const plan = isActiveSubscription(sub?.status) ? sub?.plan : "FREE";
      const limit = getPlanLimits(plan).companyJobs;
      if (limit < 1) return NextResponse.json({ error: "An active Business subscription is required to publish vacancies." }, { status: 403 });
      if (job.status !== "PUBLISHED") {
        const published = await db.job.count({ where: { companyId: user.company.id, status: "PUBLISHED" } });
        if (published >= limit) return NextResponse.json({ error: "Your current plan has reached its published vacancy limit." }, { status: 403 });
      }
    }
    const updated = await db.job.update({ where: { id: job.id }, data: { status: status as typeof statuses[number] } });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Company vacancy update failed", error);
    return NextResponse.json({ error: "Unable to update vacancy." }, { status: 500 });
  }
}
