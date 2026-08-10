import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const key = process.env.PAYU_MERCHANT_KEY!;
    const salt = process.env.PAYU_MERCHANT_SALT!;
    
    const txnid = formData.get("txnid") as string;
    const amount = formData.get("amount") as string;
    const productinfo = formData.get("productinfo") as string;
    const firstname = formData.get("firstname") as string;
    const email = formData.get("email") as string;
    const status = formData.get("status") as string;
    const payuHash = formData.get("hash") as string;

    const udf1 = formData.get("udf1") as string || "";
    const udf2 = formData.get("udf2") as string || "";
    const udf3 = formData.get("udf3") as string || "";
    const udf4 = formData.get("udf4") as string || "";
    const udf5 = formData.get("udf5") as string || "";

    const hashString = `${salt}|${status}||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
    const generatedHash = crypto.createHash("sha512").update(hashString).digest("hex");

    // 💡 THE FIX: Safely reconstruct the base URL from proxy headers
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
    const baseUrl = `${protocol}://${host}`;

    if (generatedHash === payuHash) {
      if (status === "success") {
        await prisma.order.update({
          where: { id: txnid },
          data: { status: "PAID" }
        });
        console.log(`✅ PayU Order ${txnid} securely verified and marked PAID.`);
      }
    } else {
      console.error(`🚨 CRITICAL: PayU Hash Mismatch for Order ${txnid}.`);
      return NextResponse.redirect(`${baseUrl}/order-success?error=tampering_detected`, 303);
    }

    // Redirect using the safely reconstructed URL
    return NextResponse.redirect(`${baseUrl}/order-success?orderId=${txnid}`, 303);

  } catch (error: any) {
    console.error("PayU Success Callback Error:", error.message);
    
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
    return NextResponse.redirect(`${protocol}://${host}/`, 303);
  }
}