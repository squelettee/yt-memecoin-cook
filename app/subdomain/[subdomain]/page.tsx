import { redirect } from 'next/navigation';
import { TemplateFormData } from "@/schemas/templateSchema";
import { TemplateViews } from "@/components/template-views";
import { getTemplate } from "@/lib/queries/get-template";
import { TemplateType } from '@/config/templates';

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
    <TemplateViews
      type={template.type as TemplateType}
      templateData={template as TemplateFormData}
    />
  );
}