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

  // Basic fields
  projectName: z.string().optional().or(z.literal("")),
  ticker: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  contractAddress: z.string().max(255).optional().or(z.literal("")),

  // Links
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
  charlink: z.string().max(255).optional().or(z.literal("")),
  pumpFun: z.string().max(255).optional().or(z.literal("")),

  // Fields with defaults
  type: z.string().default("template1"),
  jupiter: z.string().default(""),

  // Styling configuration
  headingFont: z.string().default("outfit"),
  bodyFont: z.string().default("outfit"),
  headingColor: z.string().default("#ffffff"),
  backgroundColor: z.string().default("#000000"),
  primaryColor: z.string().default("#75caff"),
  secondaryColor: z.string().default("#f5f5f5"),
  accentColor: z.string().default("#2284ec"),
  textColor: z.string().default("#000000"),
  borderColor: z.string().default("#2284ec"),
  textBorderColor: z.string().default("#000000"),

  // About us
  aboutTitle: z.string().optional().or(z.literal("")),
  aboutContent: z.string().optional().or(z.literal("")),
  aboutImage: z.string().optional().or(z.literal("")),

  // Roadmap
  roadmapTitle: z.string().optional().or(z.literal("")),
  roadmapPhase1: z.string().optional().or(z.literal("")),
  roadmapPhase2: z.string().optional().or(z.literal("")),
  roadmapPhase3: z.string().optional().or(z.literal("")),
  roadmapEnable: z.boolean().default(true),

  // How to buy
  howtobuyTitle: z.string().optional().or(z.literal("")),
  howtobuyStep1: z.string().optional().or(z.literal("")),
  howtobuyStep2: z.string().optional().or(z.literal("")),
  howtobuyStep3: z.string().optional().or(z.literal("")),
  howtobuyStep4: z.string().optional().or(z.literal("")),

  // FAQ
  faqTitle: z.string().optional().or(z.literal("")),
  faqQuestion1: z.string().optional().or(z.literal("")),
  faqQuestion2: z.string().optional().or(z.literal("")),
  faqQuestion3: z.string().optional().or(z.literal("")),
  faqQuestion4: z.string().optional().or(z.literal("")),
  faqAnswer1: z.string().optional().or(z.literal("")),
  faqAnswer2: z.string().optional().or(z.literal("")),
  faqAnswer3: z.string().optional().or(z.literal("")),
  faqAnswer4: z.string().optional().or(z.literal("")),
  faqEnable: z.boolean().default(true),

  // Footer
  footerText: z.string().optional().or(z.literal("")),

  // File URLs (stockées en base de données)
  logo: z.any().optional(),
  background: z.any().optional(),
  imagePreview: z.any().optional(),

  // Relations (maintenant optionnelles)
  domain: z
    .object({
      name: z.string().min(1, "Le nom de domaine est requis"),
    })
    .optional(),
  user: z
    .object({
      address: z.string().min(1, "L'adresse de l'utilisateur est requise"),
    })
    .optional(),
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

export interface FormFieldConfig {
  id: string;
  label: string;
  type: "text" | "color" | "file" | "checkbox" | "select";
  section: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  showForTemplates?: string[];
}