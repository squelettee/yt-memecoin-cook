'use client'

import { useState, useEffect } from 'react'
import { getMostRecentTemplates } from '@/actions/templates-actions'
import Link from 'next/link'
import { format } from 'timeago.js'
import { Template } from '@/schemas/templateSchema'
import { Card, CardFooter, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import Image from 'next/image'

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
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        An error occurred while loading templates
      </div>
    )
  }

  if (!templates.length) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        No templates available at the moment
      </div>
    )
  }

  return (
    <div className="grid max-w-6xl w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-12 mx-auto px-4">
      {templates.map((template) => (
        <Card
          key={template.id}
          className="group relative h-full hover:shadow-lg transition-all duration-300 overflow-hidden border-2 hover:border-primary/50"
        >
          <div
            className="absolute inset-0 blur-lg"
            style={{
              backgroundImage: `url(${template.background || '/assets/illustration.avif'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="relative z-10 bg-background/80 backdrop-blur-sm rounded-lg">
            <Link href={`http://${template.domain?.name}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}`} className="block">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center justify-center">
                  <Image
                    src={template.logo || "/assets/upload_image.jpeg"}
                    alt={`Logo of ${template.domain?.name}`}
                    className="w-16 h-16 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                    width={64}
                    height={64}
                  />
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 pb-2">
                <CardTitle className="truncate text-center bg-gradient-to-r from-primary/90 to-primary text-primary-foreground rounded-lg py-3 px-4 text-sm font-medium">
                  {`${template.domain?.name}.memecook.fun`}
                </CardTitle>
              </CardContent>
            </Link>

            <CardFooter className="flex flex-col gap-3 pt-2">
              <p className="text-xs text-muted-foreground font-medium">
                Created {format(template.domain?.createdAt || new Date(), 'en')}
              </p>
              <div className="flex gap-6 justify-center w-full">
                <a
                  href={template.twitter || "#"}
                  className="text-xs text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1.5 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Twitter
                </a>
                <a
                  href={template.telegram || "#"}
                  className="text-xs text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1.5 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.623 4.823-4.35c.212-.19-.043-.295-.323-.105l-5.96 3.738-2.525-.785c-.55-.176-.564-.557.115-.824l9.873-3.812c.452-.204.853.108.707.766z" />
                  </svg>
                  Telegram
                </a>
              </div>
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  )
}
