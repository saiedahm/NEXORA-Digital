import nodemailer from "nodemailer";

function smtpTransporter() {
  const host = process.env.EMAIL_SERVER_HOST;
  const user = process.env.EMAIL_SERVER_USER;
  const pass = process.env.EMAIL_SERVER_PASSWORD;
  if (!host || !user || !pass) throw new Error("NEXORA SMTP email service is not configured.");

  return nodemailer.createTransport({
    host,
    port: Number(process.env.EMAIL_SERVER_PORT || 587),
    secure: process.env.EMAIL_SERVER_SECURE === "true",
    auth: { user, pass },
  });
}

async function sendMailMessage(args: { to: string; subject: string; text: string; html?: string }) {
  const apiKey = process.env.EMAIL_API_KEY;
  const from = process.env.EMAIL_FROM || process.env.CONTACT_FROM_EMAIL || process.env.EMAIL_SERVER_USER;

  if (!from) throw new Error("NEXORA sender email is not configured.");

  if (apiKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [args.to],
        subject: args.subject,
        text: args.text,
        ...(args.html ? { html: args.html } : {}),
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`NEXORA email API failed: ${response.status} ${details}`);
    }
    return;
  }

  await smtpTransporter().sendMail({
    from,
    to: args.to,
    subject: args.subject,
    text: args.text,
    html: args.html,
  });
}

function publicBaseUrl(requestOrigin?: string) {
  const value = process.env.NEXTAUTH_URL || process.env.AUTH_URL || requestOrigin;
  if (!value) throw new Error("NEXORA public URL is not configured.");
  return value.replace(/\/$/, "");
}

export async function sendVerificationEmail(email: string, token: string, requestOrigin?: string) {
  const baseUrl = publicBaseUrl(requestOrigin);
  const url = `${baseUrl}/api/auth/verify-email?token=${encodeURIComponent(token)}`;

  await sendMailMessage({
    to: email,
    subject: "Confirm your NEXORA email address",
    text: `Welcome to NEXORA DIGITAL. Confirm your email address here: ${url} This link expires in 24 hours.`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto"><h2>Welcome to NEXORA DIGITAL</h2><p>Please confirm your email address to activate your customer account.</p><p><a href="${url}" style="display:inline-block;padding:12px 20px;background:#00d9ff;color:#03111f;text-decoration:none;border-radius:8px;font-weight:bold">Confirm my email</a></p><p>This confirmation link expires in 24 hours.</p></div>`,
  });
}

export async function sendCompanyRegistrationNotice(email: string) {
  const companyEmail = process.env.NEXORA_COMPANY_EMAIL || process.env.CONTACT_ADMIN_EMAIL || process.env.EMAIL_SERVER_USER;
  if (!companyEmail) return;

  try {
    await sendMailMessage({
      to: companyEmail,
      subject: "New NEXORA customer registration",
      text: `A new customer registered with email: ${email}. The customer is awaiting email confirmation.`,
    });
  } catch (error) {
    console.error("NEXORA company registration notice failed:", error);
  }
}
