import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

function applySecurityHeaders(response: NextResponse, policy: string) {
  response.headers.set("Content-Security-Policy", policy);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(self)");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
}

// FIXED: Using "export default" satisfies the Next.js 16.1.6 proxy requirement
export default async function proxy(request: NextRequest) {
  const nonce = crypto.randomUUID().replace(/-/g, "");
  request.headers.set("x-nonce", nonce);
  const unsafe = !["GET", "HEAD", "OPTIONS"].includes(request.method);
  const providerCallback = request.nextUrl.pathname.startsWith("/api/payu/") || request.nextUrl.pathname.startsWith("/api/webhook/cashfree");
  
  // Payment callbacks bypass this check and are cryptographically verified by their route handlers.
  if (unsafe && !providerCallback) {
    const origin = request.headers.get("origin");
    if (!origin || origin !== request.nextUrl.origin) return NextResponse.json({ error: "Cross-site request blocked" }, { status: 403 });
  }
  
  const response = await updateSession(request);
  
  // Includes https://challenges.cloudflare.com to allow the CAPTCHA widget
  applySecurityHeaders(response, `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self' https://test.payu.in https://secure.payu.in; script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https:; frame-src 'self' https://challenges.cloudflare.com; upgrade-insecure-requests`);
  
  return response;
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"] };