"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "../utils/supabase/server";

/**
 * Fetches a single order by its ID for the tracking page.
 */
export async function getOrderById(orderId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId: user.id },
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

/**
 * Updates the status of an order (e.g., Processing -> Shipped).
 * Triggers a revalidation of the admin dashboard.
 */
export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });
    
    // Refresh the admin page data immediately
    revalidatePath("/admin"); 
    return { success: true };
  } catch (error) {
    console.error("Update Error:", error);
    throw new Error("Failed to update order");
  }
}

/**
 * NEW: Deletes an order and all its associated items.
 * Uses a manual sequence to handle foreign key constraints.
 */
export async function deleteOrder(orderId: string) {
  try {
    // 1. Delete associated OrderItems first to avoid foreign key errors
    await prisma.orderItem.deleteMany({
      where: { orderId: orderId },
    });
    
    // 2. Delete the main Order record
    await prisma.order.delete({
      where: { id: orderId },
    });

    // 3. Refresh the admin dashboard
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false };
  }
}

export async function toggleWishlist(userId: string, productId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.id !== userId) return { error: "UNAUTHORIZED" };
    // Check if it already exists
    const existing = await prisma.wishlist.findUnique({
      where: {
        userId_productId: { userId, productId }
      }
    });

    if (existing) {
      // Remove it
      await prisma.wishlist.delete({
        where: {
          userId_productId: { userId, productId }
        }
      });
      return { status: "REMOVED" };
    } else {
      // Add it
      await prisma.wishlist.create({
        data: { userId, productId }
      });
      return { status: "ADDED" };
    }
  } catch (error) {
    console.error("Wishlist toggle error:", error);
    return { error: "FAIL" };
  }
}

// Fetch all wishlist product IDs for a user
export async function getUserWishlist(userId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.id !== userId) return [];
    const list = await prisma.wishlist.findMany({
      where: { userId },
      select: { productId: true }
    });
    return list.map((item : any) => item.productId);
  } catch (error) {
    return [];
  }
}
