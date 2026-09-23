# NEXORA DIGITAL

Production-oriented Next.js foundation for the NEXORA DIGITAL AI Digital Agency Operating System.

## Architecture
- Next.js App Router / React / TypeScript
- PostgreSQL + Prisma
- Real AI provider abstraction
- Multi-tenant agent/task model
- Stripe payment gate
- PWA foundation
- Vercel web + Hetzner workers/services

## Required services
PostgreSQL, an AI provider, Stripe, Redis-compatible queue, S3-compatible storage, email provider, and authentication secrets are external runtime dependencies. No secrets belong in Git.

## Run
1. Copy `.env.example` to `.env` and provide real values.
2. Install dependencies.
3. Run `npm run prisma:generate`.
4. Run `npm run prisma:validate`.
5. Apply migrations against a configured PostgreSQL database.
6. Run `npm run dev`.

The repository intentionally does not claim production completion until the external services and the full acceptance test are configured and executed.
