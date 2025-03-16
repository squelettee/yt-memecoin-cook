// Import Zod library for schema validation
import { z } from "zod";

// Define base schema types
export type TemplateSchemaType = z.ZodType;
export type DomainSchemaType = z.ZodType;
export type UserSchemaType = z.ZodType;

// Template schema that matches the Prisma model
// Contains fields for template customization and metadata
export const templateSchema: TemplateSchemaType = z.object({
  // Basic metadata fields
  id: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),

  // All fields are optional except those with defaults
  projectName: z.string().optional().or(z.literal("")),
  ticker: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  contractAddress: z.string().max(255).optional().or(z.literal("")),
  whitepaper: z.string().max(255).optional().or(z.literal("")),
  coinGecko: z.string().max(255).optional().or(z.literal("")),
  coinMarketCap: z.string().max(255).optional().or(z.literal("")),
  telegram: z.string().max(255).optional().or(z.literal("")),
  twitter: z.string().max(255).optional().or(z.literal("")),
  instagram: z.string().max(255).optional().or(z.literal("")),
  tiktok: z.string().max(255).optional().or(z.literal("")),
  dextools: z.string().max(255).optional().or(z.literal("")),
  dexscreener: z.string().max(255).optional().or(z.literal("")),
  birdeye: z.string().max(255).optional().or(z.literal("")),

  // Fields with defaults (required in Prisma)
  type: z.string().default("minimal"),
  jupiter: z.boolean().default(false),
  headingFont: z.string().default("geist"),
  bodyFont: z.string().default("geist"),
  headingColor: z.string().default("#ffffff"),
  backgroundColor: z.string().default("#000000"),

  // File URLs
  logo: z.string().nullable().optional(),
  background: z.string().nullable().optional(),

  // File upload fields (not in Prisma schema)
  imagePreviewFile: z.instanceof(File).nullable().optional(),
  logoFile: z.instanceof(File).nullable().optional(),
  backgroundFile: z.instanceof(File).nullable().optional(),

  // Relations
  domain: z.object({
    name: z.string().min(1, "Le nom de domaine est requis"),
  }),
  user: z.object({
    address: z.string().min(1, "L'adresse de l'utilisateur est requise"),
  }),
  userId: z.number().optional(),
});

// Type inference for form data
export type TemplateFormData = z.infer<typeof templateSchema>;

// Domain schema for managing template URLs
export const domainSchema: DomainSchemaType = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string().min(1, "Le nom de domaine est requis"),
  templateId: z.number(),
  template: z.lazy(() => templateSchema as TemplateSchemaType).optional(),
});

// User schema for authentication and template ownership
export const userSchema: UserSchemaType = z.object({
  id: z.number().optional(),
  address: z.string().min(1, "L'adresse de l'utilisateur est requise"),
  chainId: z.number().optional(),
  lastConnected: z.date(),
  templates: z.array(z.lazy(() => templateSchema as TemplateSchemaType)),
});

// Export inferred types for use in other parts of the application
export type TemplateType = z.infer<typeof templateSchema>;
export type DomainType = z.infer<typeof domainSchema>;
export type UserType = z.infer<typeof userSchema>;
