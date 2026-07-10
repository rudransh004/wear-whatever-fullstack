import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const { code, cartTotal } = await req.json();

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!coupon) {
      return NextResponse.json({ success: false, error: "Invalid promo code." });
    }

    if (!coupon.isActive) {
      return NextResponse.json({ success: false, error: "This promo code has expired." });
    }

    if (cartTotal < coupon.minCartValue) {
      return NextResponse.json({ success: false, error: `Minimum order value for this code is ₹${coupon.minCartValue}.` });
    }

    return NextResponse.json({
      success: true,
      coupon: {
        code: coupon.code,
        type: coupon.discountType,
        value: coupon.discountValue,
      }
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error validating coupon." }, { status: 500 });
  }
}