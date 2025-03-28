import { FormFieldConfig } from "@/schemas/templateSchema";

export const formConfigByTemplate: Record<
  string,
  Record<string, FormFieldConfig[]>
> = {
  // Configuration pour template1
  template1: {
    Links: [
      { id: "twitter", label: "Twitter", type: "text", section: "Links" },
      { id: "telegram", label: "Telegram", type: "text", section: "Links" },
      { id: "pumpFun", label: "PumpFun", type: "text", section: "Links" },
      { id: "jupiter", label: "Jupiter", type: "text", section: "Links" },
      {
        id: "dexscreener",
        label: "Dexscreener",
        type: "text",
        section: "Links",
      },
    ],
    Styling: [
      {
        id: "headingFont",
        label: "Heading Font",
        type: "select",
        section: "Styling",
        options: [
          { label: "dynapuff", value: "dynapuff" },
          { label: "cherry-bomb", value: "cherry-bomb" },
          { label: "space-grotesk", value: "space-grotesk" },
          { label: "gravitas-one", value: "gravitas-one" },
          { label: "rubik-bubble", value: "rubik-bubble" },
          { label: "rammetto-one", value: "rammetto-one" },
          { label: "bagel-font-one", value: "bagel-font-one" },
        ],
      },
      {
        id: "bodyFont",
        label: "Body Font",
        type: "select",
        section: "Styling",
        options: [
          { label: "dynapuff", value: "dynapuff" },
          { label: "cherry-bomb", value: "cherry-bomb" },
          { label: "space-grotesk", value: "space-grotesk" },
          { label: "gravitas-one", value: "gravitas-one" },
          { label: "rubik-bubble", value: "rubik-bubble" },
          { label: "rammetto-one", value: "rammetto-one" },
          { label: "bagel-font-one", value: "bagel-font-one" },
        ],
      },
      {
        id: "headingColor",
        label: "Heading Color",
        type: "color",
        section: "Styling",
      },
      {
        id: "backgroundColor",
        label: "Background Color",
        type: "color",
        section: "Styling",
      },
      {
        id: "primaryColor",
        label: "Primary Color",
        type: "color",
        section: "Styling",
      },
      {
        id: "secondaryColor",
        label: "Secondary Color",
        type: "color",
        section: "Styling",
      },
      {
        id: "accentColor",
        label: "Accent Color",
        type: "color",
        section: "Styling",
      },
      {
        id: "textColor",
        label: "Text Color",
        type: "color",
        section: "Styling",
      },
      {
        id: "borderColor",
        label: "Border Color",
        type: "color",
        section: "Styling",
      },
      {
        id: "textBorderColor",
        label: "Text Border Color",
        type: "color",
        section: "Styling",
      },
    ],
    Navbar: [{ id: "logo", label: "Logo", type: "file", section: "Navbar" }],
    Hero: [
      { id: "ticker", label: "Ticker", type: "text", section: "Hero" },
      {
        id: "contractAddress",
        label: "Contract Address",
        type: "text",
        section: "Hero",
      },
      {
        id: "previewImage",
        label: "Preview Image",
        type: "file",
        section: "Hero",
      },
    ],
    About: [
      { id: "aboutTitle", label: "Title", type: "text", section: "About" },
      { id: "aboutContent", label: "Content", type: "text", section: "About" },
      { id: "aboutImage", label: "Image", type: "file", section: "About" },
    ],
    Roadmap: [
      {
        id: "roadmapEnable",
        label: "Enable Roadmap",
        type: "checkbox",
        section: "Roadmap",
      },
      { id: "roadmapTitle", label: "Title", type: "text", section: "Roadmap" },
      {
        id: "roadmapPhase1",
        label: "Phase 1",
        type: "text",
        section: "Roadmap",
      },
      {
        id: "roadmapPhase2",
        label: "Phase 2",
        type: "text",
        section: "Roadmap",
      },
      {
        id: "roadmapPhase3",
        label: "Phase 3",
        type: "text",
        section: "Roadmap",
      },
    ],
    HowToBuy: [
      {
        id: "howtobuyTitle",
        label: "Title",
        type: "text",
        section: "HowToBuy",
      },
      {
        id: "howtobuyStep1",
        label: "Question 1",
        type: "text",
        section: "HowToBuy",
      },
      {
        id: "howtobuyStep2",
        label: "Question 1",
        type: "text",
        section: "HowToBuy",
      },
      {
        id: "howtobuyStep3",
        label: "Question 1",
        type: "text",
        section: "HowToBuy",
      },
      {
        id: "howtobuyStep4",
        label: "Question 1",
        type: "text",
        section: "HowToBuy",
      },
    ],
    FAQ: [
      {
        id: "faqEnable",
        label: "Enable FAQ",
        type: "checkbox",
        section: "FAQ",
      },
      { id: "faqTitle", label: "Title", type: "text", section: "FAQ" },
      { id: "faqQuestion1", label: "Question 1", type: "text", section: "FAQ" },
      { id: "faqAnswer1", label: "Answer 1", type: "text", section: "FAQ" },
      { id: "faqQuestion2", label: "Question 2", type: "text", section: "FAQ" },
      { id: "faqAnswer2", label: "Answer 2", type: "text", section: "FAQ" },
      { id: "faqQuestion3", label: "Question 3", type: "text", section: "FAQ" },
      { id: "faqAnswer3", label: "Answer 3", type: "text", section: "FAQ" },
      { id: "faqQuestion4", label: "Question 4", type: "text", section: "FAQ" },
      { id: "faqAnswer4", label: "Answer 4", type: "text", section: "FAQ" },
    ],
    Footer: [
      {
        id: "footerText",
        label: "Footer Text",
        type: "text",
        section: "Footer",
      },
    ],
  },

  template2: {
    Styling: [
      {
        id: "headingColor",
        label: "Heading Color",
        type: "color",
        section: "Styling",
      },
      {
        id: "backgroundColor",
        label: "Background Color",
        type: "color",
        section: "Styling",
      },
      {
        id: "primaryColor",
        label: "Primary Color",
        type: "color",
        section: "Styling",
      },
      {
        id: "accentColor",
        label: "Accent Color",
        type: "color",
        section: "Styling",
      },
      {
        id: "textColor",
        label: "Text Color",
        type: "color",
        section: "Styling",
      },
      {
        id: "borderColor",
        label: "Border Color",
        type: "color",
        section: "Styling",
      },

      {
        id: "bodyFont",
        label: "Body Font",
        type: "select",
        section: "Styling",
        options: [
          { label: "dynapuff", value: "dynapuff" },
          { label: "cherry-bomb", value: "cherry-bomb" },
          { label: "space-grotesk", value: "space-grotesk" },
          { label: "gravitas-one", value: "gravitas-one" },
          { label: "rubik-bubble", value: "rubik-bubble" },
          { label: "rammetto-one", value: "rammetto-one" },
          { label: "bagel-font-one", value: "bagel-font-one" },
        ],
      },
      {
        id: "headingFont",
        label: "Heading Font",
        type: "select",
        section: "Styling",
        options: [
          { label: "dynapuff", value: "dynapuff" },
          { label: "cherry-bomb", value: "cherry-bomb" },
          { label: "space-grotesk", value: "space-grotesk" },
          { label: "gravitas-one", value: "gravitas-one" },
          { label: "rubik-bubble", value: "rubik-bubble" },
          { label: "rammetto-one", value: "rammetto-one" },
          { label: "bagel-font-one", value: "bagel-font-one" },
        ],
      },
      {
        id: "previewImage",
        label: "Preview Image",
        type: "file",
        section: "Styling",
      },
    ],
    Navbar: [{ id: "logo", label: "Logo", type: "file", section: "Navbar" }],
    Hero: [
      {
        id: "projectName",
        label: "Project Name",
        type: "text",
        section: "Hero",
      },
      {
        id: "description",
        label: "Description",
        type: "text",
        section: "Hero",
      },
      { id: "ticker", label: "Ticker", type: "text", section: "Hero" },
      {
        id: "contractAddress",
        label: "Contract Address",
        type: "text",
        section: "Hero",
      },
      {
        id: "buyNowLink",
        label: "Buy Now Link",
        type: "text",
        section: "Hero",
      },
    ],
    Links: [
      { id: "twitter", label: "Twitter", type: "text", section: "Links" },
      { id: "telegram", label: "Telegram", type: "text", section: "Links" },
      { id: "pumpFun", label: "PumpFun", type: "text", section: "Links" },
      { id: "jupiter", label: "Jupiter", type: "text", section: "Links" },
      {
        id: "dexscreener",
        label: "Dexscreener",
        type: "text",
        section: "Links",
      },
    ],
    HowToBuy: [
      {
        id: "howtobuyTitle",
        label: "Title",
        type: "text",
        section: "HowToBuy",
      },
      {
        id: "howtobuyStep1",
        label: "Question 1",
        type: "text",
        section: "HowToBuy",
      },
      {
        id: "howtobuyStep2",
        label: "Question 2",
        type: "text",
        section: "HowToBuy",
      },
      {
        id: "howtobuyStep3",
        label: "Question 3",
        type: "text",
        section: "HowToBuy",
      },
    ],
    Footer: [
      {
        id: "footerText",
        label: "Footer Text",
        type: "text",
        section: "Footer",
      },
    ],
  },
};
