"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HomeDialog() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      document.cookie = "seen-beta=true; path=/";
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to Memecook Beta! 🏛️</DialogTitle>
          <DialogDescription className="space-y-2 pt-2">
            <p>
              We&apos;re excited to announce our beta version. Create beautiful
              landing pages for your meme coins with our easy-to-use templates.
            </p>
            <p className="font-medium text-foreground">
              🎯 Early users will receive governance tokens to shape
              Memecook&apos;s future! Learn more about our community governance
              program.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              💌 Questions or feedback? Contact us at{" "}
              <a
                href="mailto:memecook.contact@proton.me"
                className="text-primary hover:underline"
              >
                memecook.contact@proton.me
              </a>
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Link href="/early-access" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full">
              Learn About Governance
            </Button>
          </Link>
          <DialogClose asChild>
            <Button className="w-full sm:w-auto gap-2">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
