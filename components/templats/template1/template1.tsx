"use client";

import { TemplateFormData } from "@/schemas/templateSchema";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { Faq } from "./components/Faq";
import { HowToBuy } from "./components/HowToBuy";
import { Roadmap } from "./components/Roadmap";
import { About } from "./components/About";

interface FontClassNames {
  dynapuffClass: string;
  cherryBombClass: string;
  spaceGroteskClass: string;
  gravitasOneClass: string;
  rubikBubbleClass: string;
  rammettoOneClass: string;
  bagelFontOneClass: string;
}

const Template1 = ({
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
    imagePreviewFile: File | null;
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
      default:
        return fonts.dynapuffClass;
    }
  })();

  return (
    <main className={`w-full min-h-screen relative font-bold ${bodyFontClass}`}>
      <div className="flex flex-col items-center w-full">
        <Navbar
          templateData={templateData}
          file={files?.logoFile}
          headingFontClass={headingFontClass}
        />
        <Hero
          templateData={templateData}
          file={files?.imagePreviewFile}
          headingFontClass={headingFontClass}
        />
        <About
          templateData={templateData}
          file={files?.backgroundFile}
          headingFontClass={headingFontClass}
        />
        <Roadmap
          templateData={templateData}
          headingFontClass={headingFontClass}
        />
        <HowToBuy
          templateData={templateData}
          headingFontClass={headingFontClass}
        />
        <Faq templateData={templateData} headingFontClass={headingFontClass} />
        <Footer
          templateData={templateData}
          subdomain={subdomain}
          headingFontClass={headingFontClass}
        />
      </div>
    </main>
  );
};

export default Template1;
