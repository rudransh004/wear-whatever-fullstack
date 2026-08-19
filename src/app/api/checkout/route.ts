import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { createClient } from "../../../utils/supabase/server";
import crypto from "crypto";
import { applicationUrl, jsonError } from "../../../lib/security";

const MAX_ITEM_QUANTITY = 10;
const money = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return jsonError("Authentication is required to checkout.", 401);
    const { customer, items, couponCode } = await req.json();
    if (!customer || !Array.isArray(items) || items.length === 0 || items.length > 50 || typeof customer.name !== "string" || typeof customer.address !== "string" || customer.name.trim().length < 2 || customer.name.length > 100 || customer.address.trim().length < 10 || customer.address.length > 1000) return jsonError("Invalid checkout request.", 400);

    // The browser supplies IDs and integer quantities only; DB product data is the price authority.
    const quantities = new Map<string, number>();
    for (const item of items) {
      if (typeof item?.id !== "string" || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > MAX_ITEM_QUANTITY) return jsonError("Invalid cart item.", 400);
      quantities.set(item.id, (quantities.get(item.id) ?? 0) + item.quantity);
    }
    if ([...quantities.values()].some(q => q > MAX_ITEM_QUANTITY)) return jsonError("Item quantity exceeds the limit.", 400);
    const products = await prisma.product.findMany({ where: { id: { in: [...quantities.keys()] } } });
    if (products.length !== quantities.size) return jsonError("One or more products no longer exist.", 400);
    const productById = new Map(products.map(product => [product.id, product]));
    const subtotal = money(products.reduce((sum, product) => sum + product.price * (quantities.get(product.id) ?? 0), 0));
    const deliveryFee = subtotal < 1499 ? 50 : 0;

    let discount = 0;
    let normalizedCoupon: string | null = null;
    if (typeof couponCode === "string" && couponCode.length <= 64) {
      const coupon = await prisma.coupon.findUnique({ where: { code: couponCode.trim().toUpperCase() } });
      if (coupon?.isActive && subtotal >= coupon.minCartValue) {
        discount = coupon.discountType === "PERCENTAGE" ? subtotal * coupon.discountValue / 100 : coupon.discountType === "FLAT" ? coupon.discountValue : 0;
        discount = money(Math.min(subtotal, Math.max(0, discount)));
        normalizedCoupon = coupon.code;
      }
    }
    const total = money(Math.max(0, subtotal + deliveryFee - discount));
    if (total <= 0) return jsonError("This order requires manual review.", 400);

    const order = await prisma.order.create({ data: {
      customerName: customer.name.trim(), customerEmail: user.email ?? "", address: customer.address.trim(), userId: user.id,
      subtotal, deliveryFee, discount, totalAmount: total, couponCode: normalizedCoupon,
      items: { create: [...quantities.entries()].map(([productId, quantity]) => { const product = productById.get(productId)!; return { productId, name: product.name, price: product.price, quantity }; }) },
    } });
    const key = process.env.PAYU_MERCHANT_KEY;
    const salt = process.env.PAYU_MERCHANT_SALT;
    if (!key || !salt) throw new Error("PayU is not configured");
    const amount = total.toFixed(2), productinfo = "WearWhatever_Order", firstname = customer.name.trim().split(/\s+/)[0], email = user.email ?? "";
    const phone = typeof customer.phone === "string" && /^\d{10}$/.test(customer.phone) ? customer.phone : "9999999999";
    const hash = crypto.createHash("sha512").update(`${key}|${order.id}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`).digest("hex");
    const baseUrl = applicationUrl();
    const payuUrl = process.env.PAYU_ENVIRONMENT === "PROD" ? "https://secure.payu.in/_payment" : "https://test.payu.in/_payment";
    return NextResponse.json({ success: true, payuUrl, paymentData: { key, txnid: order.id, amount, productinfo, firstname, email, phone, surl: `${baseUrl}/api/payu/success`, furl: `${baseUrl}/api/payu/failure`, hash } });
  } catch (error) {
    console.error("Checkout failed", error);
    return jsonError("Unable to initialize payment.", 500);
  }
}
