"use client"

import { TemplateFormData } from "@/schemas/templateSchema";

export default function Basic({ templateData }: { templateData: TemplateFormData }) {
  return (
    <main className="w-full h-full bg-slate-500">
      <h1>Basic</h1>
      <pre>{JSON.stringify(templateData, null, 2)}</pre>
    </main>
  )
}
