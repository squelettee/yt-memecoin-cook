"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  {
    ssr: false,
  },
);

const dynapuff = localFont({
  src: "../../public/fonts/DynaPuff/DynaPuff-VariableFont_wdth,wght.ttf",
  weight: "800",
});

export function HomeNavbar() {
  const { publicKey } = useWallet();
  const router = useRouter();
  const pathname = usePathname();

  // Rediriger vers la page d'accueil si l'utilisateur est déconnecté et sur une page protégée
  useEffect(() => {
    if (!publicKey && pathname.includes("/profile")) {
      router.push(process.env.NEXT_PUBLIC_BASE_URL || "/");
    }
  }, [publicKey, pathname, router]);

  return (
    <nav className="w-full h-[10vh] px-4 sm:px-8 md:px-12 lg:px-20 flex justify-between items-center bg-sidebar-accent">
      <Link href={process.env.NEXT_PUBLIC_BASE_URL!}>
        <span
          className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold flex items-center gap-2 ${dynapuff.className}`}
        >
          Memecook 🍳
        </span>
      </Link>
      <div className="flex gap-4 sm:gap-6 items-center">
        {publicKey && (
          <Link
            href={`/profile/${publicKey}`}
            className={`text-sm sm:text-base font-semibold  ${dynapuff.className}`}
          >
            My Projects
          </Link>
        )}
        <div className="scale-[0.85] sm:scale-90 md:scale-100 [&_.wallet-adapter-button]:whitespace-nowrap [&_.wallet-adapter-button]:overflow-hidden [&_.wallet-adapter-button]:text-ellipsis z-10">
          <WalletMultiButtonDynamic />
        </div>
      </div>
    </nav>
  );
}
