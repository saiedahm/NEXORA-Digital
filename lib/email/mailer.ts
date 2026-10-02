import nodemailer from "nodemailer";

function transporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT || 587),
    secure: process.env.EMAIL_SERVER_SECURE === "true",
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
}

export async function sendVerificationEmail(email: string, token: string) {
  const baseUrl = process.env.NEXTAUTH_URL || process.env.AUTH_URL || "http://localhost:3000";
  const url = `${baseUrl}/api/auth/verify-email?token=${encodeURIComponent(token)}`;

  await transporter().sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Confirm your NEXORA email address",
    text: `Please confirm your NEXORA account by opening this link: ${url}`,
    html: `<p>Welcome to NEXORA.</p><p><a href="${url}">Confirm your email address</a></p><p>This link expires in 24 hours.</p>`,
  });
}

export async function sendCompanyRegistrationNotice(email: string) {
  const companyEmail = process.env.NEXORA_COMPANY_EMAIL || process.env.EMAIL_SERVER_USER;
  if (!companyEmail) return;

  await transporter().sendMail({
    from: process.env.EMAIL_FROM,
    to: companyEmail,
    subject: "New NEXORA customer registration",
    text: `A new customer registered with email: ${email}. The customer is awaiting email confirmation.`,
  });
}
