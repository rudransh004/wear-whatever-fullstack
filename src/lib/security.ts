import crypto from "crypto";
import { NextResponse } from "next/server";

/** Never derive externally-visible URLs from Host/X-Forwarded-* request headers. */
export function applicationUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) throw new Error("NEXT_PUBLIC_SITE_URL must be configured as the canonical HTTPS URL");
  const url = new URL(value);
  if (process.env.NODE_ENV === "production" && url.protocol !== "https:") throw new Error("NEXT_PUBLIC_SITE_URL must use HTTPS in production");
  return url.origin;
}

export function safeEqual(left: string, right: string, encoding: BufferEncoding = "hex") {
  try {
    const a = Buffer.from(left, encoding);
    const b = Buffer.from(right, encoding);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch { return false; }
}

export function jsonError(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}
