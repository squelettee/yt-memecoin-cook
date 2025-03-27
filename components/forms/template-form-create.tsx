"use client";

import { useState } from "react";
import { TemplateForm } from "@/components/forms/template-form";
import { TemplateViews } from "@/components/template-views";
import { TemplateFormData } from "@/schemas/templateSchema";

export function CreateTemplateForm({ subdomain }: { subdomain: string }) {
  const [templateData, setTemplateData] = useState<TemplateFormData>({
    type: "template1",
    projectName: "",
    ticker: "",
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
    aboutTitle: "",
    aboutContent: "",
    aboutImage: "",

    // Roadmap
    roadmapTitle: "",
    roadmapPhase1: "",
    roadmapPhase2: "",
    roadmapPhase3: "",
    roadmapEnable: true,

    // How to buy
    howtobuyTitle: "",
    howtobuyStep1: "",
    howtobuyStep2: "",
    howtobuyStep3: "",
    howtobuyStep4: "",

    // FAQ
    faqTitle: "",
    faqQuestion1: "",
    faqQuestion2: "",
    faqQuestion3: "",
    faqQuestion4: "",
    faqAnswer1: "",
    faqAnswer2: "",
    faqAnswer3: "",
    faqAnswer4: "",
    faqEnable: true,

    // Footer
    footerText: "",

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
