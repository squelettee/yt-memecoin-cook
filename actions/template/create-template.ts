'use server'

import { prisma } from "@/lib/prisma";
import { TemplateFormData, templateSchema } from "@/schemas/templateSchema";
import { getOrCreateUser } from "../user/get-or-create-user";
// import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'

export async function createTemplate(templateData: TemplateFormData) {
  try {
    const validationResult = templateSchema.safeParse(templateData);

    if (!validationResult.success) {
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

    // Vérification du paiement
    // const connection = new Connection(process.env.SOLANA_RPC_URL!)
    // const recipientAddress = new PublicKey(process.env.RECIPIENT_SOLANA_ADDRESS!)
    // const senderAddress = new PublicKey(validatedData.user.address)

    // Vérifier le solde
    // const balance = await connection.getBalance(senderAddress)
    // const paymentAmount = 0.001 * LAMPORTS_PER_SOL

    // if (balance < paymentAmount) {
    //   return { error: 'Solde insuffisant' }
    // }

    // // Créer et envoyer la transaction
    // const transaction = new Transaction().add(
    //   SystemProgram.transfer({
    //     fromPubkey: senderAddress,
    //     toPubkey: recipientAddress,
    //     lamports: paymentAmount
    //   })
    // )


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

    const template = await prisma.template.create({
      data: templateCreateData,
      include: {
        domain: true,
        user: true
      }
    });

    return { success: true, template };

  } catch (error) {
    console.error('Erreur détaillée lors de la création du template:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Une erreur inattendue est survenue'
    };
  }
}