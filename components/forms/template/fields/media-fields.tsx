"use client";

import { UseFormReturn } from "react-hook-form";
import { TemplateFormData } from "@/schemas/templateSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ImageIcon } from "lucide-react";

interface MediaFieldsProps {
  form: UseFormReturn<TemplateFormData>;
  shouldShowField: (fieldName: string) => boolean;
}

export function MediaFields({ form, shouldShowField }: MediaFieldsProps) {
  const hasFields = ["imagePreviewFile", "logoFile", "backgroundFile"].some(shouldShowField);

  if (!hasFields) return null;

  return (
    <AccordionItem value="media">
      <AccordionTrigger>
        <div className="flex items-center gap-2">
          <ImageIcon size={20} />
          Media
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-4">
        {shouldShowField("imagePreviewFile") && (
          <FormField
            control={form.control}
            name="imagePreviewFile"
            render={({ field: { onChange, ...field } }) => (
              <FormItem className="px-1">
                <FormLabel>Preview Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      onChange(file);
                    }}
                    {...field}
                    value={undefined}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {shouldShowField("logoFile") && (
          <FormField
            control={form.control}
            name="logoFile"
            render={({ field: { onChange, ...field } }) => (
              <FormItem className="px-1">
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      onChange(file);
                    }}
                    {...field}
                    value={undefined}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {shouldShowField("backgroundFile") && (
          <FormField
            control={form.control}
            name="backgroundFile"
            render={({ field: { onChange, ...field } }) => (
              <FormItem className="px-1">
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      onChange(file);
                    }}
                    {...field}
                    value={undefined}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </AccordionContent>
    </AccordionItem>
  );
} 