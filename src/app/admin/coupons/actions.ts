"use server";

import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCoupon(formData: FormData): Promise<void> {
  const code = formData.get("code") as string;
  const discountType = formData.get("discountType") as string;
  const discountValue = parseFloat(formData.get("discountValue") as string);
  const minCartValue = parseFloat(formData.get("minCartValue") as string);

  if (!code || !discountType || isNaN(discountValue)) {
    console.error("Promo Engine: Invalid data provided.");
    return;
  }

  try {
    await prisma.coupon.create({
      data: {
        code: code.toUpperCase().trim(),
        discountType,
        discountValue,
        minCartValue: isNaN(minCartValue) ? 0 : minCartValue,
      }
    });
    
    // Seamlessly refreshes the page to show the new coupon
    revalidatePath("/admin/coupons");
  } catch (error: any) {
    console.error("Promo Engine: Failed to create coupon. Code may already exist.");
  }
}

export async function deleteCoupon(id: string): Promise<void> {
  try {
    await prisma.coupon.delete({ where: { id } });
    revalidatePath("/admin/coupons");
  } catch (error) {
    console.error("Promo Engine: Failed to delete coupon.");
  }
}

export async function toggleCouponStatus(id: string, currentStatus: boolean): Promise<void> {
  try {
    await prisma.coupon.update({
      where: { id },
      data: { isActive: !currentStatus }
    });
    revalidatePath("/admin/coupons");
  } catch (error) {
    console.error("Promo Engine: Failed to toggle coupon status.");
  }
}