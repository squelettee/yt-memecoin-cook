import { z } from "zod";
import type { Domain, User } from "@/types/template";

// Match schema.prisma Template model
export const templateSchema = z.object({
  id: z.number().optional(), // @id @default(autoincrement())
  createdAt: z.date().optional(), // @default(now())
  updatedAt: z.date().optional(), // @updatedAt
  background: z.string().max(255).optional(), // String? @db.VarChar(255)
  birdeye: z.string().max(255).optional(),
  coinGecko: z.string().max(255).optional(),
  coinMarketCap: z.string().max(255).optional(),
  contractAddress: z.string().max(255).optional(),
  description: z.string().max(255).optional(),
  dexscreener: z.string().max(255).optional(),
  dextools: z.string().max(255).optional(),
  imagePreview: z.string().max(255).optional(),
  instagram: z.string().max(255).optional(),
  jupiter: z.boolean().default(false), // Boolean @default(false)
  logo: z.string().max(255).optional(),
  projectName: z.string().min(1).max(255), // String @unique @db.VarChar(255)
  pumpFun: z.string().max(255).optional(),
  telegram: z.string().max(255).optional(),
  ticker: z.string().max(255).optional(),
  tiktok: z.string().max(255).optional(),
  twitter: z.string().max(255).optional(),
  userId: z.number().optional(),
  whitepaper: z.string().max(255).optional(),
  domain: z.custom<Domain>().optional(),
  user: z.custom<User>().optional()
});

export type TemplateFormData = z.infer<typeof templateSchema>;
