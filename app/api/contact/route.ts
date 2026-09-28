import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_API_URL = "https://api.resend.com/emails";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const subject = typeof body.subject === "string" ? body.subject.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!subject || !message || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (message.length > 500) {
      return NextResponse.json({ error: "Message must not exceed 500 characters" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const apiKey = process.env.EMAIL_API_KEY;
    const adminEmail = process.env.CONTACT_ADMIN_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !adminEmail || !fromEmail) {
      console.error("Contact email configuration is incomplete.");
      return NextResponse.json({ error: "Email service is not configured" }, { status: 503 });
    }

    const response = await fetch(EMAIL_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [adminEmail],
        reply_to: email,
        subject: `NEXORA Kontakt: ${subject}`,
        text: `E-Mail des Kunden: ${email}\n\n${message}`,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("Contact email provider error:", details);
      return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("NEXORA contact API error:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
