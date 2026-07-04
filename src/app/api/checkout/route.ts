import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { createClient } from "../../../utils/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const body = await req.json();
    const { customer, items, total } = body;

    // 1. Determine Environment and Select Correct Endpoint
    // If you are local, use sandbox. If on Vercel production, use live api.
    const isProduction = process.env.NODE_ENV === "production";
    const cashfreeEndpoint = isProduction 
      ? "https://api.cashfree.com/pg/orders" 
      : "https://sandbox.cashfree.com/pg/orders";

    // 2. Enforce HTTPS production domain for Cashfree Live, allow fallback for local Sandbox testing
    const baseUrl = isProduction 
      ? "https://www.wearwhatever.in" 
      : (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000");

    // 3. Create Order in Database (Defaults to "Processing")
    const newOrder = await prisma.order.create({
      data: {
        customerName: customer.name,
        customerEmail: customer.email,
        address: customer.address,
        totalAmount: total,
        userId: user?.id || null,
        items: { 
          create: items.map((item: any) => ({
            productId: item.id, 
            name: item.name, 
            price: item.price, 
            quantity: item.quantity,
          }))
        },
      },
    });

    // 4. Call Cashfree API
    const response = await fetch(cashfreeEndpoint, {
      method: "POST",
      headers: {
        "x-client-id": process.env.CASHFREE_APP_ID!,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
        "x-api-version": "2023-08-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_amount: total,
        order_currency: "INR",
        order_id: newOrder.id.toString(),
        customer_details: {
          customer_id: customer.email.replace(/[^a-zA-Z0-9]/g, ''),
          customer_name: customer.name,
          customer_email: customer.email,
          customer_phone: customer.phone || "9999999999",
        },
        order_meta: {
          return_url: `${baseUrl}/order-success?order_id=${newOrder.id}`,
          notify_url: `${baseUrl}/api/webhook/cashfree`
        }
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Cashfree API Error:", data);
      throw new Error(data.message || "Failed to create order");
    }

    return NextResponse.json({
      success: true,
      payment_session_id: data.payment_session_id,
      orderId: newOrder.id
    });

  } catch (error: any) {
    console.error("Checkout Final Fix Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}