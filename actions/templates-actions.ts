'use server'

import { prisma } from '@/lib/prisma'
import { TemplateFormData } from "@/schemas/templateSchema"

export async function getTemplateByDomain(domain: string) {
  try {
    const template = await prisma.domain.findFirst({
      where: {
        name: domain
      },
      include: {
        template: true
      }
    })

    if (!template) {
      return { error: 'Template not found' }
    }

    return { template: template.template }
  } catch (error) {
    console.error('Get template error:', error)
    return { error }
  }
}

export async function getMostRecentTemplates() {
  try {
    const templates = await prisma.template.findMany({
      take: 9,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        domain: true
      }
    })

    return { templates }
  } catch (error) {
    console.error('Get latest templates error:', error)
    return { error }
  }
}

export async function createTemplate(templateData: TemplateFormData) {
  try {

    // Create template data object with null checks
    const templateCreateData = {
      projectName: templateData.projectName,
      background: templateData.background || null,
      birdeye: templateData.birdeye || null,
      coinGecko: templateData.coinGecko || null,
      coinMarketCap: templateData.coinMarketCap || null,
      contractAddress: templateData.contractAddress || null,
      description: templateData.description || null,
      dexscreener: templateData.dexscreener || null,
      dextools: templateData.dextools || null,
      imagePreview: templateData.imagePreview || null,
      instagram: templateData.instagram || null,
      jupiter: templateData.jupiter ?? false,
      logo: templateData.logo || null,
      pumpFun: templateData.pumpFun || null,
      telegram: templateData.telegram || null,
      ticker: templateData.ticker || null,
      tiktok: templateData.tiktok || null,
      twitter: templateData.twitter || null,
      userId: templateData.userId || null,
      whitepaper: templateData.whitepaper || null,
    }

    const template = await prisma.template.create({
      data: templateCreateData
    })

    const domain = await prisma.domain.create({
      data: {
        name: templateData.projectName.toLowerCase(),
        template: {
          connect: {
            projectName: template.projectName,
          },
        },
      },
    })

    return { template, domain }
  } catch (error) {
    console.error('Create template error:', error)
    return { error }
  }
}