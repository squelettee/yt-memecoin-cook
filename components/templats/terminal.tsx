"use client"

import { TemplateFormData } from "@/schemas/templateSchema";
// import {
//   AnimatedSpan,
//   Terminal,
//   TypingAnimation,
// } from "@/components/magicui/terminal";
// import { Copy, Link } from "lucide-react";
// import Image from "next/image";

export default function TerminalTemplate({ templateData }: { templateData: TemplateFormData }) {
  // const handleCopyAddress = () => {
  //   if (templateData.contractAddress) {
  //     navigator.clipboard.writeText(templateData.contractAddress);
  //   }
  // };

  return (
    <main className="w-full min-h-[100vh] bg-slate-100 flex items-center justify-center relative">
      {/* <div
        className="absolute inset-0 blur-sm"
        style={{
          backgroundImage: templateData.backgroundFile ? `url(${URL.createObjectURL(templateData.backgroundFile)})` : templateData.background ? `url(${templateData.background})` : `url(/assets/illustration.avif)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <Terminal>
          {(templateData.logo || templateData.logoFile) && (
            <div className="flex justify-center mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src={templateData.logoFile ? URL.createObjectURL(templateData.logoFile) : templateData.logo || ''}
                  alt="Project Logo"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          )}

          <TypingAnimation>&gt; Displaying project information</TypingAnimation>

          {templateData.projectName && (
            <AnimatedSpan delay={1000} className="text-green-500">
              <span>✔ Project name: {templateData.projectName}</span>
            </AnimatedSpan>
          )}

          {templateData.ticker && (
            <AnimatedSpan delay={1500} className="text-green-500">
              <span>✔ Ticker: {templateData.ticker}</span>
            </AnimatedSpan>
          )}

          {templateData.description && (
            <AnimatedSpan delay={2000} className="text-green-500">
              <span className="whitespace-pre-wrap break-words max-w-full overflow-hidden">✔ Description: {templateData.description}</span>
            </AnimatedSpan>
          )}

          {templateData.contractAddress && (
            <AnimatedSpan delay={2500} className="text-green-500">
              <span className="flex items-center gap-2">
                ✔ Contract address: {templateData.contractAddress}
                <button
                  onClick={handleCopyAddress}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                  title="Copier l'adresse"
                >
                  <Copy size={16} />
                </button>
              </span>
            </AnimatedSpan>
          )}

          {(templateData.telegram || templateData.twitter || templateData.instagram || templateData.tiktok) && (
            <TypingAnimation delay={3000}>&gt; Social networks</TypingAnimation>
          )}

          {templateData.telegram && (
            <AnimatedSpan delay={3500} className="text-blue-500">
              <span>ℹ Telegram: <a href={templateData.telegram} target="_blank" rel="noopener noreferrer" className="hover:underline">{templateData.telegram}</a></span>
            </AnimatedSpan>
          )}

          {templateData.twitter && (
            <AnimatedSpan delay={4000} className="text-blue-500">
              <span>ℹ Twitter: <a href={templateData.twitter} target="_blank" rel="noopener noreferrer" className="hover:underline">{templateData.twitter}</a></span>
            </AnimatedSpan>
          )}

          {templateData.instagram && (
            <AnimatedSpan delay={4500} className="text-blue-500">
              <span>ℹ Instagram: <a href={templateData.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">{templateData.instagram}</a></span>
            </AnimatedSpan>
          )}

          {templateData.tiktok && (
            <AnimatedSpan delay={5000} className="text-blue-500">
              <span>ℹ TikTok: <a href={templateData.tiktok} target="_blank" rel="noopener noreferrer" className="hover:underline">{templateData.tiktok}</a></span>
            </AnimatedSpan>
          )}

          <TypingAnimation delay={5500} className="text-muted-foreground">
            All information has been successfully loaded.
          </TypingAnimation>
        </Terminal>
      </div>
      <div className="fixed bottom-4 right-4 text-base font-medium text-muted-foreground opacity-80 hover:opacity-100 transition-opacity">
        <Link href={process.env.NEXT_PUBLIC_API_URL!} target="_blank" className="hover:underline flex items-center gap-2">
          <span>Made with</span>
          <span className="font-bold">Memecook 🍳</span>
        </Link>
      </div> */}
    </main>
  )
}
