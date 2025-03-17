"use client";
import { TemplateFormData } from "@/schemas/templateSchema";
import { BetaHeader } from "@/components/templats/components/header";
import { BetaHero } from "@/components/templats/components/hero";
import { BetaFooter } from "@/components/templats/components/footer";
import { BetaSocials } from "@/components/templats/components/socials";
import { ContractAddress } from "@/components/templats/components/contract-address";
import Image from "next/image";
import { useEffect } from "react";

export default function Beta({
  templateData,
}: {
  templateData: TemplateFormData;
}) {
  const backgroundUrl =
    templateData.background || templateData.backgroundFile
      ? templateData.background ||
      URL.createObjectURL(templateData.backgroundFile!)
      : "https://memecook.fun/assets/lisa-frogs.jpg";

  useEffect(() => {
    if (templateData.backgroundFile) {
      return () => URL.revokeObjectURL(backgroundUrl);
    }
  }, [templateData.backgroundFile, backgroundUrl]);

  return (
    <main className="w-full h-full flex flex-col relative">
      <Image
        src={backgroundUrl}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-[-1] bg-repeat"
        priority
        fill
        unoptimized
      />
      <div className="absolute inset-0 bg-background/70 backdrop-blur-[1px] z-[-1]" />
      <BetaHeader templateData={templateData} />
      <div className="flex-1 flex flex-col gap-12 sm:gap-16 py-8">
        <BetaHero templateData={templateData} />
        <ContractAddress templateData={templateData} />
        <BetaSocials templateData={templateData} />
      </div>
      <BetaFooter />
    </main>
  );
}
