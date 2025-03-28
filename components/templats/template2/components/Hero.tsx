"use client";

import { TemplateFormData } from "@/schemas/templateSchema";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { ShadowButton } from "@/components/ui/shadow-button";

export const Hero = ({
  templateData,
  headingFontClass,
}: {
  templateData: TemplateFormData;
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
    <section className="w-full h-full flex-1 flex flex-col items-center justify-center p-4 relative">
      <div className="max-w-4xl w-full h-full mx-auto relative flex flex-col items-center gap-12">
        {/* Content */}
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="flex justify-center flex-col items-center gap-y-12 w-full">
            {/* Ticker with bouncy effect */}
            <div className="relative flex self-center group animate-bounce">
              <h1
                className={`text-5xl md:text-6xl lg:text-8xl font-bold relative z-10 ${headingFontClass} transform rotate-[-2deg] hover:rotate-2 transition-transform duration-300`}
                style={{
                  color: templateData.headingColor,
                  textShadow: `-2px -2px 0 ${templateData.textBorderColor}, 2px -2px 0 ${templateData.textBorderColor}, -2px 2px 0 ${templateData.textBorderColor}, 2px 2px 0 ${templateData.textBorderColor}, 4px 4px 0 ${templateData.borderColor}`,
                }}
              >
                {ticker?.slice(0, 10)}
              </h1>
            </div>

            {/* Contract Address Field */}
            <div className="relative group w-full max-w-2xl">
              <div
                className="absolute rounded-[30px] w-full h-full"
                style={{
                  backgroundColor: templateData.borderColor,
                  transform: "translate(6px, 6px)",
                }}
              />
              <div
                className="rounded-[30px] px-4 md:px-6 py-3 md:py-4 flex items-center justify-between relative z-10 transition-transform duration-300 hover:scale-105"
                style={{
                  backgroundColor: templateData.backgroundColor,
                  border: `4px solid ${templateData.borderColor}`,
                }}
              >
                <div className="flex flex-col min-w-0 flex-1 mr-2">
                  <span
                    className="font-mono text-sm md:text-lg truncate"
                    style={{ color: templateData.textColor }}
                  >
                    {templateData.contractAddress}
                  </span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="shrink-0 ml-2 md:ml-4 p-1.5 md:p-2 rounded-full transition-all duration-200 hover:scale-110"
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

            {/* Description */}
            <p
              className="text-center text-lg max-w-2xl px-4"
              style={{ color: templateData.textColor }}
            >
              {templateData.description ||
                "Join us on this exciting journey! Get your tokens now and become part of our growing community."}
            </p>

            {/* Buy Now Button */}
            <ShadowButton
              variant="text"
              size="lg"
              className="transform hover:scale-110 transition-transform duration-300 hover:-rotate-2"
              style={{
                backgroundColor: templateData.accentColor,
                color: templateData.headingColor,
                border: `4px solid ${templateData.borderColor}`,
                borderRadius: "30px",
                padding: "1.5rem 3rem",
                fontSize: "1.5rem",
                boxShadow: `8px 8px 0 ${templateData.borderColor}`,
              }}
            >
              BUY NOW
            </ShadowButton>
          </div>
        </div>
      </div>

      {/* SVG Filter for blob effect */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </section>
  );
};
