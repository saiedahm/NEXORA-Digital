import { NextResponse } from "next/server";
import { randomBytes, createHash } from "node:crypto";
import { prisma } from "@/lib/db/client";
import { hashPassword } from "@/lib/auth/password";
import { sendCompanyRegistrationNotice, sendVerificationEmail } from "@/lib/email/mailer";

export const runtime = "nodejs";

export async function POST(request: Request) {
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

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashPassword(password),
        role: "CUSTOMER",
      },
    });

    await prisma.organization.create({
      data: {
        name: "NEXORA Organization",
        members: {
          create: { userId: user.id, role: "ORGANIZATION_OWNER" },
        },
      },
    });

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

    await Promise.all([
      sendVerificationEmail(email, rawToken),
      sendCompanyRegistrationNotice(email),
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("NEXORA registration error:", error);
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
  }
}
