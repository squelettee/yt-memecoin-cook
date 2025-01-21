"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { templateSchema, TemplateFormData } from "@/schemas/templateSchema"
import { createTemplate } from "@/actions/templates-actions"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface TemplateFormProps {
  subdomain: string;
}

export function TemplateForm({ subdomain }: TemplateFormProps) {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      projectName: "",
      background: "",
      birdeye: "",
      coinGecko: "",
      coinMarketCap: "",
      contractAddress: "",
      description: "",
      dexscreener: "",
      dextools: "",
      imagePreview: "",
      instagram: "",
      jupiter: false,
      logo: "",
      pumpFun: "",
      telegram: "",
      ticker: "",
      tiktok: "",
      twitter: "",
      whitepaper: "",
      domain: {
        name: subdomain.toLowerCase(),
      }
    },
  })

  async function onSubmit(values: TemplateFormData) {
    try {
      if (!values) {
        throw new Error("Form values are required");
      }

      const { template } = await createTemplate(values);

      await new Promise(resolve => setTimeout(resolve, 1500));

      const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN;
      if (baseDomain && template?.domain?.name) {
        router.push(`http://${template.domain.name}.${baseDomain}`);
      }
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter project name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ticker"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticker</FormLabel>
              <FormControl>
                <Input placeholder="Enter ticker symbol" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter project description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contractAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contract Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter contract address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="telegram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telegram</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Telegram link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Twitter link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Instagram link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tiktok"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TikTok</FormLabel>
                <FormControl>
                  <Input placeholder="Enter TikTok link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="dextools"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DEXTools</FormLabel>
                <FormControl>
                  <Input placeholder="Enter DEXTools link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dexscreener"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DEXScreener</FormLabel>
                <FormControl>
                  <Input placeholder="Enter DEXScreener link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birdeye"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birdeye</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Birdeye link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="jupiter"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Jupiter</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Create Template</Button>
      </form>
    </Form>
  )
}
