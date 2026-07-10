"use server";

import { prisma } from "../../../lib/prisma";
import { createClient } from "../../../utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitReview(productId: string, rating: number, comment: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Authentication required." };
  if (rating < 1 || rating > 5) return { success: false, error: "Invalid rating." };

  try {
    // SECURITY CHECK 1: Did this user actually buy this exact product?
    const hasPurchased = await prisma.orderItem.findFirst({
      where: {
        productId: productId,
        order: { 
          userId: user.id 
          // Optional: You can add `status: "Delivered"` here later so they only review after receiving it!
        }
      }
    });

    if (!hasPurchased) {
      return { success: false, error: "Access Denied: You can only review products you have purchased." };
    }

    // SECURITY CHECK 2 & INSERT: Prisma will block duplicates because of the @@unique constraint we added
    await prisma.review.create({
      data: {
        rating,
        comment: comment.trim(),
        productId,
        userId: user.id
      }
    });

    // Instantly refresh the product page to show the new review
    revalidatePath(`/product/${productId}`);
    return { success: true };

  } catch (error: any) {
    if (error.code === 'P2002') {
      return { success: false, error: "You have already submitted a review for this asset." };
    }
    return { success: false, error: "System failure. Could not process review." };
  }
}