"use client";

import { DynamicImage } from "@/components/ui/dynamic-image";
import { ShadowButton } from "@/components/ui/shadow-button";
import Link from "next/link";
import { TemplateFormData } from "@/schemas/templateSchema";

export const About = ({
  templateData,
  file,
  headingFontClass,
}: {
  templateData: TemplateFormData;
  file?: File | null;
  headingFontClass: string;
}) => {
  const socialLinks = [
    {
      icon: `${process.env.NEXT_PUBLIC_API_URL}/socials/twitter.png`,
      url: templateData.twitter,
      alt: "Twitter",
    },
    {
      icon: `${process.env.NEXT_PUBLIC_API_URL}/socials/telegram.webp`,
      url: templateData.telegram,
      alt: "Telegram",
    },
    {
      icon: `${process.env.NEXT_PUBLIC_API_URL}/socials/dex.jpeg`,
      url: templateData.dexscreener,
      alt: "DexScreener",
    },
    {
      icon: `${process.env.NEXT_PUBLIC_API_URL}/socials/pump.jpeg`,
      url: templateData.pumpFun,
      alt: "PumpFun",
    },
    {
      icon: `${process.env.NEXT_PUBLIC_API_URL}/socials/jup.png`,
      url: templateData.jupiter,
      alt: "Jupiter",
    },
  ].filter((link) => link.icon && link.url);

  return (
    <section
      id="about"
      className={`w-full px-4 py-12`}
      style={{ backgroundColor: templateData.secondaryColor }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative flex justify-center mb-12">
          <div className="relative">
            <h2
              className={`text-4xl md:text-5xl lg:text-7xl font-bold relative z-10 ${headingFontClass}`}
              style={{
                color: templateData.headingColor,
                textShadow: `-1px -1px 0 ${templateData.textBorderColor}, 1px -1px 0 ${templateData.textBorderColor}, -1px 1px 0 ${templateData.textBorderColor}, 1px 1px 0 ${templateData.textBorderColor}`,
              }}
            >
              {templateData.aboutTitle}
            </h2>
            <h2
              className={`text-4xl md:text-5xl lg:text-7xl font-bold absolute top-[2px] md:top-[3px] lg:top-[4px] right-[-2px] md:right-[-3px] lg:right-[-4px] ${headingFontClass}`}
              style={{
                color: templateData.borderColor,
              }}
            >
              {templateData.aboutTitle}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Image */}
          <div className="rounded-xl p-6">
            <DynamicImage
              src={file ? URL.createObjectURL(file) : templateData.aboutImage}
              fallbackSrc={"https://memecook.fun/assets/upload_image.jpeg"}
              alt="About Image"
              width={500}
              height={500}
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Right side - Text */}
          <div className="rounded-xl p-6 flex items-center justify-center">
            <p
              className="font-bold text-lg break-words w-full max-w-full overflow-hidden"
              style={{ color: templateData.textColor }}
            >
              {templateData.aboutContent}
            </p>
          </div>
        </div>

        {/* Social links section in a separate div below */}
        {socialLinks.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ShadowButton
                    icon={link.icon}
                    iconAlt={link.alt}
                    size="2xl"
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
