'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubdomainFormData, subdomainSchema } from "@/schemas/subdomainSchema"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface SubdomainFormProps {
  onSubmit: (data: SubdomainFormData) => Promise<void>;
  message?: string;
}

export function SubdomainForm({ onSubmit, message }: SubdomainFormProps) {
  const form = useForm<SubdomainFormData>({
    resolver: zodResolver(subdomainSchema),
    defaultValues: {
      subdomain: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="subdomain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subdomain</FormLabel>
              <FormControl>
                <Input placeholder="your-subdomain" {...field} />
              </FormControl>
              <FormDescription>
                Enter your desired subdomain.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        {message && <p>{message}</p>}
      </form>
    </Form>
  );
}