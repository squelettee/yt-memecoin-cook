import { CreateTemplateForm } from "@/components/forms/template-form-create";

interface CreateTemplatePageProps {
  params: Promise<{
    subdomain: string;
  }>;
}

export default async function CreateTemplatePage({
  params,
}: CreateTemplatePageProps) {
  const { subdomain } = await params;

  return (
    <main className="w-full flex flex-col md:flex-row h-full">
      <CreateTemplateForm subdomain={subdomain} />
    </main>
  );
}
