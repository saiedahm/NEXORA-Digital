import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { currentUser } from "@/lib/auth/current-user";
import { db } from "@/lib/db/client";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const body = await req.json().catch(() => ({}));
    const subject = typeof body.subject === "string" ? body.subject.trim().slice(0, 160) : "";
    const message = typeof body.message === "string" ? body.message.trim().slice(0, 3000) : "";
    const email = typeof body.email === "string" ? body.email.trim().slice(0, 254) : user?.email ?? null;

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (subject.length < 3 || message.length < 10) {
      return NextResponse.json({ error: "Please provide a subject and message." }, { status: 400 });
    }

    await db.$executeRaw`
      INSERT INTO "ContactMessage" ("id", "userId", "email", "subject", "message", "createdAt")
      VALUES (${randomUUID()}, ${user?.id ?? null}, ${email}, ${subject}, ${message}, CURRENT_TIMESTAMP)
    `;

    return NextResponse.json({ received: true, authenticated: Boolean(user), message: "Your message has been received." }, { status: 201 });
  } catch (error) {
    console.error("Contact submission failed", error);
    return NextResponse.json({ error: "Unable to send your message." }, { status: 500 });
  }
}
