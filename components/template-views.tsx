import { TemplateFormData } from "@/schemas/templateSchema";
import dynamic from "next/dynamic";

const templates = {
  minimal: dynamic(() => import("@/components/templats/minimal/minimal")),
  pro: dynamic(() => import("@/components/templats/pro/pro")),
  beta: dynamic(() => import("@/components/templats/beta/beta")),
  standard: dynamic(() => import("@/components/templats/standard/standard")),
  complet: dynamic(() => import("@/components/templats/complet/complet")),
} as const;

type TemplateType = keyof typeof templates;

export const TemplateViews = ({
  type,
  templateData,
}: {
  type: TemplateType;
  templateData: TemplateFormData;
}) => {
  const Template = templates[type];
  return <Template templateData={templateData} />;
};
