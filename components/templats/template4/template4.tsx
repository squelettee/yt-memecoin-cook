"use client";

import { TemplateFormData } from "@/schemas/templateSchema";
import { DynamicImage } from "@/components/ui/dynamic-image";
import { Hero } from "./components/Hero";

interface FontClassNames {
  dynapuffClass: string;
  cherryBombClass: string;
  spaceGroteskClass: string;
  gravitasOneClass: string;
  rubikBubbleClass: string;
  rammettoOneClass: string;
  bagelFontOneClass: string;
}

const Template4 = ({
  templateData,
  fonts,
  files,
}: {
  templateData: TemplateFormData;
  fonts: FontClassNames;
  files?: {
    logoFile: File | null;
    backgroundFile: File | null;
    previewImage: File | null;
  };
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
      default:
        return fonts.spaceGroteskClass;
    }
  })();

  return (
    <main className={`w-full min-h-screen relative font-bold ${bodyFontClass}`}>
      <div
        className="flex flex-col items-center w-full"
        style={{ backgroundColor: templateData.primaryColor }}
      >
        {files?.previewImage && (
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <DynamicImage
              src={URL.createObjectURL(files.previewImage)}
              fallbackSrc={"https://memecook.fun/assets/illustration.avif"}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Hero Section with Background */}
        <div
          className="w-full"
          style={{ backgroundColor: templateData.secondaryColor }}
        >
          <Hero
            templateData={templateData}
            headingFontClass={headingFontClass}
            file={files?.previewImage}
          />
        </div>
      </div>
    </main>
  );
};

export default Template4;
