"use client";

import { TemplateFormData } from "@/schemas/templateSchema";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { HowToBuy } from "./components/HowToBuy";
import { Footer } from "./components/Footer";
import { DynamicImage } from "@/components/ui/dynamic-image";
import { useState, useEffect } from "react";
import Image from "next/image";

interface FontClassNames {
  dynapuffClass: string;
  cherryBombClass: string;
  spaceGroteskClass: string;
  gravitasOneClass: string;
  rubikBubbleClass: string;
  rammettoOneClass: string;
  bagelFontOneClass: string;
  notoSansClass: string;
}

const Template5 = ({
  templateData,
  fonts,
  files,
  subdomain,
}: {
  templateData: TemplateFormData;
  fonts: FontClassNames;
  files?: {
    logoFile: File | null;
    backgroundFile: File | null;
    previewImage: File | null;
  };
  subdomain?: string;
}) => {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Déterminer la classe de police pour les titres
  const headingFontClass = (() => {
    switch (templateData.headingFont) {
      case "dynapuff":
        return fonts.dynapuffClass;
      case "cherry-bomb":
        return fonts.cherryBombClass;
      case "gravitas-one":
        return fonts.gravitasOneClass;
      case "rubik-bubble":
        return fonts.rubikBubbleClass;
      case "rammetto-one":
        return fonts.rammettoOneClass;
      case "bagel-font-one":
        return fonts.bagelFontOneClass;
      case "noto-sans":
        return fonts.notoSansClass;
      default:
        return fonts.dynapuffClass;
    }
  })();

  // Déterminer la classe de police pour le corps du texte
  const bodyFontClass = (() => {
    switch (templateData.bodyFont) {
      case "dynapuff":
        return fonts.dynapuffClass;
      case "cherry-bomb":
        return fonts.cherryBombClass;
      case "space-grotesk":
        return fonts.spaceGroteskClass;
      case "gravitas-one":
        return fonts.gravitasOneClass;
      case "rubik-bubble":
        return fonts.rubikBubbleClass;
      case "rammetto-one":
        return fonts.rammettoOneClass;
      case "bagel-font-one":
        return fonts.bagelFontOneClass;
      case "noto-sans":
        return fonts.notoSansClass;
      default:
        return fonts.dynapuffClass;
    }
  })();

  return (
    <main
      className={`w-full min-h-screen relative font-bold ${bodyFontClass} bg-[#235FCC] overflow-hidden`}
    >
      <div className="flex flex-col h-screen">
        {/* Main Content Area */}
        <div className="flex-1 p-2 overflow-auto">
          {/* Windows XP Window */}
          <div className="h-full bg-[#ECE9D8] border-2 border-[#0055EA] rounded-lg shadow-xl overflow-hidden flex flex-col">
            {/* Window Title Bar */}
            <div className="bg-gradient-to-r from-[#0A246A] via-[#3A6EA5] to-[#0A246A] text-white p-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/winxp-ie.png"
                  alt="Internet Explorer"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <span className="text-sm font-semibold">
                  {templateData.ticker || "Token"} - Internet Explorer
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 flex items-center justify-center bg-gradient-to-b from-[#F1F3F6] to-[#CED2D9] rounded-sm border border-[#8592A9] text-[#000] text-xs font-bold">
                  ×
                </div>
              </div>
            </div>

            {/* Window Content */}
            <div className="flex-1 bg-white p-4 overflow-auto">
              <Navbar
                templateData={templateData}
                headingFontClass={headingFontClass}
                file={files?.logoFile}
              />
              <Hero
                templateData={templateData}
                headingFontClass={headingFontClass}
                file={files?.previewImage}
              />
              <HowToBuy templateData={templateData} />
              <Footer templateData={templateData} subdomain={subdomain} />
            </div>
          </div>
        </div>

        {/* Windows XP Taskbar */}
        <div className="h-10 bg-gradient-to-r from-[#1C57C3] via-[#5A93E5] to-[#1C57C3] border-t-2 border-[#0055EA] flex items-center px-2">
          {/* Start Button */}
          <button
            className="h-8 flex items-center gap-1 px-2 rounded-md bg-gradient-to-b from-[#3C8F3C] to-[#216F21] text-white font-bold border border-[#2D802D] hover:from-[#44A344] hover:to-[#2D802D]"
            onClick={() => setShowStartMenu(!showStartMenu)}
          >
            <Image
              src="/assets/winxp-start.png"
              alt="Start"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span>start</span>
          </button>

          {/* System Tray */}
          <div className="ml-auto h-8 flex items-center gap-2 px-2 bg-gradient-to-b from-[#A1C0F5] to-[#8FB1F1] rounded-md">
            <span className="text-xs text-[#00309C]">
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* Start Menu */}
        {showStartMenu && (
          <div className="absolute left-0 bottom-10 w-64 bg-[#ECE9D8] border-2 border-[#0055EA] rounded-tr-lg shadow-xl overflow-hidden">
            {/* User Banner */}
            <div className="h-16 bg-gradient-to-r from-[#1C57C3] via-[#5A93E5] to-[#1C57C3] flex items-center p-2">
              <div className="w-12 h-12 bg-white rounded-full overflow-hidden">
                <DynamicImage
                  src={
                    files?.logoFile
                      ? URL.createObjectURL(files.logoFile)
                      : templateData.logo
                  }
                  fallbackSrc="https://memecook.fun/assets/upload_image.jpeg"
                  alt="User"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <span className="text-white font-bold ml-2">
                {templateData.projectName || "User"}
              </span>
            </div>

            {/* Menu Items - Simplified */}
            <div className="p-2 flex flex-col">
              <div className="flex items-center gap-2 p-1 hover:bg-[#316AC5] hover:text-white cursor-pointer">
                <Image
                  src="/assets/winxp-ie.png"
                  alt="Internet Explorer"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <span>Internet Explorer</span>
              </div>
              <div className="flex items-center gap-2 p-1 hover:bg-[#316AC5] hover:text-white cursor-pointer">
                <Image
                  src="/socials/telegram.webp"
                  alt="Telegram"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <span>Telegram</span>
              </div>
              <div className="flex items-center gap-2 p-1 hover:bg-[#316AC5] hover:text-white cursor-pointer">
                <Image
                  src="/socials/twitter.png"
                  alt="Twitter"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <span>Twitter</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Windows XP Cursor */}
      <style jsx global>{`
        body {
          cursor: url("/assets/winxp-cursor.png"), auto;
        }
        a,
        button,
        .cursor-pointer {
          cursor: url("/assets/winxp-hand.png"), pointer;
        }
      `}</style>
    </main>
  );
};

export default Template5;
