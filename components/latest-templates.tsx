'use client'

import { useState, useEffect } from 'react'
import { getMostRecentTemplates } from '@/actions/templates-actions'
import Link from 'next/link'
import { format } from 'timeago.js'
import { Template } from '@/schemas/templateSchema'


export function LatestTemplates() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const { templates: fetchedTemplates, error } = await getMostRecentTemplates()
        if (error) {
          setError(error instanceof Error ? error.message : String(error))
        } else if (fetchedTemplates) {
          setTemplates(fetchedTemplates as Template[])
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unexpected error occurred')
      }
    }

    fetchTemplates()
  }, [])

  if (error) {
    return <div>Error loading templates</div>
  }

  if (!templates.length) {
    return <div>No templates found</div>
  }

  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8 mx-8">
      {templates.map((template) =>
      (
        <Link
          href={`http://${template.domain?.name}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}`}
          key={template.id}
          className="group flex flex-col h-full border border-border rounded-xl p-6 hover:bg-accent/50 transition-colors cursor-pointer overflow-hidden"
        >
          <h3 className="font-semibold text-lg truncate">{template.domain?.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{template.projectName}</p>
          {template.description && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {template.description}
            </p>
          )}
          {template.ticker && (
            <span className="inline-flex mt-3 px-2 py-1 text-xs font-mono bg-primary/10 text-primary rounded-md w-fit">
              ${template.ticker}
            </span>
          )}
          <p className="text-xs text-muted-foreground mt-auto pt-4">
            Created {format(template.domain?.createdAt || new Date(), 'en')}
          </p>
        </Link>
      ))}
    </div>
  )
}
