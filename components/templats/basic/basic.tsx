"use client"

import { TemplateFormData } from "@/schemas/templateSchema";
import { BasicHeader } from "@/components/templats/basic/components/header";
import { BasicHero } from "@/components/templats/basic/components/hero";
import { BasicFooter } from "@/components/templats/basic/components/footer";
import { BasicSocials } from "@/components/templats/basic/components/socials";
import { JupiterSwap } from "@/components/templats/basic/components/jupiter-swap";
import Image from 'next/image';
import { useEffect } from 'react';

// Basic template documentation
// Required fields:
// - projectName: Name of the project
// - ticker: Token/coin ticker symbol
// - description: Project description text
// - telegram: Telegram group/channel link
// - twitter: Twitter/X profile link  
// - logoFile: Project logo image file
// - address: Contract address
// - backgroundFile: Project background image file
//
// This is the simplest template with just the essential fields
// for a basic token/project landing page

export default function Basic({ templateData }: { templateData: TemplateFormData }) {
  const backgroundUrl = templateData.backgroundFile
    ? URL.createObjectURL(templateData.backgroundFile)
    : "/assets/lisa-frogs.jpg";

  // Nettoyer l'URL créée quand le composant est démonté
  useEffect(() => {
    return () => {
      if (templateData.backgroundFile) {
        URL.revokeObjectURL(backgroundUrl);
      }
    };
  }, [templateData.backgroundFile, backgroundUrl]);

  return (
    <main className="w-[100vw] min-h-[100vh] flex flex-col relative">
      <Image
        src={backgroundUrl}
        alt="Background"
        fill
        className="object-cover z-[-1]"
        priority
      />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] z-[-1]" />
      <BasicHeader templateData={templateData} />
      <div className="flex-1 flex flex-col gap-12 sm:gap-16 py-8">
        <BasicHero templateData={templateData} />

        {/* Intégration du composant Jupiter Swap */}
        <JupiterSwap templateData={templateData} />

        <BasicSocials templateData={templateData} />
      </div>
      <BasicFooter />
    </main>
  );
}
