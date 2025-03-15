"use client";

import { UseFormReturn } from "react-hook-form";
import { TemplateFormData } from "@/schemas/templateSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProjectInfoFieldsProps {
  form: UseFormReturn<TemplateFormData>;
  shouldShowField: (fieldName: string) => boolean;
}

export function ProjectInfoFields({ form, shouldShowField }: ProjectInfoFieldsProps) {
  const hasFields = ["projectName", "ticker", "description", "contractAddress"].some(shouldShowField);

  if (!hasFields) return null;

  return (
    <AccordionItem value="project-info">
      <AccordionTrigger>
        <div className="flex items-center gap-2">
          <InfoIcon size={20} />
          Project Information
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-4">
        {shouldShowField("projectName") && (
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {shouldShowField("ticker") && (
          <FormField
            control={form.control}
            name="ticker"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormLabel>Ticker</FormLabel>
                <FormControl>
                  <Input placeholder="Enter ticker symbol" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {shouldShowField("description") && (
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {shouldShowField("contractAddress") && (
          <FormField
            control={form.control}
            name="contractAddress"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>Contract Address</TooltipTrigger>
                      <TooltipContent>
                        <p>The address of your token&apos;s smart contract on the blockchain</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter contract address" {...field} />
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