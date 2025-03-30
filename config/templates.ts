export const templates = [
  {
    id: "template1",
    name: "Premium",
    enabled: true,
  },
  {
    id: "template2",
    name: "Standard",
    enabled: true,
  },
  {
    id: "template3",
    name: "Template 3",
    enabled: false,
  },
  {
    id: "template5",
    name: "Window XP",
    enabled: true,
  },
];
export type TemplateType =
  | "template1"
  | "template2"
  | "template3"
  | "template5";
