import { TemplateFormData } from "@/schemas/templateSchema";
import dynamic from "next/dynamic";
import localFont from "next/font/local";


const dynapuff = localFont({
  src: "../public/fonts/DynaPuff/DynaPuff-VariableFont_wdth,wght.ttf",
  weight: "800",
});

const cherry_bomb_one = localFont({
  src: "../public/fonts/Cherry_Bomb_One/CherryBombOne-Regular.ttf",
  weight: "100",
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

interface FontClassNames {
  dynapuffClass: string;
  cherryBombClass: string;
}

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

  const fonts: FontClassNames = {
    dynapuffClass: dynapuff.className,
    cherryBombClass: cherry_bomb_one.className,
  };


  return (
    <div className={`w-full h-screen overflow-y-auto`}>
      <Template templateData={templateData} fonts={fonts} />
    </div>
  );
};
