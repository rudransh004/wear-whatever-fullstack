import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, items, total } = body;

    const newOrder = await prisma.order.create({
      data: {
        customerName: customer.name,
        customerEmail: customer.email,
        address: customer.address,
        totalAmount: total,
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

    // ALWAYS return .json()
    return NextResponse.json({ orderId: newOrder.id }); // Returns an object
} catch (error) {
  console.error(error);
  return NextResponse.json({ error: "DB_FAIL" }, { status: 500 }); // Returns JSON error
}
}