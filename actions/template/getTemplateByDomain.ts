'use server'

import { prisma } from "@/lib/prisma"

export async function getTemplateByDomain(domain: string) {
  try {
    const domainRecord = await prisma.domain.findFirst({
      where: {
        name: domain.toLowerCase()
      },
      include: { template: true }
    })

    if (!domainRecord?.template) {
      return { error: 'Template not found' }
    }

    return { template: domainRecord.template }
  } catch (error) {
    return {
      error: error instanceof Error
        ? error.message
        : 'Failed to retrieve template'
    }
  }
}