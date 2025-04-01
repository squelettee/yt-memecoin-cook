"use server";

import { prisma } from "@/lib/prisma";
import { TemplateFormData, templateSchema } from "@/schemas/templateSchema";
import { getOrCreateUser } from "../user/get-or-create-user";
import { uploadToS3 } from "@/lib/s3";
import { templates } from "@/config/templates";

export async function createTemplate(
  templateData: TemplateFormData,
  subdomain: string,
  address: string,
  duration: string,
  files?: {
    logo?: File | null;
    background?: File | null;
    preview?: File | null;
  },
) {
  const templatePrice = templates.find(
    (t) => t.id === templateData.type,
  )?.price;
  if (!templatePrice) return { error: "Template price not found" };

  if (!duration) return { error: "Duration not found" };

  const expirationDate = new Date();
  switch (duration) {
    case "1month":
      expirationDate.setMonth(expirationDate.getMonth() + 1);
      break;
    case "3months":
      expirationDate.setMonth(expirationDate.getMonth() + 3);
      break;
    case "6months":
      expirationDate.setMonth(expirationDate.getMonth() + 6);
      break;
    default:
      return { error: "Invalid duration selected" };
  }

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

    if (existingDomain) {
      return { error: "Ce nom de domaine existe déjà" };
    }

    const user = await getOrCreateUser(address);
    if ("error" in user) {
      return user;
    }

    if (files?.logo) {
      const logoUploadResult = await uploadToS3(
        files.logo,
        `templates/${user.id}/logo`,
      );
      if (logoUploadResult.success) {
        validatedData.logo = logoUploadResult.url;
      }
    }

    if (files?.background) {
      const backgroundUploadResult = await uploadToS3(
        files.background,
        `templates/${user.id}/background`,
      );
      if (backgroundUploadResult.success) {
        validatedData.backgroundImage = backgroundUploadResult.url;
      }
    }

    if (files?.preview) {
      const previewUploadResult = await uploadToS3(
        files.preview,
        `templates/${user.id}/preview`,
      );
      if (previewUploadResult.success) {
        validatedData.imagePreview = previewUploadResult.url;
      }
    }

    const template = await prisma.template.create({
      data: {
        ...validatedData,
        expirationDate,
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
