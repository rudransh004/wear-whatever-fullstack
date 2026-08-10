import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const txnid = formData.get("txnid") as string;
    
    // 💡 THE FIX: Dynamically reconstruct the base URL from proxy headers (just like success route)
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
    const baseUrl = `${protocol}://${host}`;

    // 1. Update order status to FAILED so you have a record of abandoned checkouts
    if (txnid) {
      await prisma.order.update({
        where: { id: txnid },
        data: { status: "FAILED" }
      });
      console.log(`❌ PayU Order ${txnid} marked as FAILED.`);
    }

    // 2. Redirect back to the cart or a failure page dynamically
    return NextResponse.redirect(`${baseUrl}/cart?error=payment_failed`, 303);

  } catch (error: any) {
    console.error("PayU Failure Callback Error:", error.message);
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
    return NextResponse.redirect(`${protocol}://${host}/`, 303);
  }
}