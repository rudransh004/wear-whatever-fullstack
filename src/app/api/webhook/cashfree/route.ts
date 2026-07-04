import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. IMPROVED: Check if this is just a test ping from Cashfree
    if (body.type === "test_notification") {
       console.log("✅ Received test notification from Cashfree");
       return NextResponse.json({ success: true, message: "Test received" });
    }

    // 2. Extract the Order ID (Keep your existing structure)
    const orderId = body?.data?.order?.order_id;
    if (!orderId) { 
      // Log the body so you can see exactly what Cashfree sent in the Vercel logs
      console.error("Webhook payload structure unknown:", JSON.stringify(body));
      return NextResponse.json({ error: "No order ID found" }, { status: 400 });
    }
    
    // ... (rest of your existing code below)

    // 2. SECURITY CHECK: Instead of trusting the webhook payload directly,
    // we make a secure server-to-server call back to Cashfree to verify the TRUE status.
    const verifyResponse = await fetch(`https://sandbox.cashfree.com/pg/orders/${orderId}`, {
      method: "GET",
      headers: {
        "x-client-id": process.env.CASHFREE_APP_ID!,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
        "x-api-version": "2023-08-01",
      },
    });

    const verifyData = await verifyResponse.json();

    // 3. Update your Prisma Database based on the real bank status
    if (verifyData.order_status === "PAID") {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "PAID - Processing for Dispatch" },
      });
      console.log(`✅ Order ${orderId} marked as PAID.`);
    } else if (verifyData.order_status === "ACTIVE") {
      // The user opened the window but hasn't paid yet
      console.log(`⏳ Order ${orderId} is still pending payment.`);
    } else {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "FAILED / CANCELLED" },
      });
      console.log(`❌ Order ${orderId} failed or cancelled.`);
    }

    // Always return a 200 OK so Cashfree knows we received the message
    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Webhook Error:", error.message);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}