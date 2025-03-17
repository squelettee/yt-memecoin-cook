import { TemplateFormData } from "@/schemas/templateSchema";

export function BetaHero({ templateData }: { templateData: TemplateFormData }) {
  return (
    <section className="w-full px-6 pt-32 sm:pt-36 flex flex-col items-center text-center gap-8">
      <div className="max-w-4xl w-full space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground drop-shadow-sm">
          {templateData.projectName || "Your Project Name"}
        </h1>
        <p className="text-lg sm:text-xl text-foreground/90 max-w-2xl mx-auto whitespace-pre-wrap break-words leading-relaxed">
          {templateData.description ||
            "Write a compelling description of your project here. Explain what makes your token unique and why people should be interested."}
        </p>
      </div>
    </section>
  );
}
