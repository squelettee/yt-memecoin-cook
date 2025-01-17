'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubdomainFormData, subdomainSchema } from "@/schemas/subdomainSchema"
import { RainbowButton } from "@/components/ui/rainbow-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface SubdomainFormProps {
  onSubmit: (data: SubdomainFormData) => Promise<void>;
}

export function SubdomainForm({ onSubmit }: SubdomainFormProps) {
  const form = useForm<SubdomainFormData>({
    resolver: zodResolver(subdomainSchema),
    defaultValues: {
      subdomain: "",
    },
  });

  const handleSubmit = async (data: SubdomainFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      form.setError("subdomain", {
        type: "server",
        message: error instanceof Error ? error.message : "Une erreur est survenue"
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-1/4">
        <FormField
          control={form.control}
          name="subdomain"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="your site"
                    {...field}
                    className="text-base h-12 pr-24"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-base">
                    .memecook.fun
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <RainbowButton type="submit" className="text-base w-full h-12">I Deploy</RainbowButton>
      </form>
    </Form>
  );
}