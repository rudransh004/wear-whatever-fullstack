import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { createClient } from "../../../utils/supabase/server";
import { prisma } from "../../../lib/prisma";
import { takeRateLimit } from "../../../lib/rate-limit";
import { jsonError } from "../../../lib/security";

export const runtime = "nodejs";
export const maxDuration = 90;
const COMFY_URL = process.env.COMFYUI_URL ?? "http://127.0.0.1:8188";
const timeoutFetch = (url: string, init?: RequestInit, timeout = 10_000) => fetch(url, { ...init, signal: AbortSignal.timeout(timeout), cache: "no-store" });

export async function POST(req: Request) {
  let release: (() => void) | undefined;
  let creditCharged = false;
  let userId: string | undefined;
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return jsonError("Authentication is required.", 401);
    userId = user.id;
    const limit = takeRateLimit(`image:${user.id}`, 3, 60 * 60 * 1000, 1);
    if (!limit.allowed) return NextResponse.json({ success: false, error: "Rate limit exceeded." }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
    release = limit.release;
    const { prompt } = await req.json();
    if (typeof prompt !== "string" || !prompt.trim() || prompt.length > 500) return jsonError("Prompt must be between 1 and 500 characters.", 400);

    // Atomic conditional decrement prevents parallel requests from overspending a credit balance.
    const charged = await prisma.user.updateMany({ where: { id: user.id, isProUser: false, aiCredits: { gt: 0 } }, data: { aiCredits: { decrement: 1 } } });
    const profile = charged.count === 0 ? await prisma.user.findUnique({ where: { id: user.id }, select: { isProUser: true } }) : null;
    if (charged.count === 0 && !profile?.isProUser) return jsonError("No image credits remaining.", 403);
    creditCharged = charged.count === 1;

    const workflow = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src", "app", "api", "generate", "workflow_api.json"), "utf8"));
    workflow["3"].inputs.seed = crypto.getRandomValues(new Uint32Array(1))[0];
    workflow["6"].inputs.text = prompt.trim();
    const queued = await timeoutFetch(`${COMFY_URL}/prompt`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: workflow }) });
    if (!queued.ok) throw new Error("ComfyUI queue rejected request");
    const { prompt_id: promptId } = await queued.json();
    if (typeof promptId !== "string") throw new Error("ComfyUI did not return a job ID");
    const deadline = Date.now() + 60_000;
    while (Date.now() < deadline) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const history = await timeoutFetch(`${COMFY_URL}/history/${encodeURIComponent(promptId)}`);
      if (!history.ok) continue;
      const result = await history.json();
      const outputs = result[promptId]?.outputs ?? {};
      for (const node of Object.values(outputs) as Array<{ images?: Array<{ filename: string; subfolder?: string }> }>) {
        const image = node.images?.[0];
        if (image) return NextResponse.json({ success: true, imageUrl: `${COMFY_URL}/view?filename=${encodeURIComponent(image.filename)}&type=output${image.subfolder ? `&subfolder=${encodeURIComponent(image.subfolder)}` : ""}` });
      }
    }
    throw new Error("ComfyUI job timed out");
  } catch (error) {
    if (creditCharged && userId) await prisma.user.update({ where: { id: userId }, data: { aiCredits: { increment: 1 } } }).catch(() => undefined);
    console.error("Image generation failed", error);
    return jsonError("Image generation failed. Your credit was restored if charged.", 503);
  } finally { release?.(); }
}
