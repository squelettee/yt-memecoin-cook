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
  modakClass: string;
  rock3dClass: string;
  rubikBubbleClass: string;
  rammettoOneClass: string;
  bagelFontOneClass: string;
}

const Template1 = ({
  templateData,
  fonts,
}: {
  templateData: TemplateFormData;
  fonts: FontClassNames;
}) => {
  return (
    <main
      className={`w-full min-h-screen relative font-bold ${(() => {
        switch (templateData.bodyFont) {
          case "dynapuff":
            return fonts.dynapuffClass;
          case "cherry-bomb":
            return fonts.cherryBombClass;
          case "space-grotesk":
            return fonts.spaceGroteskClass;
          case "gravitas-one":
            return fonts.gravitasOneClass;
          case "modak":
            return fonts.modakClass;
          case "rock-3d":
            return fonts.rock3dClass;
          case "rubik-bubble":
            return fonts.rubikBubbleClass;
          case "rammetto-one":
            return fonts.rammettoOneClass;
          case "bagel-font-one":
            return fonts.bagelFontOneClass;
          default:
            return fonts.dynapuffClass;
        }
      })()}`}
    >
      <div className="flex flex-col items-center w-full">
        <Navbar templateData={templateData} />
        <Hero templateData={templateData} />
        <About templateData={templateData} />
        <Roadmap templateData={templateData} />
        <HowToBuy templateData={templateData} />
        <Faq templateData={templateData} />
        <Footer templateData={templateData} />
      </div>
    </main>
  );
};

export default Template1;
