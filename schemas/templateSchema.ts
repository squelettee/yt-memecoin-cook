import { z } from "zod";

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
  domain: z.custom<DomainType>().optional(),
  user: z.custom<UserType>().optional()
});

export type TemplateFormData = z.infer<typeof templateSchema>;

export const domainSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string().max(255),
  templateId: z.number(),
  template: z.lazy(() => templateSchema).optional()
});

export const userSchema = z.object({
  id: z.number(),
  address: z.string(),
  chainId: z.number().optional(),
  lastConnected: z.date(),
  templates: z.array(z.lazy(() => templateSchema))
});

// Define interfaces first to break circular dependency
interface DomainType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  templateId: number;
  template?: Template;
}

interface UserType {
  id: number;
  address: string;
  chainId?: number;
  lastConnected: Date;
  templates: Template[];
}

// Vous pouvez ensuite générer les types à partir des schemas
export type Template = z.infer<typeof templateSchema>;
export type Domain = z.infer<typeof domainSchema>;
export type User = z.infer<typeof userSchema>;
