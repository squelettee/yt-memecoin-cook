import { TemplateFormData } from "@/schemas/templateSchema";
import { ShadowButton } from "@/components/ui/shadow-button";
import Link from "next/link";

export const Footer = ({
  templateData,
  subdomain,
  headingFontClass,
}: {
  templateData: TemplateFormData;
  subdomain?: string;
  headingFontClass: string;
}) => {
  const socialLinks = [
    {
      icon: `https://memecook.fun/socials/twitter.png`,
      url: templateData.twitter,
      alt: "Twitter",
    },
    {
      icon: `https://memecook.fun/socials/telegram.webp`,
      url: templateData.telegram,
      alt: "Telegram",
    },
    {
      icon: `https://memecook.fun/socials/dex.jpeg`,
      url: templateData.dexscreener,
      alt: "DexScreener",
    },
    {
      icon: `https://memecook.fun/socials/pump.jpeg`,
      url: templateData.pumpFun,
      alt: "PumpFun",
    },
    {
      icon: `https://memecook.fun/socials/jup.png`,
      url: templateData.jupiter,
      alt: "Jupiter",
    },
  ].filter((link) => link.icon && link.url);

  return (
    <footer className="w-full py-10">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-8">
        <div className="relative group">
          <h2
            className={`text-5xl font-bold text-center ${headingFontClass} transform rotate-[-2deg] hover:rotate-2 transition-transform duration-300`}
            style={{
              color: templateData.headingColor,
              textShadow: `-2px -2px 0 ${templateData.textBorderColor}, 2px -2px 0 ${templateData.textBorderColor}, -2px 2px 0 ${templateData.textBorderColor}, 2px 2px 0 ${templateData.textBorderColor}, 4px 4px 0 ${templateData.borderColor}`,
            }}
          >
            {templateData.footerText}
          </h2>
        </div>
        <div className="flex flex-col items-center gap-6">
          {socialLinks.length > 0 && (
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 hover:-rotate-3 transition-all duration-300"
                >
                  <div className="relative">
                    <div
                      className="absolute rounded-full w-full h-full"
                      style={{
                        backgroundColor: templateData.borderColor,
                        transform: "translate(4px, 4px)",
                      }}
                    />
                    <ShadowButton
                      icon={link.icon}
                      iconAlt={link.alt}
                      size="2xl"
                      style={{
                        border: `4px solid ${templateData.borderColor}`,
                        backgroundColor: templateData.backgroundColor,
                        position: "relative",
                        zIndex: 10,
                      }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        className="px-6 flex flex-col justify-center items-center"
        style={{ color: templateData.textColor }}
      >
        <span className="font-bold text-center text-sm mr-2 transform hover:scale-105 transition-transform duration-200">
          © 2025 {subdomain}.memecook.fun. All rights reserved.
        </span>
        <span className="font-bold text-center mt-2 text-sm">
          Made with{" "}
          <Link
            href="https://memecook.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-wavy decoration-2 hover:text-opacity-80 transition-all duration-200"
          >
            Memecook
          </Link>
        </span>
      </div>
    </footer>
  );
};
