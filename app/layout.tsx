import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Wallet } from "@/components/providers/wallet-provider";
import { Analytics } from "@vercel/analytics/react";
import "@/app/globals.css";

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
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          forcedTheme="light"
          disableTransitionOnChange
        >
          <Wallet>{children}</Wallet>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
