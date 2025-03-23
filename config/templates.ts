export const templates = [
  {
    id: "minimal",
    name: "Minimal Template",
    enabled: false,
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
    id: "beta",
    name: "Beta Template",
    enabled: false,
    fields: [
      "projectName",
      "ticker",
      "description",
      "telegram",
      "twitter",
      "logoFile",
      "contractAddress",
      "backgroundFile",
      "jupiter",
    ],
  },
  {
    id: "template1",
    name: "Template 1",
    enabled: true,
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
    enabled: false,
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
    enabled: false,
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
export type TemplateType = "template1" 
