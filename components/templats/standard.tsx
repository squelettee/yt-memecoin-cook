"use client"

import { TemplateFormData } from "@/schemas/templateSchema";

export default function Standard({ templateData }: { templateData: TemplateFormData }) {
  return (
    <main className="w-full h-full bg-slate-500">
      <h1>Standard</h1>
      <pre>{JSON.stringify(templateData, null, 2)}</pre>
    </main>
  )
}
