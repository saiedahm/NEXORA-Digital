import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 600,
};

export async function GET(request: Request) {
  const issuer = process.env.DFS_OIDC_ISSUER;
  const clientId = process.env.DFS_OIDC_CLIENT_ID;
  const redirectUri = process.env.DFS_OIDC_REDIRECT_URI;
  if (!issuer || !clientId || !redirectUri) {
    return NextResponse.json(
      { error: "Digital Future SSO is not configured yet. Local NEXORA login remains available." },
      { status: 503 },
    );
  }

  try {
    const metadataResponse = await fetch(
      issuer.replace(/\/$/, "") + "/.well-known/openid-configuration",
      { cache: "no-store" },
    );
    if (!metadataResponse.ok) throw new Error("OIDC discovery failed");
    const metadata = await metadataResponse.json();
    if (metadata.issuer !== issuer || !metadata.authorization_endpoint) {
      throw new Error("OIDC issuer metadata mismatch");
    }

    const state = randomBytes(32).toString("base64url");
    const nonce = randomBytes(32).toString("base64url");
    const verifier = randomBytes(48).toString("base64url");
    const challenge = createHash("sha256").update(verifier).digest("base64url");
    const url = new URL(metadata.authorization_endpoint);
    url.search = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: "openid email profile",
      state,
      nonce,
      code_challenge: challenge,
      code_challenge_method: "S256",
    }).toString();

    const response = NextResponse.redirect(url);
    response.cookies.set("nexora_dfs_oauth_state", state, cookieOptions);
    response.cookies.set("nexora_dfs_oauth_nonce", nonce, cookieOptions);
    response.cookies.set("nexora_dfs_oauth_verifier", verifier, cookieOptions);
    return response;
  } catch (error) {
    console.error("Digital Future SSO start failed", error);
    return NextResponse.json({ error: "Unable to start secure SSO. Please use local login." }, { status: 502 });
  }
}
