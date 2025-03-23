"use client"

import { TemplateFormData } from "@/schemas/templateSchema";
import { ShadowButton } from "@/components/ui/shadow-button";
import { DynamicImage } from "@/components/ui/dynamic-image";

export const Navbar = ({
  templateData,
}: {
  templateData: TemplateFormData;
}) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full py-8 px-4 bg-cyan-300">
      <nav className="max-w-7xl mx-auto relative">
        {/* Black shadow div positioned behind and offset */}
        <div className="absolute bg-black rounded-full w-full h-full top-[5px] right-[-5px]"></div>

        {/* Main navbar */}
        <div className="bg-white rounded-full border border-black border-solid px-6 py-3 flex items-center justify-between relative z-10">
          {/* Left side - Logo and Nav Links */}
          <div className="flex items-center gap-8">
            <div className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center border border-black border-solid">
              <DynamicImage
                src={templateData.logo}
                file={templateData.logoFile}
                fallbackSrc="https://memecook.fun/assets/upload_image.jpeg"
                alt="Logo"
                width={100}
                height={100}
                className="h-full w-full"
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
                onClick={() => scrollToSection("roadmap")}
                className="font-bold text-black hover:text-gray-700 transition-colors"
              >
                ROADMAP
              </button>
              <button
                onClick={() => scrollToSection("how-to-buy")}
                className="font-bold text-black hover:text-gray-700 transition-colors"
              >
                HOW TO BUY
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="font-bold text-black hover:text-gray-700 transition-colors"
              >
                FAQ
              </button>
            </nav>
          </div>

          {/* Right side - Social and Buy Button */}
          <div className="flex items-center gap-3">
            <ShadowButton
              icon="https://memecook.fun/socials/twitter.png"
              iconAlt="Twitter"
              size="md"
              className="hidden md:flex"
            />
            <ShadowButton
              icon="https://memecook.fun/socials/telegram.webp"
              iconAlt="Telegram"
              size="md"
              className="hidden md:flex"
            />
            <ShadowButton
              variant="text"
              size="md"
              className="text-white bg-pink-500 hover:bg-pink-600"
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
