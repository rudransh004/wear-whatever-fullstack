"use server";

import { prisma } from "../lib/prisma";

export async function getOrderById(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true, // Includes the specific T-shirts in the order
      },
    });
    return order;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
}