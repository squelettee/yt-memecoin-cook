"use client";

import { UseFormReturn } from "react-hook-form";
import { TemplateFormData } from "@/schemas/templateSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ChartNoAxesCombinedIcon } from "lucide-react";

interface TradingFieldsProps {
  form: UseFormReturn<TemplateFormData>;
  shouldShowField: (fieldName: string) => boolean;
}

export function TradingFields({ form, shouldShowField }: TradingFieldsProps) {
  const hasFields = ["dextools", "dexscreener", "birdeye", "jupiter"].some(shouldShowField);

  if (!hasFields) return null;

  return (
    <AccordionItem value="trading">
      <AccordionTrigger>
        <div className="flex items-center gap-2">
          <ChartNoAxesCombinedIcon size={20} />
          Trading
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-4">
        {shouldShowField("dextools") && (
          <FormField
            control={form.control}
            name="dextools"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormLabel>DEXTools</FormLabel>
                <FormControl>
                  <Input placeholder="Enter DEXTools link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {shouldShowField("dexscreener") && (
          <FormField
            control={form.control}
            name="dexscreener"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormLabel>DEXScreener</FormLabel>
                <FormControl>
                  <Input placeholder="Enter DEXScreener link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {shouldShowField("birdeye") && (
          <FormField
            control={form.control}
            name="birdeye"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormLabel>Birdeye</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Birdeye link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {shouldShowField("jupiter") && (
          <FormField
            control={form.control}
            name="jupiter"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start px-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none ml-2">
                  <FormLabel>Jupiter</FormLabel>
                </div>
              </FormItem>
            )}
          />
        )}
      </AccordionContent>
    </AccordionItem>
  );
} 