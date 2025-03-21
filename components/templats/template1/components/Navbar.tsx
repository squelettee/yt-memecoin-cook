"use client";

import Image from "next/image";
import Link from "next/link";
import { TemplateFormData } from "@/schemas/templateSchema";

export const Navbar = ({
  templateData,
}: {
  templateData: TemplateFormData;
}) => {
  return (
    <div className="w-full py-4 px-4">
      <nav className="max-w-7xl mx-auto relative">
        {/* Black shadow div positioned behind and offset */}
        <div className="absolute bg-black rounded-full w-full h-full top-[5px] right-[-5px]"></div>

        {/* Main navbar */}
        <div className="bg-white rounded-full border border-black border-solid px-6 py-3 flex items-center justify-between relative z-10">
          {/* Left side - Logo and Nav Links */}
          <div className="flex items-center gap-8">
            <div className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center border border-black border-solid">
              <Image
                src={
                  templateData.logoUrl ||
                  "https://memecook.fun/assets/upload_image.jpeg"
                }
                alt="Bear Logo"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="#about"
                className="font-bold text-black hover:text-gray-700 transition-colors"
              >
                ABOUT
              </Link>
              <Link
                href="#how-to-buy"
                className="font-bold text-black hover:text-gray-700 transition-colors"
              >
                HOW TO BUY
              </Link>
              <Link
                href="#memes"
                className="font-bold text-black hover:text-gray-700 transition-colors"
              >
                MEMES
              </Link>
              <Link
                href="#tokenomics"
                className="font-bold text-black hover:text-gray-700 transition-colors"
              >
                TOKENOMICS
              </Link>
            </nav>
          </div>

          {/* Right side - Social and Buy Button */}
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute bg-black rounded-full w-full h-full top-[2px] right-[-2px] transition-all group-hover:top-[1px] group-hover:right-[-1px]"></div>
              <button className="h-10 w-10 rounded-full hidden md:flex border border-black border-solid bg-white items-center justify-center hover:bg-gray-100 transition-all relative z-10 group-hover:translate-x-[1px] group-hover:translate-y-[1px]">
                <Image
                  src="https://memecook.fun/social/twitter.png"
                  alt="X"
                  width={18}
                  height={18}
                />
              </button>
            </div>
            <div className="relative group">
              <div className="absolute bg-black rounded-full w-full h-full top-[2px] right-[-2px] transition-all group-hover:top-[1px] group-hover:right-[-1px]"></div>
              <button className="h-10 w-10 rounded-full hidden md:flex border border-black border-solid bg-white items-center justify-center hover:bg-gray-100 transition-all relative z-10 group-hover:translate-x-[1px] group-hover:translate-y-[1px]">
                <Image
                  src="https://memecook.fun/social/telegram.webp"
                  alt="Telegram"
                  width={18}
                  height={18}
                />
              </button>
            </div>
            <div className="relative group">
              <div className="absolute bg-black rounded-full w-full h-full top-[2px] right-[-2px] transition-all group-hover:top-[1px] group-hover:right-[-1px]"></div>
              <Link
                href="#buy"
                className="bg-pink-500 border border-black border-solid text-white font-bold px-6 py-2 rounded-full hover:bg-pink-600 transition-all relative z-10 inline-block group-hover:translate-x-[1px] group-hover:translate-y-[1px]"
              >
                BUY NOW
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
