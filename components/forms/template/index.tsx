"use client";

import { TemplateFormData } from "@/schemas/templateSchema";
import { TemplateFormHeader } from "./template-form-header";
import { TemplateFormContent } from "./template-form-content";
import { TemplateFormFooter } from "./template-form-footer";
import { useTemplateForm } from "./use-template-form";
import { Tabs, TabsContent } from "@/components/ui/tabs";

interface TemplateFormProps {
  subdomain: string;
  onUpdate: (data: TemplateFormData) => void;
}

export function TemplateForm({ subdomain, onUpdate }: TemplateFormProps) {
  const {
    form,
    isSubmitting,
    isWalletConnected,
    selectedTemplate,
    handleTemplateChange,
    handleSubmit,
  } = useTemplateForm({ subdomain, onUpdate });

  return (
    <div className="flex flex-col h-full min-w-[400px]">
      <Tabs
        defaultValue="template"
        className="w-full md:w-[400px] border-r flex flex-col h-full"
      >
        <TemplateFormHeader />

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="template" className="mt-4 px-4">
            <TemplateFormContent
              selectedTemplate={selectedTemplate}
              onTemplateChange={handleTemplateChange}
            />
          </TabsContent>

          <TabsContent value="edits" className="mt-4">
            <TemplateFormContent.Fields form={form} selectedTemplate={selectedTemplate} />
          </TabsContent>
        </div>
      </Tabs>

      <TemplateFormFooter
        isWalletConnected={isWalletConnected}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </div>
  );
} 