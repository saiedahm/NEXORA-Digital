import { createPublicKey, createVerify, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { createSessionToken } from "@/lib/auth/session";

export const runtime = "nodejs";

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function decodePart(value: string) {
  return JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
}

async function verifyIdToken(token: string, expectedNonce: string, clientId: string, issuer: string) {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Malformed ID token");
  const header = decodePart(parts[0]);
  const claims = decodePart(parts[1]);
  if (!["RS256", "ES256"].includes(header.alg) || typeof header.kid !== "string") {
    throw new Error("Unsupported ID token signing algorithm");
  }
  if (claims.iss !== issuer || !(claims.aud === clientId || (Array.isArray(claims.aud) && claims.aud.includes(clientId)))) {
    throw new Error("ID token issuer or audience mismatch");
  }
  if (typeof claims.exp !== "number" || claims.exp <= Math.floor(Date.now() / 1000)) throw new Error("Expired ID token");
  if (typeof claims.nonce !== "string" || !safeEqual(claims.nonce, expectedNonce)) throw new Error("ID token nonce mismatch");

  const discoveryResponse = await fetch(issuer.replace(/\/$/, "") + "/.well-known/openid-configuration", { cache: "no-store" });
  if (!discoveryResponse.ok) throw new Error("OIDC discovery unavailable");
  const discovery = await discoveryResponse.json();
  if (discovery.issuer !== issuer || !discovery.jwks_uri) throw new Error("OIDC metadata mismatch");
  const jwksResponse = await fetch(discovery.jwks_uri, { cache: "no-store" });
  if (!jwksResponse.ok) throw new Error("OIDC signing keys unavailable");
  const jwks = await jwksResponse.json();
  const jwk = Array.isArray(jwks.keys) ? jwks.keys.find((key: any) => key.kid === header.kid && (!key.alg || key.alg === header.alg)) : null;
  if (!jwk) throw new Error("ID token signing key not found");
  const publicKey = createPublicKey({ key: jwk, format: "jwk" });
  const verifier = createVerify(header.alg === "RS256" ? "RSA-SHA256" : "SHA256");
  verifier.update(parts[0] + "." + parts[1]);
  verifier.end();
  const signature = Buffer.from(parts[2], "base64url");
  const valid = header.alg === "ES256"
    ? verifier.verify({ key: publicKey, dsaEncoding: "ieee-p1363" }, signature)
    : verifier.verify(publicKey, signature);
  if (!valid) throw new Error("Invalid ID token signature");
  if (typeof claims.sub !== "string" || !claims.sub) throw new Error("Missing stable subject");
  return claims as { sub: string; email?: string; name?: string; iss: string };
}

function clearOAuthCookies(response: NextResponse) {
  for (const name of ["nexora_dfs_oauth_state", "nexora_dfs_oauth_nonce", "nexora_dfs_oauth_verifier"]) {
    response.cookies.set(name, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
  }
  return response;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  const errorCode = url.searchParams.get("error");
  const cookieHeader = request.headers.get("cookie") || "";
  const cookie = (name: string) => cookieHeader.split(";").map((part) => part.trim()).find((part) => part.startsWith(name + "="))?.slice(name.length + 1);
  const expectedState = cookie("nexora_dfs_oauth_state");
  const nonce = cookie("nexora_dfs_oauth_nonce");
  const verifier = cookie("nexora_dfs_oauth_verifier");
  const issuer = process.env.DFS_OIDC_ISSUER;
  const clientId = process.env.DFS_OIDC_CLIENT_ID;
  const clientSecret = process.env.DFS_OIDC_CLIENT_SECRET;
  const redirectUri = process.env.DFS_OIDC_REDIRECT_URI;

  const fail = (message: string, status = 400) => clearOAuthCookies(
    NextResponse.json({ error: message, note: "You can still sign in using your normal NEXORA email and password." }, { status }),
  );

  if (errorCode) return fail("Digital Future sign-in was cancelled or denied.");
  if (!code || !returnedState || !expectedState || !nonce || !verifier || !safeEqual(returnedState, expectedState)) {
    return fail("The SSO security check failed. Please start sign-in again.");
  }
  if (!issuer || !clientId || !clientSecret || !redirectUri) return fail("Digital Future SSO is not configured yet.", 503);

  try {
    const discoveryResponse = await fetch(issuer.replace(/\/$/, "") + "/.well-known/openid-configuration", { cache: "no-store" });
    if (!discoveryResponse.ok) throw new Error("OIDC discovery unavailable");
    const discovery = await discoveryResponse.json();
    if (discovery.issuer !== issuer || !discovery.token_endpoint) throw new Error("OIDC metadata mismatch");

    const basic = Buffer.from(clientId + ":" + clientSecret).toString("base64");
    const tokenResponse = await fetch(discovery.token_endpoint, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded", authorization: "Basic " + basic },
      body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: redirectUri, code_verifier: verifier }),
      cache: "no-store",
    });
    if (!tokenResponse.ok) throw new Error("Authorization code exchange failed");
    const tokenData = await tokenResponse.json();
    if (typeof tokenData.id_token !== "string") throw new Error("OIDC ID token was not returned");
    const claims = await verifyIdToken(tokenData.id_token, nonce, clientId, issuer);

    // Only a previously linked (issuer, subject) identity can sign in. Never auto-link by email.
    const identity = await db.externalIdentity.findUnique({
      where: { issuer_subject: { issuer: claims.iss, subject: claims.sub } },
      include: { user: { select: { id: true, role: true } } },
    });
    if (!identity) return fail("This Digital Future identity is not linked to a NEXORA account yet. Sign in locally and link it through the verified account-linking process.", 403);

    const response = NextResponse.redirect(new URL("/dashboard", request.url));
    response.cookies.set("nexora_session", createSessionToken(identity.user.id), {
      httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 604800,
    });
    return clearOAuthCookies(response);
  } catch (error) {
    console.error("Digital Future SSO callback failed", error);
    return fail("Secure SSO verification failed. Please use your normal NEXORA login and try again.", 502);
  }
}
