import { prisma } from "@/lib/prisma";

export const getTemplate = async (subdomain: string) => {
  if (!subdomain) throw new Error("Subdomain is required");

  const domainRecord = await prisma.domain.findFirst({
    where: {
      name: subdomain.toLowerCase()
    },
    include: { template: true }
  });

  if (!domainRecord?.template) return null;
  return domainRecord.template;
}
