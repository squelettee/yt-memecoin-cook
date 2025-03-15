"use client";

import { templates } from "@/config/templates";
import { Button } from "@/components/ui/button";
import { TemplateFormFields } from "./template-form-fields";

export function TemplateFormContent({
  selectedTemplate,
  onTemplateChange,
}: {
  selectedTemplate: string;
  onTemplateChange: (id: string) => void;
}) {
  return (
    <div className="pt-4">
      <div className="grid gap-4">
        {templates
          .filter((template) => template.enabled)
          .map((template) => (
            <Button
              key={template.id}
              onClick={() => onTemplateChange(template.id)}
              variant={selectedTemplate === template.id ? "default" : "outline"}
              className="w-full"
            >
              {template.name}
            </Button>
          ))}
      </div>
    </div>
  );
}

TemplateFormContent.Fields = TemplateFormFields;
