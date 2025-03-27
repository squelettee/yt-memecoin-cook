"use client";

import { useState } from "react";
import { TemplateForm } from "@/components/forms/template-form";
import { TemplateViews } from "@/components/template-views";
import { TemplateFormData } from "@/schemas/templateSchema";

export function CreateTemplateForm({ subdomain }: { subdomain: string }) {
  const [templateData, setTemplateData] = useState<TemplateFormData>({
    type: "template1",
    projectName: "",
    ticker: "$SOL",
    description: "",
    contractAddress: "",

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
    charlink: "",
    pumpFun: "",

    // Styling configuration
    headingFont: "outfit",
    bodyFont: "outfit",
    headingColor: "#ffffff",
    backgroundColor: "#000000",
    primaryColor: "#75caff",
    secondaryColor: "#f5f5f5",
    accentColor: "#2284ec",
    textColor: "#000000",
    borderColor: "#2284ec",
    textBorderColor: "#000000",

    // About us
    aboutTitle: "ABOUT",
    aboutContent: "",
    aboutImage: "",

    // Roadmap
    roadmapTitle: "ROADMAP",
    roadmapPhase1: "Launch on Jupiter, Marketing Campaign, Community Building, Social Media Growth, Influencer Partnerships",
    roadmapPhase2: "CEX Listings, Partnerships Development, Utility Expansion, NFT Collection Launch, Staking Platform",
    roadmapPhase3: "Global Expansion, New Product Features, Community Rewards, Metaverse Integration, DAO Governance",
    roadmapEnable: true,

    // How to buy
    howtobuyTitle: "HOW TO BUY",
    howtobuyStep1: "Create any wallet of your choice, we recommend Phantom.",
    howtobuyStep2: "Fund your wallet with Solana, you can buy Solana from an exchange.",
    howtobuyStep3: "Head to Jupiter & paste our Contract Address, and swap your Solana to our token.",
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
  });

  return (
    <>
      <TemplateForm
        onUpdate={(data: TemplateFormData) => setTemplateData(data)}
        templateData={templateData}
        subdomain={subdomain}
      />
      <TemplateViews type={templateData.type} templateData={templateData} />
    </>
  );
}
