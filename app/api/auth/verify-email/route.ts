import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { prisma } from "@/lib/db/client";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) return NextResponse.redirect(new URL("/login?verified=0", request.url));

  const hashed = createHash("sha256").update(token).digest("hex");
  const record = await prisma.verificationToken.findUnique({ where: { token: hashed } });

  if (!record || record.expires < new Date() || !record.identifier.startsWith("email:")) {
    return NextResponse.redirect(new URL("/login?verified=0", request.url));
  }

  const email = record.identifier.slice("email:".length);

  await prisma.user.update({
    where: { email },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({ where: { token: hashed } });

  return NextResponse.redirect(new URL("/login?verified=1", request.url));
}
