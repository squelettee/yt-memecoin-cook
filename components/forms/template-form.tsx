"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { templateSchema, TemplateFormData } from "@/schemas/templateSchema"
import { templateActions } from "@/actions/templates-actions"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function TemplateForm() {
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
      whitepaper: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: TemplateFormData) {
    const result = await templateActions.createTemplate(values)

    if (result.error) {
      console.error('Error creating template:', result.error)
      return
    }
    router.push(`http://${values.projectName}.${process.env.NEXT_PUBLIC_BASE_DOMAIN!}`)

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
