"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export function HomeFooter() {
  return (
    <footer className="w-full min-h-[8vh] px-4 sm:px-8 md:px-12 lg:px-20 flex flex-col sm:flex-row justify-end items-center gap-4 sm:gap-0 py-4 sm:py-0 bg-sidebar-accent">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <div className="flex gap-4">
          <Link href="https://twitter.com/@tehdoreiller" target="_blank">
            <Image
              src="/socials/twitter.png"
              alt="Twitter"
              width={24}
              height={24}
              className="text-muted-foreground hover:text-primary transition-colors"
            />
          </Link>
          <Link href="https://t.me/battimini" target="_blank">
            <Image
              src="/socials/telegram.webp"
              alt="Telegram"
              width={24}
              height={24}
              className="text-muted-foreground hover:text-primary transition-colors"
            />
          </Link>
        </div>
        <span className="text-xs sm:text-sm text-muted-foreground text-center">
          © 2025 Memecook. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
