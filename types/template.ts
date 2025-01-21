export interface Template {
  id: number
  createdAt: Date
  updatedAt: Date
  background?: string | null
  birdeye?: string | null
  coinGecko?: string | null
  coinMarketCap?: string | null
  contractAddress?: string | null
  description?: string | null
  dexscreener?: string | null
  dextools?: string | null
  imagePreview?: string | null
  instagram?: string | null
  jupiter: boolean
  logo?: string | null
  projectName: string
  pumpFun?: string | null
  telegram?: string | null
  ticker?: string | null
  tiktok?: string | null
  twitter?: string | null
  userId?: number | null
  whitepaper?: string | null
  domain?: Domain | null
  user?: User | null
}

export interface Domain {
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  templateId: number
  template?: Template
}

export interface User {
  id: number
  address: string
  chainId?: number
  lastConnected: Date
  templates: Template[]
}
