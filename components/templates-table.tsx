'use client'

import { format } from 'timeago.js'
import { TemplateType } from '@/schemas/templateSchema'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { InfoIcon, LinkIcon } from 'lucide-react'
import Image from 'next/image'

export function TemplatesTable({ templates }: { templates: TemplateType[] }) {
  const router = useRouter()

  if (!templates.length) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        <InfoIcon className="mr-2 h-4 w-4" />
        No templates available at the moment
      </div>
    )
  }

  const handleRowClick = (domainName: string) => {
    router.push(`http://${domainName}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}`)
  }

  return (
    <div className="rounded-md border bg-background/80 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[60px] md:w-[100px]">Logo</TableHead>
            <TableHead>Project</TableHead>
            <TableHead className="hidden md:table-cell">Ticker</TableHead>
            <TableHead className="hidden md:table-cell md:text-right">
              <span className="hidden md:inline">Socials</span>
            </TableHead>
            <TableHead className="hidden md:table-cell text-right">Created</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {templates.map((template) => (
            <TableRow
              key={template.id}
              className="hover:bg-muted/50 cursor-pointer"
              onClick={() => template.domain?.name && handleRowClick(template.domain.name)}
            >
              <TableCell>
                <Image
                  src={template.logo || "/assets/upload_image.jpeg"}
                  alt={`${template.domain?.name} logo`}
                  width={48}
                  height={48}
                  className="h-10 w-10 md:h-12 md:w-12 object-cover border-2 rounded-full"
                />
              </TableCell>

              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium line-clamp-1">
                    {template.projectName || 'Unnamed Project'}
                  </span>
                  <span className="text-sm text-muted-foreground line-clamp-1">
                    {template.domain?.name}.memecook.fun
                  </span>
                </div>
              </TableCell>

              <TableCell className="hidden md:table-cell">
                <span className="font-mono bg-muted px-2 py-1 rounded-md text-sm">
                  {template.ticker || 'N/A'}
                </span>
              </TableCell>

              <TableCell className="hidden md:table-cell md:text-right">
                <div className="flex gap-1 md:gap-2 justify-end">
                  {template.twitter && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="md:h-auto md:w-auto md:px-3 md:py-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a href={template.twitter} target="_blank" rel="noopener noreferrer">
                        <LinkIcon className="h-4 w-4" />
                        <span className="ml-2">Twitter</span>
                      </a>
                    </Button>
                  )}
                  {template.telegram && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="md:h-auto md:w-auto md:px-3 md:py-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a href={template.telegram} target="_blank" rel="noopener noreferrer">
                        <LinkIcon className="h-4 w-4" />
                        <span className="ml-2">Telegram</span>
                      </a>
                    </Button>
                  )}
                </div>
              </TableCell>

              <TableCell className="hidden md:table-cell text-right">
                <time
                  title={new Date(template.domain?.createdAt || Date.now()).toLocaleString()}
                  className="text-sm text-muted-foreground"
                >
                  {format(template.domain?.createdAt || new Date(), 'en')}
                </time>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-center py-4">
              Showing {templates.length} template{templates.length > 1 ? 's' : ''}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
} 