"use client";

import { TemplateFormData } from "@/schemas/templateSchema";
import Image from "next/image";
import { useEffect, useState } from "react";

export function BetaHeader({
  templateData,
}: {
  templateData: TemplateFormData;
}) {
  const [logoUrl, setLogoUrl] = useState<string>("/assets/upload_image.jpeg");

  useEffect(() => {
    if (templateData.logo) {
      setLogoUrl(templateData.logo);
    } else if (templateData.logoFile) {
      const url = URL.createObjectURL(templateData.logoFile);
      setLogoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [templateData.logo, templateData.logoFile]);

  return (
    <header className="w-full px-4 md:px-6 lg:px-8 py-4 md:py-6 flex items-center justify-between border-b bg-background/95 backdrop-blur-sm fixed top-0 z-50">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="rounded-full overflow-hidden w-[32px] h-[32px] md:w-[40px] md:h-[40px]">
          <Image
            src={logoUrl}
            alt="Logo"
            width={40}
            height={40}
            className="object-cover w-full h-full"
            unoptimized
          />
        </div>
        <span className="font-bold text-lg md:text-xl truncate max-w-[120px] sm:max-w-[200px] md:max-w-none">
          {templateData.ticker || "YOUR TICKER"}
        </span>
      </div>
    </header>
  );
}
