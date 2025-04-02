import { Domain } from "@prisma/client";

export interface Template {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  type: string;
  background?: string | null;
  logo?: string | null;
  twitter?: string | null;
  telegram?: string | null;
  domain?: Domain | null;
  projectName?: string | null;
  ticker?: string | null;
  description?: string | null;
  contractAddress?: string | null;
  buyNowLink?: string | null;
  whitepaper?: string | null;
  coinGecko?: string | null;
  coinMarketCap?: string | null;
  birdeye?: string | null;
  dexscreener?: string | null;
  dextools?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  pumpFun?: string | null;
  jupiter?: string;
  headingFont?: string;
  bodyFont?: string;
  headingColor?: string;
  backgroundColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  textColor?: string;
  borderColor?: string;
  textBorderColor?: string;
  aboutTitle?: string | null;
  aboutContent?: string | null;
  aboutImage?: string | null;
  roadmapTitle?: string | null;
  roadmapPhase1?: string | null;
  roadmapPhase2?: string | null;
  roadmapPhase3?: string | null;
  roadmapEnable?: boolean;
  howtobuyTitle?: string | null;
  howtobuyStep1?: string | null;
  howtobuyStep2?: string | null;
  howtobuyStep3?: string | null;
  howtobuyStep4?: string | null;
  faqTitle?: string | null;
  faqQuestion1?: string | null;
  faqQuestion2?: string | null;
  faqQuestion3?: string | null;
  faqQuestion4?: string | null;
  faqAnswer1?: string | null;
  faqAnswer2?: string | null;
  faqAnswer3?: string | null;
  faqAnswer4?: string | null;
  faqEnable?: boolean;
  footerText?: string | null;
  imagePreview?: string | null;
  userId?: number;
  expirationDate?: Date;
  status?: "pending" | "active";
}
