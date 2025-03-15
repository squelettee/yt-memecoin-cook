"use client";

import { UseFormReturn } from "react-hook-form";
import { TemplateFormData } from "@/schemas/templateSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { LinkIcon } from "lucide-react";

interface SocialLinksFieldsProps {
  form: UseFormReturn<TemplateFormData>;
  shouldShowField: (fieldName: string) => boolean;
}

export function SocialLinksFields({ form, shouldShowField }: SocialLinksFieldsProps) {
  const hasFields = ["telegram", "twitter", "instagram", "tiktok"].some(shouldShowField);

  if (!hasFields) return null;

  return (
    <AccordionItem value="social-links">
      <AccordionTrigger>
        <div className="flex items-center gap-2">
          <LinkIcon size={20} />
          Social Links
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-4">
        {shouldShowField("telegram") && (
          <FormField
            control={form.control}
            name="telegram"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormLabel>Telegram</FormLabel>
                <FormControl>
                  <Input placeholder="https://t.me/your-group" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {shouldShowField("twitter") && (
          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormLabel>Twitter</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Twitter link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {shouldShowField("instagram") && (
          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Instagram link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {shouldShowField("tiktok") && (
          <FormField
            control={form.control}
            name="tiktok"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormLabel>TikTok</FormLabel>
                <FormControl>
                  <Input placeholder="Enter TikTok link" {...field} />
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