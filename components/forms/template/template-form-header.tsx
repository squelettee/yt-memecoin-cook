"use client";

import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TemplateFormHeader() {
  return (
    <div className="px-4 border-b bg-background w-full">
      <h1 className="font-bold text-center pt-5 text-lg sm:text-xl md:text-2xl lg:text-3xl flex items-center justify-center gap-2">
        <Link href={process.env.NEXT_PUBLIC_API_URL!} className="flex items-center gap-2">
          Memecook <Image src="/assets/beta.png" alt="beta" width={50} height={50} />
        </Link>
      </h1>
      <Separator className="my-4" />
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="template">Template</TabsTrigger>
        <TabsTrigger value="edits">Edit Content</TabsTrigger>
      </TabsList>
    </div>
  );
} 