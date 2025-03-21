import type { Metadata } from "next";
import { Geist, Geist_Mono, Modak, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Wallet } from "@/components/providers/wallet-provider";
import "@/app/globals.css";
import { TwitterPixel } from "@/components/analytics/twitter-pixel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const modak = Modak({
  weight: "400",
  variable: "--font-modak",
  subsets: ["latin"],
});

const outfit = Outfit({
  weight: "800",
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Memecook beta",
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
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${modak.variable} ${outfit.variable} antialiased flex flex-col items-center max-w-[1440px] mx-auto`}
        >
          <ThemeProvider
            attribute="class"
            enableSystem={false}
            forcedTheme="light"
            disableTransitionOnChange
          >
            <Wallet>{children}</Wallet>
          </ThemeProvider>
          <TwitterPixel />
        </body>
      </html>
    </>
  );
}
