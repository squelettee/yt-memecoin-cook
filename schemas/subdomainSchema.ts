import { z } from "zod";

export const subdomainSchema = z.object({
  subdomain: z.string().min(1, { message: "Subdomain is required." }),
});

export type SubdomainFormData = z.infer<typeof subdomainSchema>; 