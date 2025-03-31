"use server";

import { prisma } from "@/lib/prisma";
import { TemplateFormData, templateSchema } from "@/schemas/templateSchema";
import { getOrCreateUser } from "../user/get-or-create-user";
import { uploadToS3 } from "@/lib/s3";

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
