# NEXORA SSO pilot — configuration runbook

This is an isolated setup checklist for the DIGITAL FUTURE STATE identity provider and NEXORA client. It does not enable SSO in production.

## What is already committed in this pilot

- NEXORA and DIGITAL FUTURE STATE each have an isolated feature branch.
- The consent page exists at `/oauth/consent/` in the DIGITAL FUTURE STATE branch.
- The account sign-in page preserves the `authorization_id` query parameter while the user signs in.
- No production branch, existing NEXORA login flow, or live deployment was changed.

## Provider setup (must be completed in the Supabase dashboard)

The configured Supabase project URL currently present in the public client config is:

`https://czitsrevuwixcjorfwhq.supabase.co`

This URL is public configuration, not proof that the OAuth server is enabled.

1. Open the Supabase project and go to **Authentication → OAuth Server**.
2. Enable the OAuth 2.1 server only after confirming this is the intended DIGITAL FUTURE STATE identity project.
3. Set the authorization path to `/oauth/consent`. The site URL must point to the deployed DIGITAL FUTURE STATE domain for the consent page to load there.
4. Use asymmetric JWT signing (RS256 or ES256) if OIDC `openid` scope is used. Do not share signing keys with NEXORA.
5. Register a separate **Confidential** OAuth client for NEXORA (server-side application). Save its client ID and client secret directly into the NEXORA Vercel environment settings. Never paste the secret into chat, source files, GitHub commits, or a public variable.
6. Use only the exact callback URL implemented by the NEXORA server-side callback. Do not register a guessed callback path. The callback implementation is not yet committed, so do not register or activate the client for live use yet.
7. Request only the scopes required for sign-in: `openid email profile`. Do not request phone or database access for the pilot unless a later documented requirement needs it.

## Required NEXORA implementation before registering the callback

- Add a server-side start route that creates cryptographically random `state`, `nonce`, and PKCE verifier/challenge, stores them in secure short-lived cookies, and redirects to the provider authorization endpoint.
- Add a server-side callback route that exchanges the code at the token endpoint, validates the ID token signature using the provider JWKS, and checks exact issuer, audience, expiry, nonce and state.
- A dedicated Prisma `ExternalIdentity` mapping model has now been added on this feature branch, uniquely keyed by `issuer + subject` and linked to the local `User`. It still needs a reviewed database migration before it can be used. Do not silently link accounts by email alone.
- Require an explicit secure account-linking/onboarding path for identities not already linked. Preserve NEXORA roles from its own database; never accept an ADMIN role from the identity provider.
- Keep the existing email/password login as the fallback and gate the SSO button behind a disabled-by-default feature flag until end-to-end testing passes.
- Add logout behavior, CSRF/open-redirect protections, rate limiting, and automated tests.

## Validation and rollout

1. Confirm provider discovery metadata and endpoints from the official OIDC discovery URL after enabling the server:
   `https://czitsrevuwixcjorfwhq.supabase.co/auth/v1/.well-known/openid-configuration`
2. Build and test the branch with a separate test client and test accounts.
3. Test invalid state, nonce, issuer, audience, signature, expired tokens, unverified email, duplicate identity, role escalation, callback errors, and fallback login.
4. Deploy only as a preview. Verify manually before any production merge.
5. Keep production untouched until every acceptance test passes.

## Cost and secret handling

Supabase documents OAuth 2.1 Server as having no separate feature fee, but users count toward the project's monthly active users. Do not share or commit client secrets, service-role keys, signing keys, or access/refresh tokens. No financial permissions are required for identity-only SSO.


## Latest isolated code change

The Prisma schema on this branch now includes `ExternalIdentity`, with a unique constraint on `issuer + subject` and a relation to the local NEXORA user. This is a schema-only preparation: no database migration was run, no identity is linked, and no sign-in behavior changed. Before use, generate and review a migration against a non-production database, then run the existing build and auth tests. Do not run a production migration until a tested deployment plan and backup/rollback approach exist.
