import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Wallet } from "@/components/providers/wallet-provider";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col items-center`}
        >
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
    </>
  );
}
