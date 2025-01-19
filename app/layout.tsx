import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider"
import "./globals.css";
import { Navbar } from "@/components/layouts/navbar";

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
  description: "Build your memesite in a minute",
  icons: {
    icon: [
      { url: '/pepechef.png', sizes: '32x32' },
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
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col items-center`}>
          <ThemeProvider
            attribute="class"
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
