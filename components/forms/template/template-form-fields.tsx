"use client";

import { Form } from "@/components/ui/form";
import { templates } from "@/config/templates";
import { UseFormReturn } from "react-hook-form";
import { TemplateFormData } from "@/schemas/templateSchema";
import { ProjectInfoFields } from "./fields/project-info-fields";
import { DocumentFields } from "./fields/document-fields";
import { SocialLinksFields } from "./fields/social-links-fields";
import { TradingFields } from "./fields/trading-fields";
import { MediaFields } from "./fields/media-fields";
import { AppearanceFields } from "./fields/appearance-fields";

interface TemplateFormFieldsProps {
  form: UseFormReturn<TemplateFormData>;
  selectedTemplate: string;
}

export function TemplateFormFields({ form, selectedTemplate }: TemplateFormFieldsProps) {
  const handleFormKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const shouldShowField = (fieldName: string) => {
    const template = templates.find((t) => t.id === selectedTemplate);
    return template?.fields.includes(fieldName) ?? false;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => e.preventDefault()}
        onKeyDown={handleFormKeyPress}
        className="space-y-4 pb-6 px-4"
      >
        <ProjectInfoFields form={form} shouldShowField={shouldShowField} />
        <DocumentFields form={form} shouldShowField={shouldShowField} />
        <SocialLinksFields form={form} shouldShowField={shouldShowField} />
        <TradingFields form={form} shouldShowField={shouldShowField} />
        <MediaFields form={form} shouldShowField={shouldShowField} />
        <AppearanceFields form={form} shouldShowField={shouldShowField} />
      </form>
    </Form>
  );
} 