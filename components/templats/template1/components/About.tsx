"use client"

import { DynamicImage } from "@/components/ui/dynamic-image";
import { ShadowButton } from "@/components/ui/shadow-button";
import Link from "next/link";

export const About = () => {
  const socialLinks = [
    { icon: "https://memecook.fun/socials/twitter.png", url: "https://twitter.com", alt: "Twitter" },
    { icon: "https://memecook.fun/socials/telegram.webp", url: "https://telegram.org", alt: "Telegram" },
    { icon: "https://memecook.fun/socials/tiktok.png", url: "https://tiktok.com", alt: "TikTok" },
    { icon: "https://memecook.fun/socials/instagram.png", url: "https://instagram.com", alt: "Instagram" },
    { icon: "https://memecook.fun/socials/birdeye.png", url: "https://birdeye.so", alt: "Birdeye" },
    { icon: "https://memecook.fun/socials/coingecko.png", url: "https://coingecko.com", alt: "CoinGecko" },
    { icon: "https://memecook.fun/socials/coinmarketcap.png", url: "https://coinmarketcap.com", alt: "CoinMarketCap" },
    { icon: "https://memecook.fun/socials/dexscreener.png", url: "https://dexscreener.com", alt: "DexScreener" },
    { icon: "https://memecook.fun/socials/dextools.png", url: "https://dextools.io", alt: "DexTools" },
    { icon: "https://memecook.fun/socials/pumpfun.png", url: "https://pumpfun.io", alt: "PumpFun" },
    { icon: "https://memecook.fun/socials/whitepaper.png", url: "https://whitepaper.com", alt: "Whitepaper" },
  ].filter(link => link.icon && link.url);

  return (
    <section id="about" className="w-full px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="relative flex justify-center mb-12">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl lg:text-7xl text-white font-bold relative z-10 [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]">
              ABOUT
            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-7xl text-black font-bold absolute top-[2px] md:top-[3px] lg:top-[4px] right-[-2px] md:right-[-3px] lg:right-[-4px]">
              ABOUT
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Image */}
          <div className="bg-white rounded-xl p-6">
            <DynamicImage
              src="https://memecook.fun/assets/upload_image.jpeg"
              file={undefined}
              fallbackSrc="https://memecook.fun/assets/upload_image.jpeg"
              alt="About Image"
              width={500}
              height={500}
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Right side - Text */}
          <div className="bg-white rounded-xl p-6 flex items-center justify-center">
            <p className="font-bold text-lg text-center">
              Welcome to our revolutionary meme project! We&apos;re not just another token - we&apos;re building a community-driven ecosystem where creativity meets blockchain technology. Our mission is to bring joy and value to our holders through innovative features, regular community events, and sustainable tokenomics. With our experienced team and clear roadmap, we&apos;re positioned to make waves in the crypto space while keeping the fun spirit of meme culture alive. Join us on this exciting journey as we redefine what&apos;s possible in the world of meme tokens!
            </p>
          </div>
        </div>

        {/* Social links section in a separate div below */}
        {socialLinks.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ShadowButton
                    icon={link.icon}
                    iconAlt={link.alt}
                    size="5xl"
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
