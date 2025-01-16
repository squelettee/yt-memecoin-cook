import { z } from "zod";

export const templateSchema = z.object({
  projectName: z.string().min(1, { message: "Project name is required." }),
  background: z.string().optional(),
  birdeye: z.string().optional(),
  coinGecko: z.string().optional(),
  coinMarketCap: z.string().optional(),
  contractAddress: z.string().optional(),
  description: z.string().optional(),
  dexscreener: z.string().optional(),
  dextools: z.string().optional(),
  imagePreview: z.string().optional(),
  instagram: z.string().optional(),
  jupiter: z.boolean().optional().default(false),
  logo: z.string().optional(),
  pumpFun: z.string().optional(),
  telegram: z.string().optional(),
  ticker: z.string().optional(),
  tiktok: z.string().optional(),
  twitter: z.string().optional(),
  userId: z.number().optional(),
  whitepaper: z.string().optional()
});

export type TemplateFormData = z.infer<typeof templateSchema>;
