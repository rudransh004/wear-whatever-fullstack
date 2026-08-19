import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import crypto from "crypto";
import { applicationUrl, safeEqual } from "../../../../lib/security";

export async function POST(req: Request) {
  const baseUrl = applicationUrl();
  try {
    const data = await req.formData();
    const txnid = String(data.get("txnid") ?? ""), amount = String(data.get("amount") ?? ""), productinfo = String(data.get("productinfo") ?? ""), firstname = String(data.get("firstname") ?? ""), email = String(data.get("email") ?? ""), status = String(data.get("status") ?? ""), receivedHash = String(data.get("hash") ?? "");
    const udf = [1, 2, 3, 4, 5].map(n => String(data.get(`udf${n}`) ?? ""));
    const key = process.env.PAYU_MERCHANT_KEY, salt = process.env.PAYU_MERCHANT_SALT;
    if (!key || !salt || !txnid || !receivedHash || !Number.isFinite(Number(amount))) throw new Error("Invalid PayU callback");
    const expectedHash = crypto.createHash("sha512").update(`${salt}|${status}||||||${udf[4]}|${udf[3]}|${udf[2]}|${udf[1]}|${udf[0]}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`).digest("hex");
    if (!safeEqual(expectedHash, receivedHash)) return NextResponse.redirect(`${baseUrl}/order-success?error=tampering_detected`, 303);
    const order = await prisma.order.findUnique({ where: { id: txnid }, select: { totalAmount: true } });
    if (!order || Number(amount) !== order.totalAmount) return NextResponse.redirect(`${baseUrl}/order-success?error=amount_mismatch`, 303);
    if (status === "success") await prisma.order.update({ where: { id: txnid }, data: { status: "PAID" } });
    return NextResponse.redirect(`${baseUrl}/order-success?orderId=${encodeURIComponent(txnid)}`, 303);
  } catch (error) {
    console.error("PayU callback rejected", error);
    return NextResponse.redirect(`${baseUrl}/order-success?error=verification_failed`, 303);
  }
}
