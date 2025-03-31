"use client";

import localFont from "next/font/local";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";

const dynapuff = localFont({
  src: "../../public/fonts/DynaPuff/DynaPuff-VariableFont_wdth,wght.ttf",
  weight: "800",
});

export function HomeTitle() {
  const [showDialog, setShowDialog] = useState(true);

  useEffect(() => {
    // Check if dialog has been shown before
    const hasSeenDialog = localStorage.getItem("hasSeenCollaborationDialog");
    if (hasSeenDialog) {
      setShowDialog(false);
    } else {
      localStorage.setItem("hasSeenCollaborationDialog", "true");
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-8 pb-10 pt-16 sm:pt-28 sm:pb-16">
      <h1
        className={`text-balance text-center text-4xl font-semibold leading-none tracking-wide sm:text-5xl md:text-6xl lg:text-7xl ${dynapuff.className}`}
      >
        Cook beautiful memesites
        <br /> in <span className="text-violet-600">no</span> time
      </h1>
      <p className="max-w-[64rem] text-center text-balance text-sm tracking-tight text-muted-foreground md:text-xl">
        Create your <strong>memecoin website</strong> in{" "}
        <strong>minutes</strong> with quick and easy payment in{" "}
        <strong>$SOL</strong>.
      </p>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Let&apos;s build something amazing together! 🚀
            </DialogTitle>
            <span className="text-muted-foreground mt-4">
              If you like my work and are looking for a skilled developer for
              your projects, I&apos;d love to hear from you! Let&apos;s connect!
            </span>
          </DialogHeader>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
