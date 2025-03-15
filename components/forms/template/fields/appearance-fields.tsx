"use client";

import { UseFormReturn } from "react-hook-form";
import { TemplateFormData } from "@/schemas/templateSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { PaintRollerIcon } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AppearanceFieldsProps {
  form: UseFormReturn<TemplateFormData>;
  shouldShowField: (fieldName: string) => boolean;
}

export function AppearanceFields({ form, shouldShowField }: AppearanceFieldsProps) {
  const hasFields = ["headingFont", "bodyFont", "headingColor"].some(shouldShowField);

  if (!hasFields) return null;

  return (
    <AccordionItem value="appearance">
      <AccordionTrigger>
        <div className="flex items-center gap-2">
          <PaintRollerIcon size={20} />
          Appearance
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-4">
        {shouldShowField("headingFont") && (
          <FormField
            control={form.control}
            name="headingFont"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormLabel>Heading Font</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="geist">Geist</SelectItem>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="montserrat">Montserrat</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {shouldShowField("bodyFont") && (
          <FormField
            control={form.control}
            name="bodyFont"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormLabel>Body Font</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="geist">Geist</SelectItem>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="montserrat">Montserrat</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {shouldShowField("headingColor") && (
          <FormField
            control={form.control}
            name="headingColor"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormLabel>Heading Color</FormLabel>
                <FormControl>
                  <Input
                    type="color"
                    className="h-10 px-2 py-1"
                    {...field}
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