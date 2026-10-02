import { NextResponse } from "next/server";
import { randomBytes, createHash } from "node:crypto";
import { prisma } from "@/lib/db/client";
import { hashPassword } from "@/lib/auth/password";
import { sendCompanyRegistrationNotice, sendVerificationEmail } from "@/lib/email/mailer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let createdUserId: string | null = null;
  let createdOrganizationId: string | null = null;

  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");
    const termsAccepted = body.termsAccepted === true;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }
    if (!termsAccepted) {
      return NextResponse.json({ error: "You must accept the terms." }, { status: 400 });
    }

    if (!process.env.EMAIL_API_KEY && (!process.env.EMAIL_SERVER_HOST || !process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD)) {
      console.error("NEXORA email service is not configured in the deployment environment.");
      return NextResponse.json({ error: "Email confirmation is temporarily unavailable. Please try again later." }, { status: 503 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({
        error: existing.emailVerified
          ? "An account with this email already exists."
          : "This email is already registered but not confirmed. Please check your inbox for the confirmation email.",
      }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashPassword(password),
        role: "CUSTOMER",
      },
    });
    createdUserId = user.id;

    const organization = await prisma.organization.create({
      data: {
        name: "NEXORA Organization",
        members: {
          create: { userId: user.id, role: "ORGANIZATION_OWNER" },
        },
      },
    });
    createdOrganizationId = organization.id;

    const terms = await prisma.legalDocument.findFirst({
      where: { type: "TERMS", active: true },
      orderBy: { publishedAt: "desc" },
    });

    if (terms) {
      await prisma.consentRecord.create({
        data: { userId: user.id, documentId: terms.id },
      });
    }

    const rawToken = randomBytes(32).toString("hex");
    const token = createHash("sha256").update(rawToken).digest("hex");

    await prisma.verificationToken.deleteMany({
      where: { identifier: `email:${email}` },
    });

    await prisma.verificationToken.create({
      data: {
        identifier: `email:${email}`,
        token,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    const origin = new URL(request.url).origin;

    try {
      await sendVerificationEmail(email, rawToken, origin);
    } catch (emailError) {
      console.error("NEXORA customer verification email failed:", emailError);
      await prisma.verificationToken.deleteMany({ where: { identifier: `email:${email}` } });
      if (createdOrganizationId) await prisma.organization.delete({ where: { id: createdOrganizationId } });
      if (createdUserId) await prisma.user.delete({ where: { id: createdUserId } });
      return NextResponse.json({ error: "We could not send the confirmation email. Please try again later." }, { status: 503 });
    }

    await sendCompanyRegistrationNotice(email);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("NEXORA registration error:", error);

    try {
      if (createdOrganizationId) await prisma.organization.delete({ where: { id: createdOrganizationId } });
      if (createdUserId) await prisma.user.delete({ where: { id: createdUserId } });
    } catch (cleanupError) {
      console.error("NEXORA registration cleanup failed:", cleanupError);
    }

    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
  }
}
