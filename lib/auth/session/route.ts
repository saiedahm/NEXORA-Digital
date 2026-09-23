import { auth } from "@/lib/auth/auth";

export async function GET() {
  const session = await auth();

  return Response.json({
    authenticated: Boolean(session?.user),
    user: session?.user ?? null,
  });
}
