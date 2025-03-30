"use server";

import { prisma } from "@/lib/prisma";
import { TemplateFormData, templateSchema } from "@/schemas/templateSchema";
import { getOrCreateUser } from "../user/get-or-create-user";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function createTemplate(
  templateData: TemplateFormData,
  subdomain: string,
  address: string,
  selectedDuration: string,
  files?: {
    logo?: File | null;
    background?: File | null;
    preview?: File | null;
  },
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

    const existingDomain = await prisma.domain.findUnique({
      where: { name: subdomain.toLowerCase() },
    });

    if (selectedDuration === "1month") {
      console.log("salut");
    }

    if (existingDomain) {
      return { error: "Ce nom de domaine existe déjà" };
    }

    const user = await getOrCreateUser(address);
    if ("error" in user) {
      return user;
    }

    const s3Client = new S3Client({
      region: process.env.AWS_S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    if (files?.logo) {
      const logoBuffer = await files.logo.arrayBuffer();
      const logoKey = `templates/${user.id}/${Date.now()}-logo-${files.logo.name}`;

      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET,
          Key: logoKey,
          Body: Buffer.from(logoBuffer),
          ContentType: files.logo.type,
        }),
      );

      validatedData.logo = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${logoKey}`;
    }

    if (files?.background) {
      const backgroundBuffer = await files.background.arrayBuffer();
      const backgroundKey = `templates/${user.id}/${Date.now()}-background-${files.background.name}`;

      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET,
          Key: backgroundKey,
          Body: Buffer.from(backgroundBuffer),
          ContentType: files.background.type,
        }),
      );

      validatedData.backgroundImage = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${backgroundKey}`;
    }

    if (files?.preview) {
      const imagePreviewBuffer = await files.preview.arrayBuffer();
      const imagePreviewKey = `templates/${user.id}/${Date.now()}-image-preview-${files.preview.name}`;

      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET,
          Key: imagePreviewKey,
          Body: Buffer.from(imagePreviewBuffer),
          ContentType: files.preview.type,
        }),
      );

      validatedData.imagePreview = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${imagePreviewKey}`;
    }

    const template = await prisma.template.create({
      data: {
        ...validatedData,
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
