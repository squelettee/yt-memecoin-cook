"use server";

import { prisma } from "@/lib/prisma";

export async function activateTemplate(id: number) {
  try {
    const deletedTemplate = await prisma.template.update({
      where: {
        id,
      },
      data: {
        status: "active",
      },
    });

    return deletedTemplate;
  } catch (error) {
    throw new Error(`Failed to delete template: ${error}`);
  }
}
