import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { createClient } from "../../../utils/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const body = await req.json();
    const { customer, items, couponCode } = body;

    // 1. SECURE PRICING CALCULATION (Ignore frontend totals)
    let secureSubtotal = 0;

    // Fetch actual prices from Database to prevent frontend hacking
    for (const item of items) {
      const dbProduct = await prisma.product.findUnique({ where: { id: item.id } });
      if (!dbProduct) throw new Error(`Product ${item.id} not found.`);
      secureSubtotal += dbProduct.price * item.quantity;
    }

    // 2. DELIVERY LOGIC
    let secureDeliveryFee = secureSubtotal < 1499 ? 50 : 0;

    // 3. SECURE COUPON VALIDATION
    let secureDiscount = 0;
    if (couponCode) {
      const dbCoupon = await prisma.coupon.findUnique({ where: { code: couponCode.toUpperCase() } });
      if (dbCoupon && dbCoupon.isActive && secureSubtotal >= dbCoupon.minCartValue) {
        if (dbCoupon.discountType === "PERCENTAGE") {
          secureDiscount = (secureSubtotal * dbCoupon.discountValue) / 100;
        } else if (dbCoupon.discountType === "FLAT") {
          secureDiscount = dbCoupon.discountValue;
        }
      }
    }

    // 4. FINAL MATH
    let secureTotal = secureSubtotal + secureDeliveryFee - secureDiscount;
    secureTotal = Math.max(0, secureTotal); // Prevents negative totals

    // 5. Create Order in Database WITH Pricing Breakdown
    const newOrder = await prisma.order.create({
      data: {
        customerName: customer.name,
        customerEmail: customer.email,
        address: customer.address,
        subtotal: secureSubtotal,
        deliveryFee: secureDeliveryFee,
        discount: secureDiscount,
        totalAmount: secureTotal,
        couponCode: couponCode || null,
        userId: user?.id || null,
        items: { 
          create: items.map((item: any) => ({
            productId: item.id, 
            name: `${item.name} (Size: ${item.size})`, // Ensure size is saved in order history!
            price: item.price, 
            quantity: item.quantity,
          }))
        },
      },
    });

    // 6. Cashfree Integration
    const cashfreeEnv = process.env.CASHFREE_ENVIRONMENT === "PRODUCTION" ? "PRODUCTION" : "SANDBOX";
    const cashfreeEndpoint = cashfreeEnv === "PRODUCTION" ? "https://api.cashfree.com/pg/orders" : "https://sandbox.cashfree.com/pg/orders";
    const baseUrl = cashfreeEnv === "PRODUCTION" ? "https://www.wearwhatever.in" : "http://localhost:3000";

    const response = await fetch(cashfreeEndpoint, {
      method: "POST",
      headers: {
        "x-client-id": process.env.CASHFREE_APP_ID!.trim(),
        "x-client-secret": process.env.CASHFREE_SECRET_KEY!.trim(),
        "x-api-version": "2023-08-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_amount: secureTotal,
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
      throw new Error(data.message || "Failed to create order");
    }

    return NextResponse.json({
      success: true,
      payment_session_id: data.payment_session_id,
      orderId: newOrder.id
    });

  } catch (error: any) {
    console.error("Checkout Security Check Failed:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}