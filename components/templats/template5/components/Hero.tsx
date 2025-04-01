"use client";

import { TemplateFormData } from "@/schemas/templateSchema";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { DynamicImage } from "@/components/ui/dynamic-image";
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

  return (
    <section className="w-full p-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Windows XP Style Alert Box - Simplified */}
        <div className="mb-8 border border-[#0055EA] rounded bg-[#ECE9D8] shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-[#0A246A] via-[#3A6EA5] to-[#0A246A] text-white p-1 flex items-center">
            <Image
              src="/assets/winxp-info.png"
              alt="Info"
              width={24}
              height={24}
              className="w-8 h-8 mr-2"
            />
            <span className="text-sm font-semibold">DESCRIPTION</span>
          </div>
          <div className="p-4">
            <p className="text-sm">
              {templateData.description ||
                "Join us on this exciting journey! Get your tokens now and become part of our growing community."}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-1 gap-6">
          {/* Left side - Token Info - Simplified */}
          <div className="border border-[#ACA899] rounded bg-white p-4">
            <h2
              className={`text-xl font-bold ${headingFontClass} text-[#0055EA] mb-4`}
            >
              {ticker} Token
            </h2>

            {/* Token Image */}
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 border border-[#ACA899] bg-[#F1EFE2] p-1">
                <DynamicImage
                  src={
                    file ? URL.createObjectURL(file) : templateData.imagePreview
                  }
                  fallbackSrc="https://memecook.fun/assets/upload_image.jpeg"
                  alt="Token"
                  width={88}
                  height={88}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Contract Address */}
            <div className="mb-4">
              <div className="text-xs font-bold mb-1">Contract Address:</div>
              <div className="flex">
                <input
                  type="text"
                  readOnly
                  value={templateData.contractAddress}
                  className="flex-1 bg-white border border-[#7F9DB9] px-2 py-1 text-xs"
                />
                <button
                  onClick={copyToClipboard}
                  className="ml-2 p-1 bg-[#ECE9D8] border border-[#ACA899] rounded hover:bg-[#F1EFE2]"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
