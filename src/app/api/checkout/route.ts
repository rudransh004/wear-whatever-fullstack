import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server"; //

export async function POST(req: Request) {
  try {
    // 1. Identify if a user is logged in
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const body = await req.json();
    const { customer, items, total } = body;

    // 2. Create the order with the optional userId
    const newOrder = await prisma.order.create({
      data: {
        customerName: customer.name,
        customerEmail: customer.email,
        address: customer.address,
        totalAmount: total,
        userId: user?.id || null, // Links to User table if logged in
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    });

    return NextResponse.json({ orderId: newOrder.id });
  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: "DB_FAIL" }, { status: 500 });
  }
}