import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import crypto from "crypto";
import { safeEqual } from "../../../../lib/security";

export async function POST(req: Request) {
  try {
    // Cashfree signs the exact raw body. Parsing before verification is unsafe.
    const rawBody = await req.text();
    const timestamp = req.headers.get("x-webhook-timestamp") ?? "";
    const signature = req.headers.get("x-webhook-signature") ?? "";
    const secret = process.env.CASHFREE_SECRET_KEY;
    if (!secret || !timestamp || !signature) return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    const expected = crypto.createHmac("sha256", secret).update(timestamp + rawBody).digest("base64");
    if (!safeEqual(expected, signature, "base64")) return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    const body = JSON.parse(rawBody);
    if (body?.type === "TEST_WEBHOOK") return NextResponse.json({ success: true });
    const orderId = body?.data?.order?.order_id;
    if (!orderId) return NextResponse.json({ error: "Missing order ID" }, { status: 400 });

    // A signed event is necessary but not sufficient: verify payment status with Cashfree.
    const host = process.env.CASHFREE_ENVIRONMENT === "PRODUCTION" ? "https://api.cashfree.com" : "https://sandbox.cashfree.com";
    const verification = await fetch(`${host}/pg/orders/${encodeURIComponent(orderId)}`, { headers: { "x-client-id": process.env.CASHFREE_APP_ID ?? "", "x-client-secret": secret, "x-api-version": "2023-08-01" }, cache: "no-store" });
    if (!verification.ok) throw new Error("Cashfree order verification failed");
    const verified = await verification.json();
    const order = await prisma.order.findUnique({ where: { id: orderId }, select: { totalAmount: true } });
    if (!order || verified.order_status !== "PAID" || Number(verified.order_amount) !== order.totalAmount) return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    await prisma.order.update({ where: { id: orderId }, data: { status: "PAID" } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cashfree webhook rejected", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
