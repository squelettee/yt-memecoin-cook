"use server";

import { prisma } from "@/lib/prisma";

export const getTemplatesByAddress = async (address: string) => {
  try {
    const templates = await prisma.template.findMany({
      where: {
        user: {
          address: address,
        },
      },
      include: {
        domain: true,
      },
    });
    return templates;
  } catch (error) {
    console.error("Error fetching templates:", error);
    return [];
  }
};
