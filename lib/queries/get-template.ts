import { prisma } from "@/lib/prisma";

export const getTemplate = async (subdomain: string) => {
  if (!subdomain) throw new Error("Subdomain is required");

  try {
    const domainRecord = await prisma.domain.findFirst({
      where: {
        name: subdomain.toLowerCase(),
      },
      include: { template: true },
    });

    if (!domainRecord?.template) return null;
    return domainRecord.template;
  } catch (error) {
    console.error("Error fetching template:", error);
    return null;
  }
};
