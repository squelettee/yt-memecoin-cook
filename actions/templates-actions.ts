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
    if (!templateData.domain?.name) {
      return { error: 'Domain name is required' };
    }

    if (!templateData.projectName) {
      return { error: 'Project name is required' };
    }

    const existingDomain = await prisma.domain.findUnique({
      where: {
        name: templateData.domain.name.toLowerCase()
      }
    });

    if (existingDomain) {
      return { error: 'Domain name already exists' };
    }

    // Create template data object with validated fields
    const templateCreateData = {
      projectName: templateData.projectName,
      background: templateData.background ?? null,
      birdeye: templateData.birdeye ?? null,
      coinGecko: templateData.coinGecko ?? null,
      coinMarketCap: templateData.coinMarketCap ?? null,
      contractAddress: templateData.contractAddress ?? null,
      description: templateData.description ?? null,
      dexscreener: templateData.dexscreener ?? null,
      dextools: templateData.dextools ?? null,
      imagePreview: templateData.imagePreview ?? null,
      instagram: templateData.instagram ?? null,
      jupiter: templateData.jupiter ?? false,
      logo: templateData.logo ?? null,
      pumpFun: templateData.pumpFun ?? null,
      telegram: templateData.telegram ?? null,
      ticker: templateData.ticker ?? null,
      tiktok: templateData.tiktok ?? null,
      twitter: templateData.twitter ?? null,
      userId: templateData.userId ?? null,
      whitepaper: templateData.whitepaper ?? null,
      domain: {
        create: {
          name: templateData.domain.name.toLowerCase(),
        }
      }
    };

    const template = await prisma.template.create({
      data: templateCreateData,
      include: {
        domain: true
      }
    });

    return { template };
  } catch (error) {
    console.error('Create template error:', error);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unexpected error occurred' };
  }
}