import { z } from "zod";
export const subdomainErrors = {
  required: "Subdomain is required.",
  maxLength: "Subdomain cannot exceed 10 characters.",
  format: "Subdomain can only contain letters, numbers and hyphens.",
  taken: "This subdomain is already taken.",
  connection: "Connection error. Please try again."
} as const;

export const subdomainSchema = z.object({
  subdomain: z.string()
    .min(1, { message: subdomainErrors.required })
    .max(10, { message: subdomainErrors.maxLength })
    .regex(/^[a-zA-Z0-9-]+$/, { message: subdomainErrors.format }),
});

export type SubdomainFormData = z.infer<typeof subdomainSchema>; 