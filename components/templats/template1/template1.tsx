"use client";

import { TemplateFormData } from "@/schemas/templateSchema";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { Faq } from "./components/Faq";
import { HowToBuy } from "./components/HowToBuy";
import { Roadmap } from "./components/Roadmap";
import { About } from "./components/About";

const Template1 = ({ templateData }: { templateData: TemplateFormData }) => {
  return (
    <main
      className="w-full min-h-screen relative font-bold"
      style={{
        fontFamily: templateData.bodyFont
          ? `var(--font-${templateData.bodyFont.toLowerCase()})`
          : "inherit",
      }}
    >
      <div className="flex flex-col items-center w-full">
        <Navbar templateData={templateData} />
        <Hero templateData={templateData} />
        <About />
        <Roadmap />
        <HowToBuy templateData={templateData} />
        <Faq templateData={templateData} />
        <Footer templateData={templateData} />
      </div>
    </main>
  );
};

export default Template1;
