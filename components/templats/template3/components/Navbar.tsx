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
    <div className="py-8 w-full">
      <nav className="max-w-4xl mx-auto relative">
        {/* Main navbar */}
        <div className="px-6 py-3 flex items-center justify-between relative z-10">
          {/* Left side - Logo and Project Name */}
          <div className="flex items-center gap-4">
            <div
              className="h-16 w-16 rounded-full overflow-hidden flex items-center justify-center transform transition-transform duration-200 hover:scale-110 relative"
              style={{
                border: `4px solid ${templateData.borderColor}`,
                boxShadow: `6px 6px 0 ${templateData.borderColor}`,
              }}
            >
              <DynamicImage
                src={file ? URL.createObjectURL(file) : templateData.logo}
                fallbackSrc="https://memecook.fun/assets/upload_image.jpeg"
                alt="Logo"
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
            <span
              className={`text-2xl font-bold ${headingFontClass} transform rotate-[-2deg] hover:rotate-2 transition-transform duration-300`}
              style={{
                color: templateData.headingColor,
                textShadow: `-2px -2px 0 ${templateData.textBorderColor}, 2px -2px 0 ${templateData.textBorderColor}, -2px 2px 0 ${templateData.textBorderColor}, 2px 2px 0 ${templateData.textBorderColor}, 4px 4px 0 ${templateData.borderColor}`,
              }}
            >
              {templateData.projectName}
            </span>
          </div>

          {/* Right side - Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="h-16 w-16 rounded-full overflow-hidden flex items-center justify-center hover:opacity-90 transition-all duration-200 transform hover:scale-110 relative"
              style={{
                border: `4px solid ${templateData.borderColor}`,
                boxShadow: `6px 6px 0 ${templateData.borderColor}`,
              }}
            >
              <Image
                src="https://memecook.fun/socials/twitter.png"
                alt="Twitter"
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </Link>
            <Link
              href="#"
              className="h-16 w-16 rounded-full overflow-hidden flex items-center justify-center hover:opacity-90 transition-all duration-200 transform hover:scale-110 relative"
              style={{
                border: `4px solid ${templateData.borderColor}`,
                boxShadow: `6px 6px 0 ${templateData.borderColor}`,
              }}
            >
              <Image
                src="https://memecook.fun/socials/telegram.webp"
                alt="Telegram"
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
