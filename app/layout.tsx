import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Wallet } from "@/components/providers/wallet-provider";
import "@/app/globals.css";
import { Cherry_Bomb_One, DynaPuff } from "next/font/google";

const cherryBombOne = Cherry_Bomb_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cherry-bomb-one",
});

const dynapuff = DynaPuff({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-dynapuff",
});

export const metadata: Metadata = {
  title: "Memecook",
  description: "Cook beautiful memesites in no time",
  icons: {
    icon: [
      {
        url: "/assets/oeufplat.png",
        href: "/assets/oeufplat.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dynapuff.className} ${cherryBombOne.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          forcedTheme="light"
          disableTransitionOnChange
        >
          <Wallet>{children}</Wallet>
        </ThemeProvider>
      </body>
    </html>
  );
}
