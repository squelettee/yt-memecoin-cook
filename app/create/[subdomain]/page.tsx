'use client'

import { use, useState } from 'react'
import { TemplateForm } from "@/components/forms/template-form";
import { TemplateFormData } from '@/schemas/templateSchema';
import dynamic from 'next/dynamic';

const Minimal = dynamic(() => import('@/components/templats/minimal'))
const Pro = dynamic(() => import('@/components/templats/pro'))
const Basic = dynamic(() => import('@/components/templats/basic'))
const Standard = dynamic(() => import('@/components/templats/standard'))
const Complet = dynamic(() => import('@/components/templats/complet'))
const Terminal = dynamic(() => import('@/components/templats/terminal'))
interface CreateTemplatePageProps {
  params: Promise<{ subdomain: string }>,
}

const TemplatePreview = ({ type, templateData }: { type: string, templateData: TemplateFormData }) => {
  return (
    <>
      {type === 'minimal' && <Minimal templateData={templateData} />}
      {type === 'pro' && <Pro templateData={templateData} />}
      {type === 'basic' && <Basic templateData={templateData} />}
      {type === 'standard' && <Standard templateData={templateData} />}
      {type === 'complet' && <Complet templateData={templateData} />}
      {type === 'terminal' && <Terminal templateData={templateData} />}
    </>
  )
}

export default function CreateTemplatePage({ params }: CreateTemplatePageProps) {
  const { subdomain } = use(params)
  const [templateData, setTemplateData] = useState<TemplateFormData>({
    type: 'terminal',
  } as TemplateFormData)

  return (
    <main className="w-full flex flex-col md:flex-row h-[100vh]">
      <TemplateForm
        subdomain={subdomain}
        onUpdate={(data: TemplateFormData) => setTemplateData(data)}
      />
      <TemplatePreview
        type={templateData.type}
        templateData={templateData}
      />
    </main>
  )
}