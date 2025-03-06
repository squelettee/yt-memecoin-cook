export const templates = [
  {
    id: "minimal",
    name: "Minimal Template",
    fields: [
      "telegram",
      "twitter",
      "pumpFun",
      "instagram",
      "tiktok",
      "logoFile",
      "contractAddress",
      "ticker",
      "description",
      "backgroundFile",
    ],
  },
  {
    id: "basic",
    name: "Basic Template",
    fields: [
      "projectName",
      "ticker",
      "description",
      "telegram",
      "twitter",
      "logoFile",
      "contractAddress",
      "backgroundFile",
    ],
  },
  {
    id: "standard",
    name: "Standard Template",
    fields: [
      // Basic Information
      "projectName",
      "ticker",
      "description",
      // Social Networks
      "telegram",
      "twitter",
      "instagram",
      // Trading
      "dextools",
      "dexscreener",
      // Media
      "logoFile",
      "backgroundFile",
      // Appearance
      "headingColor",
    ],
  },
  {
    id: "pro",
    name: "Pro Template",
    fields: [
      // Basic Information
      "projectName",
      "ticker",
      "description",
      "contractAddress",
      // Documents
      "whitepaper",
      "coinGecko",
      // Social Networks
      "telegram",
      "twitter",
      "instagram",
      "tiktok",
      // Trading
      "dextools",
      "dexscreener",
      "birdeye",
      // Media
      "imagePreviewFile",
      "logoFile",
      "backgroundFile",
      // Appearance
      "headingFont",
      "bodyFont",
      "headingColor",
    ],
  },
  {
    id: "complet",
    name: "Complete Template",
    fields: [
      // Basic Information
      "projectName",
      "ticker",
      "description",
      "contractAddress",
      // Documents
      "whitepaper",
      "coinGecko",
      "coinMarketCap",
      // Social Networks
      "telegram",
      "twitter",
      "instagram",
      "tiktok",
      // Trading
      "dextools",
      "dexscreener",
      "birdeye",
      "jupiter",
      // Media
      "imagePreviewFile",
      "logoFile",
      "backgroundFile",
      // Appearance
      "headingFont",
      "bodyFont",
      "headingColor",
    ],
  },
];

export type TemplateType = "minimal" | "pro" | "basic" | "standard" | "complet";
