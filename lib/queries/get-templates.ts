import { prisma } from "@/lib/prisma";

export const getTemplates = async (limit: number = 9) => {
  try {
    const templates = await prisma.template.findMany({
      take: limit,
      orderBy: {
        createdAt: "desc",
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
