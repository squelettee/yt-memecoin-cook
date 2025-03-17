"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Rocket } from "lucide-react";
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  {
    ssr: false,
  },
);

export function Navbar() {
  return (
    <nav className="w-full h-[10vh] px-4 sm:px-8 md:px-12 lg:px-20 flex justify-between items-center bg-sidebar-accent">
      <Link href={process.env.NEXT_PUBLIC_API_URL!}>
        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold flex items-center gap-2">
          Memecook{" "}
          <Image src="/assets/beta.png" alt="beta" width={50} height={50} />
        </span>
      </Link>
      <div className="flex gap-4 sm:gap-6 items-center">
        <Link
          href="/early-access"
          className="hidden sm:flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          <Rocket className="w-4 h-4" />
          Early Access
        </Link>
        <div className="scale-[0.85] sm:scale-90 md:scale-100 [&_.wallet-adapter-button]:whitespace-nowrap [&_.wallet-adapter-button]:overflow-hidden [&_.wallet-adapter-button]:text-ellipsis z-10">
          <WalletMultiButtonDynamic />
        </div>
      </div>
    </nav>
  );
}
