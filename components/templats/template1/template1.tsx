"use client";

import { TemplateFormData } from "@/schemas/templateSchema";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { useEffect } from "react";
import Image from "next/image";

export default function Template1({
  templateData,
}: {
  templateData: TemplateFormData;
}) {
  const backgroundUrl =
    templateData.background || templateData.backgroundFile
      ? templateData.background ||
        URL.createObjectURL(templateData.backgroundFile!)
      : "https://memecook.fun/assets/illustration.avif";

  useEffect(() => {
    if (templateData.backgroundFile) {
      return () => URL.revokeObjectURL(backgroundUrl);
    }
  }, [templateData.backgroundFile, backgroundUrl]);

  return (
    <main className="w-full min-h-screen relative font-outfit font-bold">
      <Image
        src={backgroundUrl}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-[-1] bg-repeat"
        priority
        fill
        unoptimized
      />
      <div className="flex flex-col items-center h-screen w-full">
        <Navbar templateData={templateData} />
        <Hero templateData={templateData} />
      </div>
    </main>
  );
}
