'use server'

import { prisma } from "@/lib/prisma"

export const checkSubdomainAvailability = async (subdomain: string) => {
  try {
    const result = await prisma.domain.findUnique({
      where: {
        name: subdomain.toLowerCase()
      }
    })
    return !result
  } catch (error) {
    console.error('Erreur lors de la vérification de la disponibilité du sous-domaine:', error)
    return false
  }
}