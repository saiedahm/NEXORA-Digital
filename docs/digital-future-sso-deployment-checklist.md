# Digital Future ID SSO pilot — deployment checklist

Status: implementation is on `feature/digital-future-sso-pilot` and is NOT production-ready until the checks below pass. Do not merge or deploy merely because the routes exist.

## NEXORA environment variables

Set these only in the NEXORA project's Vercel **Preview** environment for this feature branch first:

- `DFS_OIDC_ISSUER`: exact `issuer` value from the Digital Future Supabase OIDC discovery JSON at `https://czitsrevuwixcjorfwhq.supabase.co/auth/v1/.well-known/openid-configuration`. Do not assume the discovery URL itself is the issuer.
- `DFS_OIDC_CLIENT_ID`: client ID generated when registering the confidential NEXORA OAuth app in the Digital Future Supabase project.
- `DFS_OIDC_CLIENT_SECRET`: client secret generated for that app. Store only as a Vercel environment secret; never commit it or paste it into chat.
- `DFS_OIDC_REDIRECT_URI`: exactly `https://www.nexoraonline.de/api/auth/sso/callback` for production, but do not register/use it until that route is deployed and tested. Use a separate Preview client and the exact preview callback URL for preview testing.

The code also requires the issuer's OIDC discovery document to publish the correct issuer, authorization endpoint, token endpoint, and JWKS URI. Supabase requires asymmetric signing (RS256 or ES256) when the `openid` scope is requested.

## Supabase OAuth app

In Digital Future's Supabase dashboard, register a **Confidential** OAuth app named `NEXORA Digital`, keep dynamic client registration disabled, and use exact redirect URI matching. Register only the tested callback URL. The client secret is displayed once; save it directly in the Vercel environment secret.

## Required validation before merge

1. Confirm the Digital Future consent page is deployed at the configured authorization path and uses Supabase JS OAuth methods to show client/scopes and approve/deny.
2. Run Prisma generation and a production build on the feature branch.
3. Apply the additive `ExternalIdentity` migration only to the intended test database, then test rollback/restore.
4. Add an explicit, authenticated account-linking workflow before expecting SSO to log in any NEXORA user. The callback intentionally refuses identities that are not already linked and never auto-links by email.
5. Test denied consent, invalid state, expired/malformed/signature-invalid ID tokens, wrong issuer/audience/nonce, missing environment variables, and successful sign-in for a pre-linked identity.
6. Verify the local email/password login still works and the role/permissions remain the NEXORA database values.
7. Only after all checks pass, open a production deployment and register the production redirect URI. No production database migration or live-site change is authorized by this checklist.

## Current limitation

This branch is a code preparation, not a completed working SSO service. No OAuth client has yet been created, no client secret has been configured, no identity has been linked, and no live end-to-end test has passed.
