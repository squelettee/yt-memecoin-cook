import { redirect } from 'next/navigation';
import { TemplateFormData } from "@/schemas/templateSchema";
import { TemplatePreview } from "@/components/template-preview";
import { prisma } from "@/lib/prisma";


async function getTemplate(subdomain: string) {
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

interface SubdomainPageProps {
  params: Promise<{
    subdomain: string
  }>
}

export default async function SubdomainPage({ params }: SubdomainPageProps) {
  const { subdomain } = await params;

  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const template = await getTemplate(subdomain);

  if (!template) {
    redirect(process.env.NEXT_PUBLIC_API_URL);
  }

  return (
    <TemplatePreview
      type={template.type}
      templateData={template as TemplateFormData}
    />
  );
}