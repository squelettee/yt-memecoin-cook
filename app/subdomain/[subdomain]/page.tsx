import { getTemplateByDomain } from "@/actions/templates-actions";
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { TemplateFormData } from "@/schemas/templateSchema";

const Minimal = dynamic(() => import('@/components/templats/minimal'), {
  loading: () => <p>Chargement...</p>,
});
const Pro = dynamic(() => import('@/components/templats/pro'), {
  loading: () => <p>Chargement...</p>,
});
const Basic = dynamic(() => import('@/components/templats/basic'), {
  loading: () => <p>Chargement...</p>
});
const Standard = dynamic(() => import('@/components/templats/standard'), {
  loading: () => <p>Chargement...</p>,
});

interface SubdomainPageProps {
  params: Promise<{
    subdomain: string
  }>
}

export default async function SubdomainPage({ params }: SubdomainPageProps) {
  const { subdomain } = await params;
  const { template, error } = await getTemplateByDomain(subdomain);

  if (error || !template) {
    redirect(process.env.NEXT_PUBLIC_API_URL!);
    return null;
  }

  return (
    <>
      {template.type === 'minimal' && <Minimal templateData={template as TemplateFormData} />}
      {template.type === 'pro' && <Pro templateData={template as TemplateFormData} />}
      {template.type === 'basic' && <Basic templateData={template as TemplateFormData} />}
      {template.type === 'standard' && <Standard templateData={template as TemplateFormData} />}
    </>
  );
}