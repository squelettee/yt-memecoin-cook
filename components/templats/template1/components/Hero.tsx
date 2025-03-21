"use client";

import { TemplateFormData } from "@/schemas/templateSchema";
import { ShadowButton } from "@/components/ui/shadow-button";
import { Copy, Check } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export const Hero = ({ templateData }: { templateData: TemplateFormData }) => {
  const { projectName, ticker } = templateData;
  const contractAddress = "63LfDmNb3MQ8mw9MtZ2To9bEA2M71kZUUGq5tiJxcqj9";
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
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
    <section className="w-full h-full flex-1 flex flex-col items-center justify-center p-4">
      <div className="max-w-7xl w-full h-full mx-auto relative flex flex-col lg:flex-row justify-around gap-8">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 h-full flex flex-col items-center">
          <div className="flex justify-center flex-col items-center gap-y-8 w-full h-full">
            {/* Ticker with shadow effect */}
            <div className="relative flex self-center lg:self-start">
              <h1 className="text-5xl md:text-6xl lg:text-8xl text-white font-bold relative z-10">
                {ticker}
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-8xl text-black font-bold absolute top-[5px] md:top-[8px] lg:top-[10px] right-[-5px] md:right-[-8px] lg:right-[-10px]">
                {ticker}
              </h1>
            </div>

            {/* Contract Address Field - Mise à jour */}
            <div className="relative group w-full max-w-2xl">
              <div className="absolute bg-black rounded-full w-full h-full top-[5px] right-[-5px]"></div>
              <div className="bg-white rounded-full border border-black border-solid px-4 md:px-6 py-3 md:py-4 flex items-center justify-between relative z-10">
                <div className="flex flex-col min-w-0 flex-1 mr-2">
                  <span className="font-mono text-sm md:text-lg truncate">
                    {contractAddress}
                  </span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className={`shrink-0 ml-2 md:ml-4 p-1.5 md:p-2 rounded-full transition-all duration-200 ${copied ? "bg-green-100 text-green-800" : "hover:bg-gray-100"
                    }`}
                >
                  {copied ? (
                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <Copy className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-3 md:gap-4 lg:gap-6 w-full flex-wrap justify-center lg:justify-start">
              <ShadowButton
                icon="https://memecook.fun/socials/twitter.png"
                iconAlt="Twitter"
                size="2xl"
                className="md:hidden lg:flex"
              />
              <ShadowButton
                icon="https://memecook.fun/socials/telegram.webp"
                iconAlt="Telegram"
                size="2xl"
                className="md:hidden lg:flex"
              />
              {templateData.dexscreener && (
                <ShadowButton
                  icon="https://memecook.fun/socials/dex.jpeg"
                  iconAlt="Dexscreener"
                  size="2xl"
                  className="md:hidden lg:flex"
                />
              )}
              {templateData.jupiter && (
                <ShadowButton
                  icon="https://memecook.fun/socials/jup.png"
                  iconAlt="Jupiter"
                  size="2xl"
                  className="md:hidden lg:flex"
                />
              )}
              {templateData.instagram && (
                <ShadowButton
                  icon="https://memecook.fun/socials/insta.png"
                  iconAlt="Instagram"
                  size="2xl"
                  className="md:hidden lg:flex"
                />
              )}
              {templateData.tiktok && (
                <ShadowButton
                  icon="https://memecook.fun/socials/tiktok.png"
                  iconAlt="TikTok"
                  size="2xl"
                  className="md:hidden lg:flex"
                />
              )}
              {templateData.whitepaper && (
                <ShadowButton
                  icon="https://memecook.fun/socials/whitepaper.png"
                  iconAlt="Whitepaper"
                  size="2xl"
                  className="md:hidden lg:flex"
                />
              )}
              {templateData.marketcap && (
                <ShadowButton
                  icon="https://memecook.fun/socials/marketcap.png"
                  iconAlt="Marketcap"
                  size="2xl"
                  className="md:hidden lg:flex"
                />
              )}
              {templateData.dextools && (
                <ShadowButton
                  icon="https://memecook.fun/socials/dextools.png"
                  iconAlt="Dextools"
                  size="2xl"
                  className="md:hidden lg:flex"
                />
              )}
              {templateData.birdeye && (
                <ShadowButton
                  icon="https://memecook.fun/socials/birdeye.jpeg"
                  iconAlt="Birdeye"
                  size="2xl"
                  className="md:hidden lg:flex"
                />
              )}
              {templateData.pump && (
                <ShadowButton
                  icon="https://memecook.fun/socials/pump.jpeg"
                  iconAlt="Pump"
                  size="2xl"
                  className="md:hidden lg:flex"
                />
              )}
              {templateData.coingecko && (
                <ShadowButton
                  icon="https://memecook.fun/socials/coingecko.png"
                  iconAlt="Coingecko"
                  size="2xl"
                  className="md:hidden lg:flex"
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-around relative">
          <div className="flex flex-col items-center justify-center gap-y-4 md:gap-y-8">
            <Image
              src={logoUrl}
              alt="illustration"
              width={200}
              height={200}
              className="rounded-xl w-48 h-48 md:w-64 md:h-64 lg:w-[300px] lg:h-[300px]"
            />

            {/* Main content box */}
            <div className="relative w-full">
              <div className="absolute bg-black rounded-xl w-full h-full top-[5px] right-[-5px]"></div>
              <div className="bg-white rounded-xl border border-black border-solid p-4 md:p-6 lg:p-8 w-full h-full flex flex-col items-center justify-start relative z-10">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-3 md:mb-4 lg:mb-6">
                  {projectName}
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-black text-center">
                  {templateData.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
