"use client";

import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export function TemplateFormFooter({
  isWalletConnected,
  isSubmitting,
  onSubmit,
}: {
  isWalletConnected: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
}) {
  return (
    <div className="w-full md:w-[400px] border-r px-4 py-4 border-t bg-background">
      <div className="flex flex-col gap-4 items-center">
        {!isWalletConnected ? (
          <div className="w-full flex flex-col gap-2 items-center">
            <p className="text-sm text-muted-foreground text-center">
              Connect your wallet to create your template
            </p>
            <WalletMultiButtonDynamic className="w-full px-6 py-6" />
          </div>
        ) : (
          <Button
            className="w-full px-6 py-6 bg-violet-800 hover:bg-black text-primary-foreground font-bold text-lg"
            type="button"
            disabled={isSubmitting || !isWalletConnected}
            onClick={onSubmit}
          >
            {isSubmitting ? "Creating..." : "Create Memesite"}
          </Button>
        )}
      </div>
    </div>
  );
} 