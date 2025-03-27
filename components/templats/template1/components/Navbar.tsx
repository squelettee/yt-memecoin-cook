"use client";

import { TemplateFormData } from "@/schemas/templateSchema";
import { ShadowButton } from "@/components/ui/shadow-button";
import { DynamicImage } from "@/components/ui/dynamic-image";

export const Navbar = ({
  templateData,
  file,
}: {
  templateData: TemplateFormData;
  file?: File | null;
}) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="py-8 px-4 w-full"
      style={{ backgroundColor: templateData.primaryColor }}
    >
      <nav className="max-w-4xl mx-auto relative">
        {/* Black shadow div positioned behind and offset */}
        <div
          className="absolute bg-black rounded-full w-full h-full top-[5px] right-[-5px]"
          style={{ backgroundColor: templateData.borderColor }}
        ></div>

        {/* Main navbar */}
        <div
          className="rounded-full border border-solid px-6 py-3 flex items-center justify-between relative z-10"
          style={{
            borderColor: templateData.borderColor,
            backgroundColor: templateData.backgroundColor,
          }}
        >
          {/* Left side - Logo and Nav Links */}
          <div className="flex items-center gap-8">
            <div className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center border border-black border-solid">
              <DynamicImage
                src={file ? URL.createObjectURL(file) : templateData.logo}
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
                style={{ color: templateData.textColor }}
              >
                ABOUT
              </button>
              {templateData.roadmapEnable && (
                <button
                  onClick={() => scrollToSection("roadmap")}
                  className="font-bold text-black hover:text-gray-700 transition-colors"
                  style={{ color: templateData.textColor }}
                >
                  ROADMAP
                </button>
              )}
              <button
                onClick={() => scrollToSection("how-to-buy")}
                className="font-bold text-black hover:text-gray-700 transition-colors"
                style={{ color: templateData.textColor }}
              >
                HOW TO BUY
              </button>
              {templateData.faqEnable && (
                <button
                  onClick={() => scrollToSection("faq")}
                  className="font-bold text-black hover:text-gray-700 transition-colors"
                  style={{ color: templateData.textColor }}
                >
                  FAQ
                </button>
              )}
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
              className="hover:opacity-90 transition-colors"
              style={{
                backgroundColor: templateData.accentColor,
                color: templateData.headingColor,
              }}
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
