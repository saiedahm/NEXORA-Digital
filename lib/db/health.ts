 import { prisma } from "@/lib/db/client";

export async function checkDatabaseHealth() {
  const startedAt = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1`;

    return {
      ok: true,
      latencyMs: Date.now() - startedAt,
    };
  } catch (error) {
    return {
      ok: false,
      latencyMs: Date.now() - startedAt,
      error:
        error instanceof Error
          ? error.message
          : "Database health check failed.",
    };
  }
}
