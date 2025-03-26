import { TemplateFormData } from "@/schemas/templateSchema";
import { ShadowButton } from "@/components/ui/shadow-button";
import Link from "next/link";

export const Footer = ({
  templateData,
}: {
  templateData: TemplateFormData;
}) => {
  const socialLinks = [
    { icon: templateData.twitter, url: templateData.twitter, alt: "Twitter" },
    {
      icon: templateData.telegram,
      url: templateData.telegram,
      alt: "Telegram",
    },
    { icon: templateData.tiktok, url: templateData.tiktok, alt: "TikTok" },
    {
      icon: templateData.instagram,
      url: templateData.instagram,
      alt: "Instagram",
    },
    { icon: templateData.birdeye, url: templateData.birdeye, alt: "Birdeye" },
    {
      icon: templateData.coinGecko,
      url: templateData.coinGecko,
      alt: "CoinGecko",
    },
    {
      icon: templateData.coinMarketCap,
      url: templateData.coinMarketCap,
      alt: "CoinMarketCap",
    },
    {
      icon: templateData.dexscreener,
      url: templateData.dexscreener,
      alt: "DexScreener",
    },
    {
      icon: templateData.dextools,
      url: templateData.dextools,
      alt: "DexTools",
    },
    { icon: templateData.pumpFun, url: templateData.pumpFun, alt: "PumpFun" },
    {
      icon: templateData.whitepaper,
      url: templateData.whitepaper,
      alt: "Whitepaper",
    },
  ].filter((link) => link.icon && link.url);

  return (
    <footer className="w-full bg-cyan-300 py-10">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-8">
        <h2 className="text-5xl font-bold text-center">
          {templateData.footerText || "Join our community"}
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
      <div className="px-6 flex justify-center items-center">
        <span className="font-bold text-sm text-gray-500">
          Made with <Link href="https://memecook.fun" target="_blank" rel="noopener noreferrer">Memecook</Link>
        </span>
      </div>
    </footer>
  );
};
