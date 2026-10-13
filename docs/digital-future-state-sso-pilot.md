# DIGITAL FUTURE STATE → NEXORA SSO pilot

## Safety status
This branch is an isolated pilot. Do not merge to `main` or enable production sign-in until all prerequisites and end-to-end checks below pass. Existing email/password authentication and the `nexora_session` cookie must remain available as a fallback.

## Verified current design
- NEXORA currently authenticates against its own Prisma `User` table and issues an HMAC-signed `nexora_session` cookie.
- User roles are `CANDIDATE`, `COMPANY`, and `ADMIN`.
- DIGITAL FUTURE STATE currently exposes a browser Supabase client for its own account page. That alone is not an OAuth/OIDC identity provider and does not create SSO between domains.

## Required protocol
Use OAuth 2.0 Authorization Code flow with PKCE and OpenID Connect (OIDC). Never pass a password from DIGITAL FUTURE STATE to NEXORA, never trust an email or role supplied in a query string, and never accept unsigned identity claims.

The central provider must issue a stable subject identifier (`sub`) and verified email claim. NEXORA must validate issuer, audience/client ID, signature, expiry, state and nonce; exchange the authorization code server-side; then map the identity by (issuer, subject), not email alone. First-time account linking must not silently attach an identity to an existing account merely because emails match. Require a secure linking flow or verified-email policy.

NEXORA must create its own short-lived signed `nexora_session` after successful validation, preserve its existing role/authorization checks, and never grant `ADMIN` based on identity-provider claims. If the identity is not linked to an existing NEXORA account, show a controlled onboarding step and require the user to choose candidate/company registration.

## Configuration prerequisites
1. Configure and verify a real OIDC/OAuth server on the dedicated DIGITAL FUTURE STATE identity project; the current browser Supabase setup is not sufficient.
2. Register NEXORA as a client and obtain a client ID and, if required by the provider, client secret. Store secrets only in Vercel environment variables.
3. Configure the exact production callback URL and local development callback URL in the provider and NEXORA allowlist.
4. Define provider issuer, authorization, token and JWKS endpoints from official provider metadata; do not guess endpoints.
5. Configure account-linking, verified-email, logout/session-expiry, consent and privacy behavior.

## Acceptance tests before merge
- New and existing NEXORA email/password login still work.
- Valid central identity can sign in and receive a NEXORA session.
- Invalid state/nonce, mismatched issuer/audience, expired token, invalid signature, reused code and callback errors are rejected.
- An unverified email cannot silently link an existing account.
- A central identity cannot gain company/admin/candidate privileges by changing claims or URL parameters.
- Return URL is allowlisted to avoid open redirects.
- Logout and expired sessions behave safely.
- Production deployment and database-backed end-to-end tests pass.

## Rollback
Do not modify the production branch while the pilot is incomplete. Disable the SSO feature flag and retain the existing NEXORA login as the rollback path.
