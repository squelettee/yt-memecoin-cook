"use client";

import { TemplateFormData } from "@/schemas/templateSchema";
import Image from "next/image";
import { useEffect, useState } from "react";

export function BasicHeader({
  templateData,
}: {
  templateData: TemplateFormData;
}) {
  const [logoUrl, setLogoUrl] = useState<string>("/assets/upload_image.jpeg");

  useEffect(() => {
    if (templateData.logoFile) {
      const url = URL.createObjectURL(templateData.logoFile);
      setLogoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [templateData.logoFile]);

  return (
    <header className="w-full px-6 sm:px-8 py-6 flex items-center justify-between border-b bg-background/95 backdrop-blur-sm fixed top-0 z-50">
      <div className="flex items-center gap-2">
        <Image
          src={logoUrl}
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="font-bold text-xl">
          {templateData.ticker || "YOUR TICKER"}
        </span>
      </div>
    </header>
  );
}
