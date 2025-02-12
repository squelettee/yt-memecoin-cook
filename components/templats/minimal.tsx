'use client'

import { TemplateFormData } from "@/schemas/templateSchema";

// fields: ["telegram", "twitter", "pumpFun", "instagram", "tiktok", "logoFile", "contractAddress", "ticker", "description", "backgroundFile"]

export default function Minimal({ templateData }: { templateData: TemplateFormData }) {
  return (
    <main className="w-full h-full bg-slate-500">
      <h1>Minimal</h1>
      <pre>{JSON.stringify(templateData, null, 2)}</pre>
    </main>
  )
}
