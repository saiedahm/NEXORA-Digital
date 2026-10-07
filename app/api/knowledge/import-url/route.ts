import dns from "node:dns/promises";
import net from "node:net";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const runtime = "nodejs";

function isPrivateIp(address: string) {
  if (net.isIPv4(address)) {
    const [a, b] = address.split(".").map(Number);
    return a === 10 || a === 127 || (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) || (a === 169 && b === 254) || a === 0;
  }
  if (net.isIPv6(address)) {
    const value = address.toLowerCase();
    return value === "::1" || value.startsWith("fc") || value.startsWith("fd") ||
      value.startsWith("fe80:");
  }
  return true;
}

async function validatePublicUrl(raw: string) {
  const url = new URL(raw);
  if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("Only HTTP and HTTPS URLs are allowed.");
  if (url.username || url.password) throw new Error("URLs with embedded credentials are not allowed.");
  if (url.port && url.port !== "80" && url.port !== "443") throw new Error("Only standard web ports are allowed.");

  const addresses = await dns.lookup(url.hostname, { all: true });
  if (!addresses.length || addresses.some((item) => isPrivateIp(item.address))) {
    throw new Error("This URL does not resolve to a public web address.");
  }
  return url;
}

function extractText(html: string) {
  return html
    .replace(/<script[^>]*>.*?<\/script>/gis, " ")
    .replace(/<style[^>]*>.*?<\/style>/gis, " ")
    .replace(/<noscript[^>]*>.*?<\/noscript>/gis, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

async function getClient() {
  const store = await cookies();
  return createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (items) => items.forEach(({ name, value, options }) => store.set(name, value, options)),
    },
  });
}

export async function POST(request: Request) {
  try {
    const supabase = await getClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

    const { data: membership } = await supabase.from("memberships")
      .select("organization_id").eq("user_id", user.id).limit(1).maybeSingle();
    if (!membership) return NextResponse.json({ error: "Workspace not found." }, { status: 403 });

    const body = await request.json();
    const rawUrl = typeof body?.url === "string" ? body.url.trim() : "";
    if (!rawUrl || rawUrl.length > 2048) return NextResponse.json({ error: "A valid URL is required." }, { status: 400 });

    const url = await validatePublicUrl(rawUrl);
    const response = await fetch(url, {
      headers: { "User-Agent": "NEXORA-KnowledgeBot/1.0" },
      redirect: "error",
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });

    if (!response.ok) return NextResponse.json({ error: "The website could not be fetched." }, { status: 502 });
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html") && !contentType.includes("text/plain")) {
      return NextResponse.json({ error: "Only HTML or plain-text web pages are supported." }, { status: 415 });
    }

    const html = (await response.text()).slice(0, 1200000);
    const content = extractText(html).slice(0, 100000);
    if (!content) return NextResponse.json({ error: "No readable content was found on this page." }, { status: 422 });

    const title = url.hostname + url.pathname;
    const { data, error } = await supabase.from("knowledge_documents").insert({
      organization_id: membership.organization_id,
      title,
      source_type: "url",
      source_url: url.toString(),
      content,
      created_by: user.id,
    }).select("id, project_id, title, source_type, source_url, content, created_at, updated_at").single();

    if (error) return NextResponse.json({ error: "Unable to save imported website content." }, { status: 500 });
    return NextResponse.json({ document: data }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to import this URL.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
