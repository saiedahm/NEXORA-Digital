import nodemailer from "nodemailer";

function transporter() {
  const host = process.env.EMAIL_SERVER_HOST;
  const user = process.env.EMAIL_SERVER_USER;
  const pass = process.env.EMAIL_SERVER_PASSWORD;

  if (!host || !user || !pass) {
    throw new Error("NEXORA email service is not configured.");
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.EMAIL_SERVER_PORT || 587),
    secure: process.env.EMAIL_SERVER_SECURE === "true",
    auth: { user, pass },
  });
}

export async function sendVerificationEmail(email: string, token: string, requestOrigin?: string) {
  const baseUrl = (process.env.NEXTAUTH_URL || process.env.AUTH_URL || requestOrigin || "").replace(/\/$/, "");
  if (!baseUrl) throw new Error("NEXORA public URL is not configured.");

  const from = process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER;
  if (!from) throw new Error("NEXORA sender email is not configured.");

  const url = `${baseUrl}/api/auth/verify-email?token=${encodeURIComponent(token)}`;

  await transporter().sendMail({
    from,
    to: email,
    subject: "Confirm your NEXORA email address",
    text: `Welcome to NEXORA. Please confirm your email address by opening this link: ${url} This link expires in 24 hours.`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto"><h2>Welcome to NEXORA DIGITAL</h2><p>Please confirm your email address to activate your customer account.</p><p><a href="${url}" style="display:inline-block;padding:12px 20px;background:#00d9ff;color:#03111f;text-decoration:none;border-radius:8px;font-weight:bold">Confirm my email</a></p><p>This confirmation link expires in 24 hours.</p></div>`,
  });
}

export async function sendCompanyRegistrationNotice(email: string) {
  const companyEmail = process.env.NEXORA_COMPANY_EMAIL || process.env.EMAIL_SERVER_USER;
  if (!companyEmail) return;

  try {
    const from = process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER;
    if (!from) return;
    await transporter().sendMail({
      from,
      to: companyEmail,
      subject: "New NEXORA customer registration",
      text: `A new customer registered with email: ${email}. The customer is awaiting email confirmation.`,
    });
  } catch (error) {
    console.error("NEXORA company registration notice failed:", error);
  }
}
