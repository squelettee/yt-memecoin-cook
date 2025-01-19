'use client'

import { use } from 'react'
import { TemplateForm } from "@/components/forms/template-form";

interface CreateTemplatePageProps {
  params: Promise<{ subdomain: string }>,
}

export default function CreateTemplatePage({ params }: CreateTemplatePageProps) {
  const { subdomain } = use(params)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Create Template for: {subdomain}</h1>
      <TemplateForm />
    </div>
  )
}