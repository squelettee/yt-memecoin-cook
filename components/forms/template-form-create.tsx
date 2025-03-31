"use client";

import { useState } from "react";
import { TemplateForm } from "@/components/forms/template-form";
import { TemplateViews } from "@/components/template-views";
import { TemplateFormData } from "@/schemas/templateSchema";
import { Template } from "@/interfaces/template";

interface CreateTemplateFormProps {
  subdomain: string;
  existingTemplate?: Template;
  isEditing?: boolean;
}

export function CreateTemplateForm({
  subdomain,
  existingTemplate,
  isEditing = false,
}: CreateTemplateFormProps) {
  const [files, setFiles] = useState<{
    logoFile: File | null;
    backgroundFile: File | null;
    previewImage: File | null;
  }>({
    logoFile: null,
    backgroundFile: null,
    previewImage: null,
  });

  // Initialiser les données du template avec les valeurs existantes si disponibles
  const [templateData, setTemplateData] = useState<TemplateFormData>(() => {
    if (existingTemplate) {
      // Convertir le template existant en TemplateFormData
      return {
        type: existingTemplate.type || "template1",
        projectName: existingTemplate.projectName || "project name",
        ticker: existingTemplate.ticker || "$SOL",
        description:
          existingTemplate.description || "short description of the project",
        contractAddress:
          existingTemplate.contractAddress ||
          "63LfDmNb3MQ8mw9MtZ2To9bEA2M71kZUUGq5tiJxcqj9",
        buyNowLink: existingTemplate.buyNowLink || "https://jup.ag/swap/",

        // Links
        whitepaper: existingTemplate.whitepaper || "",
        coinGecko: existingTemplate.coinGecko || "",
        coinMarketCap: existingTemplate.coinMarketCap || "",
        telegram: existingTemplate.telegram || "",
        twitter: existingTemplate.twitter || "",
        instagram: existingTemplate.instagram || "",
        tiktok: existingTemplate.tiktok || "",
        dextools: existingTemplate.dextools || "",
        dexscreener: existingTemplate.dexscreener || "",
        birdeye: existingTemplate.birdeye || "",
        jupiter: existingTemplate.jupiter || "",
        pumpFun: existingTemplate.pumpFun || "",

        // Styling configuration
        headingFont: existingTemplate.headingFont || "dynapuff",
        bodyFont: existingTemplate.bodyFont || "dynapuff",
        headingColor: existingTemplate.headingColor || "#ffffff",
        backgroundColor: existingTemplate.backgroundColor || "#ffffff",
        primaryColor: existingTemplate.primaryColor || "#75caff",
        secondaryColor: existingTemplate.secondaryColor || "#f5f5f5",
        accentColor: existingTemplate.accentColor || "#ec4899",
        textColor: existingTemplate.textColor || "#000000",
        borderColor: existingTemplate.borderColor || "#2284ec",
        textBorderColor: existingTemplate.textBorderColor || "#000000",

        // About us
        aboutTitle: existingTemplate.aboutTitle || "ABOUT",
        aboutContent:
          existingTemplate.aboutContent ||
          "We are a team of experienced traders and developers who are passionate about the future of the crypto market.",
        aboutImage: existingTemplate.aboutImage || "",

        // Roadmap
        roadmapTitle: existingTemplate.roadmapTitle || "ROADMAP",
        roadmapPhase1:
          existingTemplate.roadmapPhase1 ||
          "Launch on Jupiter, Marketing Campaign, Community Building, Social Media Growth, Influencer Partnerships",
        roadmapPhase2:
          existingTemplate.roadmapPhase2 ||
          "CEX Listings, Partnerships Development, Utility Expansion, NFT Collection Launch, Staking Platform",
        roadmapPhase3:
          existingTemplate.roadmapPhase3 ||
          "Global Expansion, New Product Features, Community Rewards, Metaverse Integration, DAO Governance",
        roadmapEnable:
          existingTemplate.roadmapEnable !== undefined
            ? existingTemplate.roadmapEnable
            : true,

        // How to buy
        howtobuyTitle: existingTemplate.howtobuyTitle || "HOW TO BUY",
        howtobuyStep1:
          existingTemplate.howtobuyStep1 ||
          "Create any wallet of your choice, we recommend Phantom.",
        howtobuyStep2:
          existingTemplate.howtobuyStep2 ||
          "Fund your wallet with Solana, you can buy Solana from an exchange.",
        howtobuyStep3:
          existingTemplate.howtobuyStep3 ||
          "Head to Jupiter & paste our Contract Address, and swap your Solana to our token.",
        howtobuyStep4:
          existingTemplate.howtobuyStep4 ||
          "Wait for the transaction to confirm, and you're in!",

        // FAQ
        faqTitle: existingTemplate.faqTitle || "FAQ",
        faqQuestion1: existingTemplate.faqQuestion1 || "Question 1",
        faqQuestion2: existingTemplate.faqQuestion2 || "Question 2",
        faqQuestion3: existingTemplate.faqQuestion3 || "Question 3",
        faqQuestion4: existingTemplate.faqQuestion4 || "Question 4",
        faqAnswer1: existingTemplate.faqAnswer1 || "Answer 1",
        faqAnswer2: existingTemplate.faqAnswer2 || "Answer 2",
        faqAnswer3: existingTemplate.faqAnswer3 || "Answer 3",
        faqAnswer4: existingTemplate.faqAnswer4 || "Answer 4",
        faqEnable:
          existingTemplate.faqEnable !== undefined
            ? existingTemplate.faqEnable
            : true,

        // Footer
        footerText: existingTemplate.footerText || "Join our community",

        // Media urls
        logo: existingTemplate.logo || null,
        background: existingTemplate.background || null,
        imagePreview: existingTemplate.imagePreview || null,
      };
    } else {
      // Utiliser les valeurs par défaut si aucun template existant
      return {
        type: "template1",
        projectName: "project name",
        ticker: "$SOL",
        description: "short description of the project",
        contractAddress: "63LfDmNb3MQ8mw9MtZ2To9bEA2M71kZUUGq5tiJxcqj9",
        buyNowLink: "https://jup.ag/swap/",

        // Links
        whitepaper: "",
        coinGecko: "",
        coinMarketCap: "",
        telegram: "",
        twitter: "",
        instagram: "",
        tiktok: "",
        dextools: "",
        dexscreener: "",
        birdeye: "",
        jupiter: "",
        pumpFun: "",

        // Styling configuration
        headingFont: "dynapuff",
        bodyFont: "dynapuff",
        headingColor: "#ffffff",
        backgroundColor: "#ffffff",
        primaryColor: "#75caff",
        secondaryColor: "#f5f5f5",
        accentColor: "#ec4899",
        textColor: "#000000",
        borderColor: "#2284ec",
        textBorderColor: "#000000",

        // About us
        aboutTitle: "ABOUT",
        aboutContent:
          "We are a team of experienced traders and developers who are passionate about the future of the crypto market.",
        aboutImage: "",

        // Roadmap
        roadmapTitle: "ROADMAP",
        roadmapPhase1:
          "Launch on Jupiter, Marketing Campaign, Community Building, Social Media Growth, Influencer Partnerships",
        roadmapPhase2:
          "CEX Listings, Partnerships Development, Utility Expansion, NFT Collection Launch, Staking Platform",
        roadmapPhase3:
          "Global Expansion, New Product Features, Community Rewards, Metaverse Integration, DAO Governance",
        roadmapEnable: true,

        // How to buy
        howtobuyTitle: "HOW TO BUY",
        howtobuyStep1:
          "Create any wallet of your choice, we recommend Phantom.",
        howtobuyStep2:
          "Fund your wallet with Solana, you can buy Solana from an exchange.",
        howtobuyStep3:
          "Head to Jupiter & paste our Contract Address, and swap your Solana to our token.",
        howtobuyStep4: "Wait for the transaction to confirm, and you're in!",

        // FAQ
        faqTitle: "FAQ",
        faqQuestion1: "Question 1",
        faqQuestion2: "Question 2",
        faqQuestion3: "Question 3",
        faqQuestion4: "Question 4",
        faqAnswer1: "Answer 1",
        faqAnswer2: "Answer 2",
        faqAnswer3: "Answer 3",
        faqAnswer4: "Answer 4",
        faqEnable: true,

        // Footer
        footerText: "Join our community",

        // Media urls
        logo: null,
        background: null,
        imagePreview: null,
      };
    }
  });

  return (
    <div className="flex h-screen w-full">
      <div className="h-full overflow-y-auto">
        <TemplateForm
          onUpdate={(data: TemplateFormData) => setTemplateData(data)}
          templateData={templateData}
          subdomain={subdomain}
          files={files}
          setFiles={setFiles}
          isEditing={isEditing}
        />
      </div>
      <div className="flex-1">
        <TemplateViews
          type={templateData.type}
          templateData={templateData}
          files={files}
          subdomain={subdomain}
        />
      </div>
    </div>
  );
}
