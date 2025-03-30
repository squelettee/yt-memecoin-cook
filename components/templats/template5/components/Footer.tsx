import { TemplateFormData } from "@/schemas/templateSchema";
import Link from "next/link";
import Image from "next/image";

export const Footer = ({
  templateData,
  subdomain,
}: {
  templateData: TemplateFormData;
  subdomain?: string;
}) => {
  const socialLinks = [
    {
      icon: `/socials/twitter.png`,
      url: templateData.twitter,
      alt: "Twitter",
      name: "Twitter",
    },
    {
      icon: `/socials/telegram.webp`,
      url: templateData.telegram,
      alt: "Telegram",
      name: "Telegram",
    },
    {
      icon: `/socials/dex.jpeg`,
      url: templateData.dexscreener,
      alt: "DexScreener",
      name: "DexScreener",
    },
    {
      icon: `/socials/pump.jpeg`,
      url: templateData.pumpFun,
      alt: "PumpFun",
      name: "Pump.fun",
    },
    {
      icon: `/socials/jup.png`,
      url: templateData.jupiter,
      alt: "Jupiter",
      name: "Jupiter",
    },
  ].filter((link) => link.icon && link.url);

  return (
    <footer className="w-full p-4">
      <div className="max-w-4xl mx-auto">
        {/* Windows XP Style Window - Simplified */}
        <div className="border border-[#0055EA] rounded bg-[#ECE9D8] shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-[#0A246A] via-[#3A6EA5] to-[#0A246A] text-white p-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">
                {templateData.footerText}
              </span>
            </div>
          </div>

          <div className="p-4">
            {socialLinks.length > 0 && (
              <div className="border border-[#ACA899] bg-white p-3 rounded mb-4">
                <div className="grid grid-cols-3 gap-2">
                  {socialLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-1 hover:bg-[#ECE9D8] rounded"
                    >
                      <Image
                        src={link.icon}
                        alt={link.alt}
                        width={20}
                        height={20}
                        className="w-5 h-5 object-cover"
                      />
                      <span className="text-xs text-[#0055EA]">
                        {link.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center text-xs text-[#666]">
              <p>
                © 2025 {subdomain}.memecook.fun | Made with{" "}
                <Link href="https://memecook.fun" className="text-[#0055EA]">
                  Memecook
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
