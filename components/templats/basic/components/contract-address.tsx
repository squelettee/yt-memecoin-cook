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

  return (
    <section className="w-full max-w-2xl mx-auto px-4">
      <div className="flex flex-col gap-3 items-center bg-background/40 backdrop-blur-sm p-6 rounded-xl">
        <div className="w-full flex flex-col sm:flex-row gap-2 items-center p-4 rounded-lg border bg-background/60">
          <code className="text-sm flex-1 truncate text-center sm:text-left px-2 text-foreground/90">
            {templateData.contractAddress || "Contract address not set"}
          </code>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 h-9 px-3 bg-background/80 hover:bg-background"
            onClick={handleCopy}
            disabled={!templateData.contractAddress}
          >
            {copied ? (
              <CheckIcon className="h-4 w-4" />
            ) : (
              <CopyIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
