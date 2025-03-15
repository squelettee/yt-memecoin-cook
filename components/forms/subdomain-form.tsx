"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubdomainFormData, subdomainSchema } from "@/schemas/subdomainSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { LineShadowText } from "@/components/magicui/line-shadow-text";

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
        message:
          error instanceof Error ? error.message : "Une erreur est survenue",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-2 w-64"
      >
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
                    className="text-base font-medium h-12 pr-24"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-base font-semibold">
                    .memecook.fun
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full h-12 bg-violet-800 hover:bg-black text-primary-foreground font-bold text-lg"
        >
          <LineShadowText className="italic" shadowColor={"#ffff"}>
            I Deploy
          </LineShadowText>{" "}
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </Button>
      </form>
    </Form>
  );
}
