"use client";

import { TemplateFormData } from "@/schemas/templateSchema";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

export function ContractAddress({
  templateData,
}: {
  templateData: TemplateFormData;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (templateData.contractAddress) {
      await navigator.clipboard.writeText(templateData.contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Fonction pour formater l'adresse
  const formatAddress = (address: string) => {
    if (!address) return "Contract address not set";
    if (address.length <= 20) return address;
    return `${address.slice(0, 10)}...${address.slice(-8)}`;
  };

  return (
    <section className="w-full max-w-2xl mx-auto px-4">
      <div className="flex flex-col gap-3 items-center bg-background/40 backdrop-blur-sm p-4 sm:p-6 rounded-xl">
        <div className="w-full flex flex-col sm:flex-row gap-2 items-center p-2 sm:p-4 rounded-lg border bg-background/60">
          <div className="w-full sm:flex-1 overflow-hidden">
            <code className="text-xs sm:text-sm  w-full text-center sm:text-left px-2 text-foreground/90 hidden sm:block sm:truncate">
              {templateData.contractAddress || "Contract address not set"}
            </code>
            <code className="text-xs block sm:hidden text-center text-foreground/90">
              {formatAddress(templateData.contractAddress || "")}
            </code>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 h-8 sm:h-9 px-3 bg-background/80 hover:bg-background w-full sm:w-auto"
            onClick={handleCopy}
            disabled={!templateData.contractAddress}
          >
            <span className="mr-2">{copied ? "Copied!" : "Copy"}</span>
            {copied ? (
              <CheckIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            ) : (
              <CopyIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
