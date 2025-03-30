"use client";

import { TemplateFormData } from "@/schemas/templateSchema";
import { DynamicImage } from "@/components/ui/dynamic-image";
import Image from "next/image";
import Link from "next/link";

export const Navbar = ({
  templateData,
  file,
  headingFontClass,
}: {
  templateData: TemplateFormData;
  file?: File | null;
  headingFontClass: string;
}) => {
  return (
    <div className="w-full border-b border-[#ACA899] mb-4">
      <nav className="max-w-4xl mx-auto relative">
        {/* Main navbar */}
        <div className="px-6 py-3 flex items-center justify-between relative z-10">
          {/* Left side - Logo and Project Name */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden flex items-center justify-center relative border-2 border-[#ACA899] bg-white p-1">
              <DynamicImage
                src={file ? URL.createObjectURL(file) : templateData.logo}
                fallbackSrc="https://memecook.fun/assets/upload_image.jpeg"
                alt="Logo"
                width={80}
                height={80}
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <span
                className={`text-2xl font-bold ${headingFontClass} block text-[#0055EA]`}
              >
                {templateData.projectName}
              </span>
              <span className="text-sm text-[#666]">
                Welcome to {templateData.ticker}
              </span>
            </div>
          </div>

          {/* Right side - Social Links */}
          <div className="flex items-center gap-2">
            <Link
              href={templateData.twitter || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 bg-[#ECE9D8] border border-[#ACA899] rounded hover:bg-[#F1EFE2]"
            >
              <Image
                src="https://memecook.fun/socials/twitter.png"
                alt="Twitter"
                width={16}
                height={16}
                className="object-contain"
              />
              <span className="text-xs">Twitter</span>
            </Link>
            <Link
              href={templateData.telegram || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 bg-[#ECE9D8] border border-[#ACA899] rounded hover:bg-[#F1EFE2]"
            >
              <Image
                src="https://memecook.fun/socials/telegram.webp"
                alt="Telegram"
                width={16}
                height={16}
                className="object-contain"
              />
              <span className="text-xs">Telegram</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
