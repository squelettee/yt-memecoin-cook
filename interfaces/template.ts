import { Domain } from "@prisma/client"

export interface Template {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  background: string | null;
  logo: string | null;
  twitter: string | null;
  telegram: string | null;
  domain: Domain | null;
}