import { TemplateFormData } from "@/schemas/templateSchema";
import { ShadowButton } from "@/components/ui/shadow-button";
import Link from "next/link";

export const Footer = ({
  templateData,
  subdomain,
}: {
  templateData: TemplateFormData;
  subdomain?: string;
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
    <footer
      className="w-full py-10"
      style={{ backgroundColor: templateData.primaryColor }}
    >
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-8">
        <h2
          className="text-5xl font-bold text-center"
          style={{ color: templateData.headingColor }}
        >
          {templateData.footerText}
        </h2>
        <div className="flex flex-col items-center gap-6">
          {socialLinks.length > 0 && (
            <div className="flex items-center justify-center gap-2 flex-wrap">
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
          )}
        </div>
      </div>
      <div className="px-6 flex flex-col justify-center items-center">
        <span className="font-bold text-sm text-gray-500 mr-2">
          © 2025 {subdomain}.memecook.fun. All rights reserved.
        </span>
        <span className="font-bold mt-2 text-sm text-gray-500">
          Made with{" "}
          <Link
            href="https://memecook.fun"
            target="_blank"
            rel="noopener noreferrer"
          >
            Memecook
          </Link>
        </span>
      </div>
    </footer>
  );
};
