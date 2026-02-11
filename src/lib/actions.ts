"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache"; // This refreshes the page data

export async function getOrderById(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
      },
    });
    return order;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
}

// NEW: Action to update order status
export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });
    
    // This refreshes the Admin page data immediately
    revalidatePath("/admin"); 
    return { success: true };
  } catch (error) {
    console.error("Update Error:", error);
    throw new Error("Failed to update order");
  }
}