"use client";

import { UseFormReturn } from "react-hook-form";
import { TemplateFormData } from "@/schemas/templateSchema";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FileTextIcon } from "lucide-react";

interface DocumentFieldsProps {
  form: UseFormReturn<TemplateFormData>;
  shouldShowField: (fieldName: string) => boolean;
}

export function DocumentFields({ form, shouldShowField }: DocumentFieldsProps) {
  const hasFields = ["whitepaper", "coinGecko", "coinMarketCap"].some(
    shouldShowField,
  );

  if (!hasFields) return null;

  return (
    <AccordionItem value="documents">
      <AccordionTrigger>
        <div className="flex items-center gap-2">
          <FileTextIcon size={20} />
          Documents
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-4">
        {shouldShowField("whitepaper") && (
          <FormField
            control={form.control}
            name="whitepaper"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormLabel>Whitepaper</FormLabel>
                <FormControl>
                  <Input placeholder="Enter whitepaper link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {shouldShowField("coinGecko") && (
          <FormField
            control={form.control}
            name="coinGecko"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormLabel>CoinGecko</FormLabel>
                <FormControl>
                  <Input placeholder="Enter CoinGecko link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {shouldShowField("coinMarketCap") && (
          <FormField
            control={form.control}
            name="coinMarketCap"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormLabel>CoinMarketCap</FormLabel>
                <FormControl>
                  <Input placeholder="Enter CoinMarketCap link" {...field} />
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
