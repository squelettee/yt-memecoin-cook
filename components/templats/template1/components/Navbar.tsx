"use client";

import Image from "next/image";
import { TemplateFormData } from "@/schemas/templateSchema";
import { ShadowButton } from "@/components/ui/shadow-button";
import { useEffect } from "react";
import { useState } from "react";

export const Navbar = ({
  templateData,
}: {
  templateData: TemplateFormData;
}) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

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
    <div className="w-full py-4 px-4">
      <nav className="max-w-7xl mx-auto relative">
        {/* Black shadow div positioned behind and offset */}
        <div className="absolute bg-black rounded-full w-full h-full top-[5px] right-[-5px]"></div>

        {/* Main navbar */}
        <div className="bg-white rounded-full border border-black border-solid px-6 py-3 flex items-center justify-between relative z-10">
          {/* Left side - Logo and Nav Links */}
          <div className="flex items-center gap-8">
            <div className="h-14 w-14 rounded-full overflow-hidden flex items-center justify-center border border-black border-solid">
              <Image
                className="h-full w-full"
                src={logoUrl}
                alt="Bear Logo"
                width={100}
                height={100}
              />
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection("about")}
                className="font-bold text-black hover:text-gray-700 transition-colors"
              >
                ABOUT
              </button>
              <button
                onClick={() => scrollToSection("how-to-buy")}
                className="font-bold text-black hover:text-gray-700 transition-colors"
              >
                HOW TO BUY
              </button>
              <button
                onClick={() => scrollToSection("memes")}
                className="font-bold text-black hover:text-gray-700 transition-colors"
              >
                MEMES
              </button>
              <button
                onClick={() => scrollToSection("tokenomics")}
                className="font-bold text-black hover:text-gray-700 transition-colors"
              >
                TOKENOMICS
              </button>
            </nav>
          </div>

          {/* Right side - Social and Buy Button */}
          <div className="flex items-center gap-3">
            <ShadowButton
              icon="https://memecook.fun/socials/twitter.png"
              iconAlt="Twitter"
              size="lg"
              className="hidden md:flex"
            />
            <ShadowButton
              icon="https://memecook.fun/socials/telegram.webp"
              iconAlt="Telegram"
              size="lg"
              className="hidden md:flex"
            />
            <ShadowButton
              variant="text"
              size="lg"
              className="text-black"
              onClick={() => scrollToSection("buy")}
            >
              BUY NOW
            </ShadowButton>
          </div>
        </div>
      </nav>
    </div>
  );
};
