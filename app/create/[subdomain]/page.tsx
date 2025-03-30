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
      <div className="md:hidden w-full h-screen flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-2xl">🖥️</span>
          <h2 className="text-xl font-semibold">Desktop Required</h2>
          <p className="text-muted-foreground max-w-sm">
            For the best meme-cooking experience, please switch to a desktop
            computer. Our powerful editor needs more screen real estate to help
            you create something amazing!
          </p>
        </div>
      </div>
      <div className="hidden md:block w-full">
        <CreateTemplateForm subdomain={subdomain} />
      </div>
    </main>
  );
}
