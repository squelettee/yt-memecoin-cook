"use client";

import { TemplateFormData } from "@/schemas/templateSchema";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { DynamicImage } from "@/components/ui/dynamic-image";
import Link from "next/link";
import Image from "next/image";

export const Hero = ({
  templateData,
  headingFontClass,
  file,
}: {
  templateData: TemplateFormData;
  headingFontClass: string;
  file?: File | null;
}) => {
  const { ticker } = templateData;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(templateData.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

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
  ].filter((link) => link.url);

  return (
    <section className="w-full min-h-screen py-12 px-4 relative overflow-hidden flex items-center">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Logo */}
          <div className="relative w-full aspect-square max-w-[500px] mx-auto">
            <div
              className="absolute rounded-full w-full h-full"
              style={{
                backgroundColor: templateData.borderColor,
                transform: "translate(8px, 8px)",
              }}
            />
            <div
              className="w-full h-full rounded-full overflow-hidden relative z-10"
              style={{ border: `4px solid ${templateData.borderColor}` }}
            >
              <DynamicImage
                src={
                  file ? URL.createObjectURL(file) : templateData.previewImage
                }
                alt="Project Logo"
                fallbackSrc="https://memecook.fun/assets/upload_image.jpeg"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex flex-col gap-6">
            {/* Ticker */}
            <h1
              className={`text-6xl md:text-7xl font-bold ${headingFontClass}`}
              style={{
                color: templateData.headingColor,
                textShadow: `-2px -2px 0 ${templateData.textBorderColor}, 
                             2px -2px 0 ${templateData.textBorderColor}, 
                             -2px 2px 0 ${templateData.textBorderColor}, 
                             2px 2px 0 ${templateData.textBorderColor}, 
                             4px 4px 0 ${templateData.borderColor}`,
              }}
            >
              {ticker?.slice(0, 10)}
            </h1>

            {/* Contract Address */}
            <div className="relative w-full">
              <div
                className="absolute rounded-xl w-full h-full"
                style={{
                  backgroundColor: templateData.borderColor,
                  transform: "translate(4px, 4px)",
                }}
              />
              <div
                className="rounded-xl px-4 py-3 flex items-center justify-between relative z-10"
                style={{
                  backgroundColor: templateData.backgroundColor,
                  border: `3px solid ${templateData.borderColor}`,
                }}
              >
                <span
                  className="font-mono text-sm truncate"
                  style={{ color: templateData.textColor }}
                >
                  {templateData.contractAddress}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="shrink-0 ml-2 p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
                  style={{
                    backgroundColor: templateData.accentColor,
                    color: templateData.textColor,
                  }}
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Separator */}
            <hr
              style={{
                borderColor: templateData.borderColor,
                borderWidth: "2px",
              }}
            />

            {/* Description */}
            <p className="text-lg" style={{ color: templateData.textColor }}>
              {templateData.description ||
                "Join us on this exciting journey! Get your tokens now and become part of our growing community."}
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.url}
                  target="_blank"
                  className="p-2 rounded-lg transform hover:scale-110 transition-all duration-200"
                  style={{
                    backgroundColor: templateData.backgroundColor,
                    border: `2px solid ${templateData.borderColor}`,
                  }}
                >
                  <Image
                    src={link.icon}
                    alt={link.alt}
                    width={24}
                    height={24}
                    className="rounded-full object-cover"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
