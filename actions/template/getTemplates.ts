'use server'
import { prisma } from "@/lib/prisma"

export async function getTemplates(limit: number = 9) {
  try {
    const templates = await prisma.template.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        domain: true,
      },
    })

    if (!templates.length) {
      return { templates: [], message: 'Aucun template trouvé' }
    }

    return { templates }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Erreur lors de la récupération des templates',
      templates: []
    }
  }
}