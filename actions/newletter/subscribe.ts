"use server";

import { prisma } from "@/lib/prisma";

export async function subscribeToNewsletter(email: string) {
  try {
    await prisma.newsletter.create({
      data: {
        email,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to subscribe to newsletter:", error);
    return { success: false, error: "Failed to subscribe. Please try again." };
  }
}
