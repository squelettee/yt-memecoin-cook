"use server";

import { prisma } from "@/lib/prisma";
import { TemplateFormData, templateSchema } from "@/schemas/templateSchema";
import { getOrCreateUser } from "../user/get-or-create-user";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function createTemplate(
  templateData: TemplateFormData,
  subdomain: string,
  address: string,
  files?: { logoFile?: File; backgroundFile?: File; imagePreviewFile?: File },
) {
  console.log("📥 createTemplate called with:", {
    templateData,
    subdomain,
    address,
    hasFiles: !!files,
  });
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
      where: { name: subdomain.toLowerCase() },
    });

    if (existingDomain) {
      return { error: "Ce nom de domaine existe déjà" };
    }

    // Récupération ou création de l'utilisateur
    const user = await getOrCreateUser(address);
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
    let imagePreviewUrl: string | null = null;
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

    if (files?.imagePreviewFile) {
      const imagePreviewBuffer = await files.imagePreviewFile.arrayBuffer();
      const imagePreviewKey = `templates/${user.id}/${Date.now()}-image-preview-${files.imagePreviewFile.name}`;

      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET,
          Key: imagePreviewKey,
          Body: Buffer.from(imagePreviewBuffer),
          ContentType: files.imagePreviewFile.type,
        }),
      );

      imagePreviewUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${imagePreviewKey}`;
    }

    // Puis créer le template avec les données validées
    const template = await prisma.template.create({
      data: {
        ...validatedData,
        logo: logoUrl,
        background: backgroundUrl,
        imagePreview: imagePreviewUrl,
        domain: {
          create: {
            name: subdomain.toLowerCase(),
          },
        },
        userId: user.id,
      },
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
