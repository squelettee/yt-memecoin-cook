'use server'

import { prisma } from '@/lib/prisma'
import { subdomainErrors } from "@/schemas/subdomainSchema"

export async function checkAvailability(subdomain: string) {
  try {
    if (!subdomain) {
      return { error: subdomainErrors.required }
    }

    const subdomainRegex = /^[a-z0-9-]+$/
    if (!subdomainRegex.test(subdomain)) {
      return { error: subdomainErrors.format }
    }

    const existingDomain = await prisma.domain.findUnique({
      where: {
        name: subdomain
      }
    })

    if (existingDomain) {
      return { error: subdomainErrors.taken }
    }

    return { subdomain }
  } catch (error) {
    console.error('Subdomain check error:', error)
    return { error: subdomainErrors.connection }
  }
}