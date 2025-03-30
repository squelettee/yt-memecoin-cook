"use client";

import { TemplateFormData } from "@/schemas/templateSchema";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { HowToBuy } from "./components/HowToBuy";
import { Footer } from "./components/Footer";
import { DynamicImage } from "@/components/ui/dynamic-image";
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

const Template2 = ({
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
    <main className={`w-full min-h-screen relative font-bold ${bodyFontClass}`}>
      <div
        className="flex flex-col items-center w-full "
        style={{ backgroundColor: templateData.primaryColor }}
      >
        {files?.previewImage && (
          <DynamicImage
            src={URL.createObjectURL(files.previewImage)}
            fallbackSrc={"https://memecook.fun/assets/illustration.avif"}
            alt="Preview"
            fill
            className="object-cover"
          />
        )}
        <Navbar
          templateData={templateData}
          headingFontClass={headingFontClass}
          file={files?.logoFile}
        />
        <Hero templateData={templateData} headingFontClass={headingFontClass} />
        <HowToBuy
          templateData={templateData}
          headingFontClass={headingFontClass}
        />
        <Footer
          templateData={templateData}
          headingFontClass={headingFontClass}
          subdomain={subdomain}
        />
      </div>
    </main>
  );
};

export default Template2;
