import { TemplateFormData } from "@/schemas/templateSchema";
import dynamic from "next/dynamic";
import localFont from "next/font/local";

const dynapuff = localFont({
  src: "../public/fonts/DynaPuff/DynaPuff-VariableFont_wdth,wght.ttf",
  weight: "800",
});

const Template1 = dynamic(
  () => import("@/components/templats/template1/template1"),
  {
    ssr: true,
    loading: () => <div>Loading...</div>,
  },
);

const templates = {
  template1: Template1,
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

  if (!Template) {
    return <div>Template not found</div>;
  }

  return (
    <div className={`${dynapuff.className} w-full h-screen overflow-y-auto`}>
      <Template templateData={templateData} />
    </div>
  );
};
