'use client'

import { useState, useEffect } from 'react'
import { templateActions } from '@/actions/templates-actions'
import { TemplateFormData } from '@/schemas/templateSchema'
import Link from 'next/link'
import { format } from 'timeago.js'


export function LatestTemplates() {
  const [templates, setTemplates] = useState<Array<TemplateFormData & {
    id: number,
    domain: {
      name: string,
      createdAt: string
    }
  }>>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const { templates, error } = await templateActions.getLatestTemplates()
        console.log(templates)
        if (error) {
          setError(error)
        } else {
          setTemplates(templates)
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

  if (!templates?.length) {
    return <div>No templates found</div>
  }

  return (
    <div className="grid w-full grid-cols-3 gap-4">
      {templates.map((template) =>
      (
        <Link
          href={`http://${template.domain.name}.localhost:3000`}
          key={template.id}
          className="border p-4 rounded hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <h3>{template.domain.name}</h3>
          <p>{template.projectName}</p>
          {template.description && <p className="text-sm text-gray-600">{template.description}</p>}
          {template.ticker && <span className="text-xs font-mono">${template.ticker}</span>}
          <p className="text-xs text-gray-500 mt-2">
            Create {format(template.domain.createdAt, 'en')}
          </p>
        </Link>
      ))}
    </div>
  )
}
