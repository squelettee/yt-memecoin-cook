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
}

const Template3 = ({
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

        {/* Navbar Section */}
        <Navbar
          templateData={templateData}
          headingFontClass={headingFontClass}
          file={files?.logoFile}
        />

        {/* Wave Divider - Curved */}
        <div className="w-full overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-16 rotate-180"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill={templateData.secondaryColor}
            ></path>
          </svg>
        </div>

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

          {/* Wave Divider - Zigzag */}
          <div className="w-full overflow-hidden">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-16 rotate-180"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                fill={templateData.primaryColor}
              ></path>
            </svg>
          </div>
        </div>

        {/* How To Buy Section */}
        <div
          className="w-full"
          style={{ backgroundColor: templateData.primaryColor }}
        >
          <HowToBuy
            templateData={templateData}
            headingFontClass={headingFontClass}
          />

          {/* Wave Divider - Curved */}
          <div className="w-full overflow-hidden">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-16 rotate-180"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                fill={templateData.secondaryColor}
              ></path>
            </svg>
          </div>
        </div>

        {/* Footer Section */}
        <div
          className="w-full"
          style={{ backgroundColor: templateData.secondaryColor }}
        >
          <Footer
            templateData={templateData}
            headingFontClass={headingFontClass}
            subdomain={subdomain}
          />
        </div>
      </div>
    </main>
  );
};

export default Template3;
