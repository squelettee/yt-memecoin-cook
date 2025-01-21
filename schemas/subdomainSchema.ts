import { z } from "zod";

export const subdomainErrors = {
  required: "Le sous-domaine est requis.",
  maxLength: "Le sous-domaine ne peut pas dépasser 10 caractères.",
  format: "Le sous-domaine ne peut contenir que des lettres, des chiffres et des tirets.",
  taken: "Ce sous-domaine est déjà pris.",
  connection: "Erreur de connexion. Veuillez réessayer."
} as const;

export const subdomainSchema = z.object({
  subdomain: z.string()
    .min(1, { message: subdomainErrors.required })
    .max(10, { message: subdomainErrors.maxLength })
    .regex(/^[a-zA-Z0-9-]+$/, { message: subdomainErrors.format }),
});

export type SubdomainFormData = z.infer<typeof subdomainSchema>; 