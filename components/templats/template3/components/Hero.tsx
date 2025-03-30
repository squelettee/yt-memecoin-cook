"use client";

import { TemplateFormData } from "@/schemas/templateSchema";
import { Copy, Check, Rocket, ArrowDown } from "lucide-react";
import { useState } from "react";
import { ShadowButton } from "@/components/ui/shadow-button";
import Image from "next/image";
import { DynamicImage } from "@/components/ui/dynamic-image";

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

  return (
    <section className="w-full py-12 px-4 relative overflow-hidden">
      {/* Main content */}
      <div className="max-w-6xl mx-auto">
        {/* Ticker explosion */}
        <div className="flex flex-col items-center justify-center mb-12 relative">
          <div className={`relative transition-all duration-500`}>
            <div className="absolute inset-0 rounded-full  opacity-50" />
            <h1
              className={`text-6xl md:text-8xl lg:text-9xl font-bold ${headingFontClass} transform -rotate-3 hover:rotate-3 transition-transform duration-300`}
              style={{
                color: templateData.headingColor,
                textShadow: `-4px -4px 0 ${templateData.textBorderColor}, 
                             4px -4px 0 ${templateData.textBorderColor}, 
                             -4px 4px 0 ${templateData.textBorderColor}, 
                             4px 4px 0 ${templateData.textBorderColor}, 
                             8px 8px 0 ${templateData.borderColor}`,
              }}
            >
              {ticker?.slice(0, 10)}
            </h1>
          </div>
        </div>

        {/* Description card */}
        <div className="relative max-w-3xl mx-auto mb-12 transform hover:scale-105 transition-all duration-300">
          <div
            className="absolute rounded-[30px] w-full h-full"
            style={{
              backgroundColor: templateData.borderColor,
              transform: "translate(8px, 8px)",
            }}
          />
          <div
            className="rounded-[30px] p-6 md:p-8 relative z-10"
            style={{
              backgroundColor: templateData.backgroundColor,
              border: `4px solid ${templateData.borderColor}`,
            }}
          >
            <p
              className="text-xl md:text-2xl text-center font-bold"
              style={{ color: templateData.textColor }}
            >
              {templateData.description ||
                "Join us on this exciting journey! Get your tokens now and become part of our growing community."}
            </p>
          </div>
        </div>

        {/* Contract and action section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Contract and logo */}
          <div className="flex flex-col items-center gap-6 order-2 md:order-1">
            {/* Contract Address Field */}
            <div className="relative w-full max-w-md">
              <div
                className="absolute rounded-[30px] w-full h-full"
                style={{
                  backgroundColor: templateData.borderColor,
                  transform: "translate(6px, 6px)",
                }}
              />
              <div
                className="rounded-[30px] px-4 md:px-6 py-4 flex items-center justify-between relative z-10 transition-transform duration-300 hover:scale-105"
                style={{
                  backgroundColor: templateData.backgroundColor,
                  border: `4px solid ${templateData.borderColor}`,
                }}
              >
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono text-sm md:text-base truncate"
                      style={{ color: templateData.textColor }}
                    >
                      {templateData.contractAddress}
                    </span>
                    <button
                      onClick={copyToClipboard}
                      className="shrink-0 ml-2 p-2 rounded-full transition-all duration-200 hover:scale-110"
                      style={{
                        backgroundColor: templateData.accentColor,
                        color: templateData.textColor,
                      }}
                    >
                      {copied ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo/Image */}
            <div className="relative w-40 h-40 md:w-56 md:h-56">
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
          </div>

          {/* Right side - Buy now section */}
          <div className="flex flex-col items-center gap-6 order-1 md:order-2">
            <div
              className="relative py-6 px-8 rounded-[20px] transform hover:scale-105 transition-all duration-300 w-full max-w-md"
              style={{
                backgroundColor: templateData.primaryColor,
                border: `4px solid ${templateData.borderColor}`,
                boxShadow: `8px 8px 0 ${templateData.borderColor}`,
              }}
            >
              <div className="flex flex-col items-center gap-4">
                <h3
                  className={`text-2xl md:text-3xl font-bold ${headingFontClass}`}
                  style={{ color: templateData.headingColor }}
                >
                  GET {ticker} NOW!
                </h3>

                <ShadowButton
                  variant="text"
                  size="lg"
                  className={`w-full transform hover:scale-105 transition-transform duration-300 ${headingFontClass} flex items-center justify-center gap-2`}
                  style={{
                    backgroundColor: templateData.accentColor,
                    color: templateData.headingColor,
                    border: `4px solid ${templateData.borderColor}`,
                    borderRadius: "16px",
                    padding: "1.25rem",
                    fontSize: "1.5rem",
                    boxShadow: `6px 6px 0 ${templateData.borderColor}`,
                  }}
                >
                  <Rocket className="w-6 h-6" />
                  BUY NOW
                </ShadowButton>

                <div className="flex items-center justify-center w-full mt-2">
                  <ArrowDown
                    className="w-8 h-8 animate-bounce"
                    style={{ color: templateData.headingColor }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 w-full">
                  {["DEX", "PUMP", "JUP"].map((platform, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-1 p-2 rounded-lg transform hover:scale-110 transition-all duration-200"
                      style={{
                        backgroundColor: templateData.backgroundColor,
                        border: `2px solid ${templateData.borderColor}`,
                      }}
                    >
                      <span
                        className="text-xs font-bold"
                        style={{ color: templateData.textColor }}
                      >
                        {platform}
                      </span>
                      <div className="w-8 h-8 relative">
                        <Image
                          src={`https://memecook.fun/socials/${platform.toLowerCase() === "dex" ? "dex.jpeg" : platform.toLowerCase() === "pump" ? "pump.jpeg" : "jup.png"}`}
                          alt={platform}
                          width={32}
                          height={32}
                          className="rounded-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
