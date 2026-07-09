"use server";

import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";

export async function subscribeToSyndicate(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return { success: false, error: "Invalid email sequence." };
  }

  try {
    // Upsert means: "If it exists, do nothing. If it doesn't, create it."
    // Use a typed escape to avoid TS error when the generated client type
    // doesn't include the expected model name at compile time.
    await (prisma as any).subscriber.upsert({
      where: { email: email },
      update: {},
      create: { email: email },
    });

    return { success: true };
  } catch (error: unknown) {
    console.error("Syndicate DB Error:", error);

    // Prisma can throw a specific error if a unique constraint is violated,
    // such as two users trying to subscribe with the same email at once.
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        // The email already exists in the database.
        return { success: false, error: "This email is already part of the syndicate." };
      }
    }
    return { success: false, error: "Database rejection." };
  }
}