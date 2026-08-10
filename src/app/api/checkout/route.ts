import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { createClient } from "../../../utils/supabase/server";
import crypto from "crypto"; // Required for PayU Hashing

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const body = await req.json();
    const { customer, items, couponCode } = body;

    // 1. SECURE PRICING CALCULATION
    let secureSubtotal = 0;
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
    secureTotal = Math.max(0, secureTotal); 

    // 5. Create Order in Database
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
            name: `${item.name} (Size: ${item.size || 'M'})`, 
            price: item.price, 
            quantity: item.quantity,
          }))
        },
      },
    });

    // 6. PAYU CRYPTOGRAPHIC INTEGRATION
    const payuEnv = process.env.PAYU_ENVIRONMENT || "TEST";
    const payuUrl = payuEnv === "PROD" ? "https://secure.payu.in/_payment" : "https://test.payu.in/_payment";
    const payuKey = process.env.PAYU_MERCHANT_KEY!;
    const payuSalt = process.env.PAYU_MERCHANT_SALT!;
    
    // 💡 THE FIX: Dynamically reconstruct the URL from the browser's request headers
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
    const baseUrl = `${protocol}://${host}`;

    // Format Data for PayU
    const txnid = newOrder.id.toString();
    const amount = secureTotal.toString(); // PayU expects a string
    const productinfo = "WearWhatever_Order";
    const firstname = customer.name.split(" ")[0]; // PayU prefers first name
    const email = customer.email;
    const phone = customer.phone || "9999999999";

    // PAYU HASHING FORMULA: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt
    // We leave udf1 to udf5 blank (hence the consecutive pipes ||||||)
    const hashString = `${payuKey}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${payuSalt}`;
    
    // Generate SHA-512 Hash
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    // Return the parameters to the frontend so it can construct the form
    return NextResponse.json({
      success: true,
      payuUrl: payuUrl,
      paymentData: {
        key: payuKey,
        txnid: txnid,
        amount: amount,
        productinfo: productinfo,
        firstname: firstname,
        email: email,
        phone: phone,
        // 🚀 DYNAMIC URLS IN ACTION!
        surl: `${baseUrl}/api/payu/success`,
        furl: `${baseUrl}/api/payu/failure`,
        hash: hash,
      }
    });

  } catch (error: any) {
    console.error("Checkout Security Check Failed:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}