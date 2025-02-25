'use client'

import { useState } from 'react'
import { TemplateForm } from "@/components/forms/template-form"
import { TemplatePreview } from "@/components/template-preview"
import { TemplateFormData } from '@/schemas/templateSchema'


export function CreateTemplateForm({ subdomain }: { subdomain: string }) {
  const [templateData, setTemplateData] = useState<TemplateFormData>({
    type: 'terminal',
  })

  return (
    <>
      <TemplateForm
        subdomain={subdomain}
        onUpdate={(data: TemplateFormData) => setTemplateData(data)}
      />
      <TemplatePreview
        type={templateData.type}
        templateData={templateData}
      />
    </>
  )
} 