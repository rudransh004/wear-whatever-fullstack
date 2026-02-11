import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { orderId, status } = await req.json();
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: status },
    });
    return NextResponse.json(updatedOrder);
  } catch (error) {
    return new NextResponse("Error updating status", { status: 500 });
  }
}