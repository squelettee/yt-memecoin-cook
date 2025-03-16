"use server";

import { prisma } from "@/lib/prisma";
import { TemplateFormData, templateSchema } from "@/schemas/templateSchema";
import { getOrCreateUser } from "../user/get-or-create-user";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function createTemplate(
  templateData: TemplateFormData,
  files?: { logoFile?: File; backgroundFile?: File },
) {
  try {
    const validationResult = templateSchema.safeParse(templateData);

    if (!validationResult.success) {
      return {
        error: "Données de template invalides",
        details: validationResult.error.format(),
      };
    }

    const validatedData = validationResult.data;

    // Vérification du domaine
    const existingDomain = await prisma.domain.findUnique({
      where: { name: validatedData.domain.name.toLowerCase() },
    });

    if (existingDomain) {
      return { error: "Ce nom de domaine existe déjà" };
    }

    // Récupération ou création de l'utilisateur
    const user = await getOrCreateUser(validatedData.user.address);
    if ("error" in user) {
      return user;
    }

    // Upload des images vers S3
    const s3Client = new S3Client({
      region: process.env.AWS_S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    let logoUrl: string | null = null;
    let backgroundUrl: string | null = null;

    if (files?.logoFile) {
      const logoBuffer = await files.logoFile.arrayBuffer();
      const logoKey = `templates/${user.id}/${Date.now()}-logo-${files.logoFile.name}`;

      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET,
          Key: logoKey,
          Body: Buffer.from(logoBuffer),
          ContentType: files.logoFile.type,
        }),
      );

      logoUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${logoKey}`;
    }

    if (files?.backgroundFile) {
      const backgroundBuffer = await files.backgroundFile.arrayBuffer();
      const backgroundKey = `templates/${user.id}/${Date.now()}-background-${files.backgroundFile.name}`;

      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET,
          Key: backgroundKey,
          Body: Buffer.from(backgroundBuffer),
          ContentType: files.backgroundFile.type,
        }),
      );

      backgroundUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${backgroundKey}`;
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
      logo: logoUrl,
      background: backgroundUrl,
      domain: {
        create: {
          name: validatedData.domain.name.toLowerCase(),
        },
      },
      userId: user.id,
    };

    const template = await prisma.template.create({
      data: templateCreateData,
      include: {
        domain: true,
        user: true,
      },
    });

    return { success: true, template };
  } catch (error) {
    console.error("Erreur détaillée lors de la création du template:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Une erreur inattendue est survenue",
    };
  }
}
