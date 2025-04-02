"use server";

import { prisma } from "@/lib/prisma";

export async function deleteTemplate(id: string) {
  try {
    const deletedTemplate = await prisma.template.delete({
      where: {
        id: parseInt(id),
      },
    });

    return deletedTemplate;
  } catch (error) {
    throw new Error(`Failed to delete template: ${error}`);
  }
}
