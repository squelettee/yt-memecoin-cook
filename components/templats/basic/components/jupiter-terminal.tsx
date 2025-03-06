"use client";

import { useEffect } from "react";
import { TemplateFormData } from "@/schemas/templateSchema";
import "@jup-ag/terminal/css";

export function JupiterTerminal({
  templateData,
}: {
  templateData: TemplateFormData;
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@jup-ag/terminal").then((mod) => {
        const init = mod.init;
        init({
          displayMode: "integrated",
          integratedTargetId: "integrated-terminal",
          endpoint:
            "https://mainnet.helius-rpc.com/?api-key=12718bda-c02c-4f61-8ace-429887a1d4e1",
          strictTokenList: false,
          formProps: {
            fixedInputMint: true,
            fixedOutputMint: true,
            initialInputMint: "So11111111111111111111111111111111111111112",
            initialOutputMint: templateData.contractAddress,
          },
        });
      });
    }
  }, [templateData.contractAddress]);

  return (
    <section className="w-auto mx-auto px-4 py-8">
      <div
        id="integrated-terminal"
        className="w-full h-full rounded-xl overflow-hidden"
      />
    </section>
  );
}
