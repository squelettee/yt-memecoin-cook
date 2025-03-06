"use client";

import { useState } from "react";
import { TemplateForm } from "@/components/forms/template-form";
import { TemplateViews } from "@/components/template-views";
import { TemplateFormData } from "@/schemas/templateSchema";

export function CreateTemplateForm({ subdomain }: { subdomain: string }) {
  const [templateData, setTemplateData] = useState<TemplateFormData>({
    type: "basic",
  });

  return (
    <>
      <TemplateForm
        subdomain={subdomain}
        onUpdate={(data: TemplateFormData) => setTemplateData(data)}
      />
      <TemplateViews type={templateData.type} templateData={templateData} />
    </>
  );
}
