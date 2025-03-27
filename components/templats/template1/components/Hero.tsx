"use client";

import { TemplateFormData } from "@/schemas/templateSchema";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { DynamicImage } from "@/components/ui/dynamic-image";
import { ShadowButton } from "@/components/ui/shadow-button";

export const Hero = ({
  templateData,
  file,
  headingFontClass,
}: {
  templateData: TemplateFormData;
  file?: File | null;
  headingFontClass: string;
}) => {
  const { ticker } = templateData;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(templateData.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <section
      className="w-full h-full flex-1 flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: templateData.primaryColor }}
    >
      <div className="max-w-4xl w-full h-full mx-auto relative flex flex-col lg:flex-row justify-around items-center gap-8">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center">
          <div className="flex justify-center flex-col items-center gap-y-8 w-full">
            {/* Ticker with shadow effect */}
            <div className="relative flex self-center">
              <h1
                className={`text-5xl md:text-6xl lg:text-8xl font-bold relative z-10 ${headingFontClass}`}
                style={{
                  color: templateData.headingColor,
                  textShadow: `-1px -1px 0 ${templateData.textBorderColor}, 1px -1px 0 ${templateData.textBorderColor}, -1px 1px 0 ${templateData.textBorderColor}, 1px 1px 0 ${templateData.textBorderColor}`,
                }}
              >
                {ticker?.slice(0, 10)}
              </h1>
              <h1
                className={`text-5xl md:text-6xl lg:text-8xl font-bold absolute top-[5px] md:top-[8px] lg:top-[10px] right-[-5px] md:right-[-8px] lg:right-[-10px] ${headingFontClass}`}
                style={{
                  color: templateData.borderColor,
                }}
              >
                {ticker?.slice(0, 10)}
              </h1>
            </div>

            {/* Contract Address Field */}
            <div className="relative group w-full max-w-2xl">
              <div
                className="absolute rounded-full w-full h-full top-[5px] right-[-5px]"
                style={{ backgroundColor: templateData.borderColor }}
              ></div>
              <div
                className="rounded-full border  border-solid px-4 md:px-6 py-3 md:py-4 flex items-center justify-between relative z-10"
                style={{
                  borderColor: templateData.borderColor,
                  backgroundColor: templateData.backgroundColor,
                }}
              >
                <div className="flex flex-col min-w-0 flex-1 mr-2">
                  <span
                    className={`font-mono text-sm md:text-lg truncate`}
                    style={{ color: templateData.textColor }}
                  >
                    {templateData.contractAddress}
                  </span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className={`shrink-0 ml-2 md:ml-4 p-1.5 md:p-2 rounded-full transition-all duration-200 ${copied ? "bg-green-100 text-green-800" : "hover:bg-gray-100"}`}
                  style={{
                    backgroundColor: templateData.accentColor,
                    color: templateData.textColor,
                  }}
                >
                  {copied ? (
                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <Copy className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Buy Now Button */}
            <ShadowButton
              variant="text"
              size="lg"
              className="hover:opacity-90"
              style={{
                backgroundColor: templateData.accentColor,
                color: templateData.headingColor,
              }}
            >
              BUY NOW
            </ShadowButton>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
          <div className="relative w-full aspect-square flex items-center justify-center">
            <DynamicImage
              src={file ? URL.createObjectURL(file) : templateData.previewImage}
              alt="Project Logo"
              fallbackSrc="https://memecook.fun/assets/upload_image.jpeg"
              fill
              className="object-contain rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
