"use server";

import { prisma } from "@/lib/prisma";
import { TemplateFormData } from "@/schemas/templateSchema";
import { revalidatePath } from "next/cache";
import { uploadToS3 } from "@/lib/s3";
import { PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import nacl from "tweetnacl";

export async function updateTemplate(
  data: TemplateFormData & {
    subdomain?: string;
    signature?: string;
    message?: string;
    publicKey?: string;
  },
  files?: {
    logo?: File | null;
    background?: File | null;
    imagePreview?: File | null;
  },
) {
  try {
    // Vérifier que la signature, le message et la clé publique sont fournis
    if (!data.signature || !data.message || !data.publicKey) {
      return {
        success: false,
        error: "Signature verification failed: missing data",
      };
    }

    // Récupérer l'ID du template à partir du nom de domaine
    const domain = await prisma.domain.findUnique({
      where: {
        name: data.subdomain,
      },
      include: {
        template: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!domain || !domain.template) {
      return {
        success: false,
        error: "Template not found",
      };
    }

    // Vérifier que l'utilisateur est le propriétaire du template
    if (domain.template.user?.address !== data.publicKey) {
      return {
        success: false,
        error: "You are not authorized to update this template",
      };
    }

    // Vérifier la signature
    try {
      const messageBytes = new TextEncoder().encode(data.message);
      const publicKeyBytes = new PublicKey(data.publicKey).toBytes();
      const signatureBytes = bs58.decode(data.signature);

      const isValid = nacl.sign.detached.verify(
        messageBytes,
        signatureBytes,
        publicKeyBytes,
      );

      if (!isValid) {
        return {
          success: false,
          error: "Invalid signature, are you trying to hack memecook bro ?",
        };
      }
    } catch (error) {
      console.error("Signature verification error:", error);
      return {
        success: false,
        error: "Signature verification failed",
      };
    }

    // Use the subdomain for organizing files in S3
    const fileBasePath = `domains/${data.subdomain}`;

    // Gérer les uploads d'images si nécessaire
    let logoUrl: string | null = domain.template.logo;
    let backgroundUrl: string | null = domain.template.background;
    let previewUrl: string | null = domain.template.imagePreview;

    if (files) {
      // Upload du logo si fourni
      if (files.logo) {
        const logoUploadResult = await uploadToS3(
          files.logo,
          `${fileBasePath}/logo`,
        );
        if (logoUploadResult.success && logoUploadResult.url) {
          logoUrl = logoUploadResult.url;
        }
      }

      // Upload de l'image de fond si fournie
      if (files.background) {
        const backgroundUploadResult = await uploadToS3(
          files.background,
          `${fileBasePath}/background`,
        );
        if (backgroundUploadResult.success && backgroundUploadResult.url) {
          backgroundUrl = backgroundUploadResult.url;
        }
      }

      // Upload de l'image de prévisualisation si fournie
      if (files.imagePreview) {
        const previewUploadResult = await uploadToS3(
          files.imagePreview,
          `${fileBasePath}/preview`,
        );
        if (previewUploadResult.success && previewUploadResult.url) {
          previewUrl = previewUploadResult.url;
        }
      }
    }

    // Mettre à jour le template dans la base de données
    const updatedTemplate = await prisma.template.update({
      where: {
        id: domain.template.id,
      },
      data: {
        type: data.type,
        projectName: data.projectName,
        ticker: data.ticker,
        description: data.description,
        contractAddress: data.contractAddress,
        buyNowLink: data.buyNowLink,

        // Images mises à jour
        logo: logoUrl,
        background: backgroundUrl,
        imagePreview: previewUrl,

        // Links
        whitepaper: data.whitepaper,
        coinGecko: data.coinGecko,
        coinMarketCap: data.coinMarketCap,
        telegram: data.telegram,
        twitter: data.twitter,
        instagram: data.instagram,
        tiktok: data.tiktok,
        dextools: data.dextools,
        dexscreener: data.dexscreener,
        birdeye: data.birdeye,
        jupiter: data.jupiter,
        pumpFun: data.pumpFun,

        // Styling configuration
        headingFont: data.headingFont,
        bodyFont: data.bodyFont,
        headingColor: data.headingColor,
        backgroundColor: data.backgroundColor,
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        accentColor: data.accentColor,
        textColor: data.textColor,
        borderColor: data.borderColor,
        textBorderColor: data.textBorderColor,

        // About us
        aboutTitle: data.aboutTitle,
        aboutContent: data.aboutContent,

        // Roadmap
        roadmapTitle: data.roadmapTitle,
        roadmapPhase1: data.roadmapPhase1,
        roadmapPhase2: data.roadmapPhase2,
        roadmapPhase3: data.roadmapPhase3,
        roadmapEnable: data.roadmapEnable,

        // How to buy
        howtobuyTitle: data.howtobuyTitle,
        howtobuyStep1: data.howtobuyStep1,
        howtobuyStep2: data.howtobuyStep2,
        howtobuyStep3: data.howtobuyStep3,
        howtobuyStep4: data.howtobuyStep4,

        // FAQ
        faqTitle: data.faqTitle,
        faqQuestion1: data.faqQuestion1,
        faqQuestion2: data.faqQuestion2,
        faqQuestion3: data.faqQuestion3,
        faqQuestion4: data.faqQuestion4,
        faqAnswer1: data.faqAnswer1,
        faqAnswer2: data.faqAnswer2,
        faqAnswer3: data.faqAnswer3,
        faqAnswer4: data.faqAnswer4,
        faqEnable: data.faqEnable,

        // Footer
        footerText: data.footerText,
      },
    });

    // Revalider le chemin pour mettre à jour les données affichées
    revalidatePath(`/profile/projects`);

    // Revalider également la page du site
    const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN;
    if (baseDomain && domain.name) {
      revalidatePath(`http://${domain.name}.${baseDomain}`);
    }

    return {
      success: true,
      template: updatedTemplate,
    };
  } catch (error) {
    console.error("Error updating template:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update template",
    };
  }
}
