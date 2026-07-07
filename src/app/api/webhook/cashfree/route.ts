import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. HANDLER: Handle Cashfree's "Test" Pings
    // Cashfree sends this specific structure when you hit the "Test" button
    if (body?.data?.test_object || body?.type === "WEBHOOK") {
      console.log("✅ Received test ping from Cashfree successfully.");
      return NextResponse.json({ success: true, message: "Test Ping Received" }, { status: 200 });
    }

    // 2. HANDLER: Handle Real Payment Events
    // Check if it's a real payment success event
    const orderId = body?.data?.order?.order_id;
    
    if (!orderId) {
      console.error("Payload missing order_id:", JSON.stringify(body));
      return NextResponse.json({ error: "No order ID found" }, { status: 400 });
    }

    // 3. SECURE VERIFICATION: Fetch real status from Cashfree
    const verifyResponse = await fetch(`https://sandbox.cashfree.com/pg/orders/${orderId}`, {
      method: "GET",
      headers: {
        "x-client-id": process.env.CASHFREE_APP_ID!,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
        "x-api-version": "2023-08-01",
      },
    });

    const verifyData = await verifyResponse.json();

    // 4. Update Database
    if (verifyData.order_status === "PAID") {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "PAID" },
      });
      console.log(`✅ Order ${orderId} updated to PAID.`);
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Webhook Error:", error.message);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}