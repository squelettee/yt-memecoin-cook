"use client";

import { TemplateFormData } from "@/schemas/templateSchema";
import Image from "next/image";
import { useEffect, useState } from "react";

export function BetaHeader({
  templateData,
}: {
  templateData: TemplateFormData;
}) {
  const [logoUrl, setLogoUrl] = useState<string>(
    "https://memecook.fun/assets/upload_image.jpeg",
  );

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
    <header className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 flex items-center justify-between border-b bg-transparent backdrop-blur-sm">
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        <div className="flex-shrink-0 rounded-full overflow-hidden w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] md:w-[56px] md:h-[56px]">
          <Image
            src={logoUrl}
            alt="Logo"
            width={56}
            height={56}
            className="object-cover w-full h-full"
            unoptimized
          />
        </div>
        <span className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl truncate">
          {templateData.ticker || "YOUR TICKER"}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <a
          href={templateData.telegram || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] flex items-center justify-center bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          <Image
            src="https://memecook.fun/socials/telegram.webp"
            alt="Telegram"
            width={24}
            height={24}
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
        </a>
        <a
          href={templateData.twitter || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] flex items-center justify-center bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          <Image
            src="https://memecook.fun/socials/twitter.png"
            alt="X (Twitter)"
            width={24}
            height={24}
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
        </a>
      </div>
    </header>
  );
}
