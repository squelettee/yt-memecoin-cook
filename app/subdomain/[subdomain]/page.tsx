import { redirect } from "next/navigation";
import { TemplateFormData } from "@/schemas/templateSchema";
import { TemplateViews } from "@/components/template-views";
import { getTemplate } from "@/lib/queries/get-template";
import { TemplateType } from "@/config/templates";
import { Metadata } from "next";

interface SubdomainPageProps {
  params: Promise<{
    subdomain: string;
  }>;
}

export default async function SubdomainPage({ params }: SubdomainPageProps) {
  const { subdomain } = await params;

  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const template = await getTemplate(subdomain);

  console.log(template);

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

export async function generateMetadata({
  params,
}: SubdomainPageProps): Promise<Metadata> {
  const { subdomain } = await params;

  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const template = await getTemplate(subdomain);

  if (!template) {
    return {
      title: "Template not found",
      description: "The requested template could not be found",
    };
  }

  return {
    title: subdomain || `${template.ticker} Template`,
    description:
      template.description || `Trading template for ${template.ticker}`,
    openGraph: {
      title: subdomain || `${template.ticker} Template`,
      description:
        template.description || `Trading template for ${template.ticker}`,
      images: template.logo
        ? [
            {
              url: template.logo,
              width: 1200,
              height: 630,
              alt: `${template.ticker} logo`,
            },
          ]
        : [],
    },
    icons: template.logo
      ? {
          icon: template.logo,
          apple: template.logo,
        }
      : undefined,
  };
}
