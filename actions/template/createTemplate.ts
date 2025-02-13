'use server'

import { prisma } from "@/lib/prisma";
import { TemplateFormData, templateSchema } from "@/schemas/templateSchema";
import { getOrCreateUser } from "../user/getOrCreateUser";

export async function createTemplate(templateData: TemplateFormData) {
  try {
    console.log('Données reçues dans createTemplate:', templateData); // Debug

    const validationResult = templateSchema.safeParse(templateData);

    if (!validationResult.success) {
      console.log('Erreur de validation:', validationResult.error.format()); // Debug
      return {
        error: 'Données de template invalides',
        details: validationResult.error.format()
      };
    }

    const validatedData = validationResult.data;

    // Vérification du domaine
    const existingDomain = await prisma.domain.findUnique({
      where: { name: validatedData.domain.name.toLowerCase() }
    });

    if (existingDomain) {
      return { error: 'Ce nom de domaine existe déjà' };
    }

    // Récupération ou création de l'utilisateur
    const user = await getOrCreateUser(validatedData.user.address);
    if ('error' in user) {
      return user;
    }

    // Préparation des données pour la création
    const templateCreateData = {
      type: validatedData.type,
      projectName: validatedData.projectName,
      ticker: validatedData.ticker,
      description: validatedData.description,
      contractAddress: validatedData.contractAddress,
      whitepaper: validatedData.whitepaper,
      coinGecko: validatedData.coinGecko,
      coinMarketCap: validatedData.coinMarketCap,
      telegram: validatedData.telegram,
      twitter: validatedData.twitter,
      instagram: validatedData.instagram,
      tiktok: validatedData.tiktok,
      dextools: validatedData.dextools,
      dexscreener: validatedData.dexscreener,
      birdeye: validatedData.birdeye,
      jupiter: validatedData.jupiter,
      headingFont: validatedData.headingFont,
      bodyFont: validatedData.bodyFont,
      headingColor: validatedData.headingColor,
      backgroundColor: validatedData.backgroundColor,
      domain: {
        create: {
          name: validatedData.domain.name.toLowerCase()
        }
      },
      userId: user.id,
    };

    console.log('Données préparées pour création:', templateCreateData); // Debug

    const template = await prisma.template.create({
      data: templateCreateData,
      include: {
        domain: true,
        user: true
      }
    });

    console.log('Template créé:', template); // Debug
    return { success: true, template };

  } catch (error) {
    console.error('Erreur détaillée lors de la création du template:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Une erreur inattendue est survenue'
    };
  }
}