import { TemplateFormData } from "@/schemas/templateSchema";
import dynamic from "next/dynamic";
import localFont from "next/font/local";

const dynapuff = localFont({
  src: "../public/fonts/DynaPuff/DynaPuff-VariableFont_wdth,wght.ttf",
  weight: "800",
});

const cherry_bomb_one = localFont({
  src: "../public/fonts/Cherry_Bomb_One/CherryBombOne-Regular.ttf",
});

const space_grotesk = localFont({
  src: "../public/fonts/Space_Grotesk/SpaceGrotesk-VariableFont_wght.ttf",
  weight: "300",
});

const gravitas_one = localFont({
  src: "../public/fonts/Gravitas_One/GravitasOne-Regular.ttf",
  weight: "400",
});

const rubik_bubble = localFont({
  src: "../public/fonts/Rubik_Bubbles/RubikBubbles-Regular.ttf",
  weight: "400",
});

const rammetto_one = localFont({
  src: "../public/fonts/Rammetto_One/RammettoOne-Regular.ttf",
  weight: "400",
});

const bagel_font_one = localFont({
  src: "../public/fonts/Bagel_Fat_One/BagelFatOne-Regular.ttf",
  weight: "400",
});

const noto_sans = localFont({
  src: "../public/fonts/Noto_Sans/NotoSans-VariableFont_wdth,wght.ttf",
  weight: "400",
});

const Template1 = dynamic(
  () => import("@/components/templats/template1/template1"),
  {
    ssr: true,
    loading: () => <div>Loading...</div>,
  },
);

const Template2 = dynamic(
  () => import("@/components/templats/template2/template2"),
  {
    ssr: true,
    loading: () => <div>Loading...</div>,
  },
);

const Template5 = dynamic(
  () => import("@/components/templats/template5/template5"),
  {
    ssr: true,
    loading: () => <div>Loading...</div>,
  },
);

const templates = {
  template1: Template1,
  template2: Template2,
  template5: Template5,
} as const;

type TemplateType = keyof typeof templates;

interface FontClassNames {
  dynapuffClass: string;
  cherryBombClass: string;
  spaceGroteskClass: string;
  gravitasOneClass: string;
  rubikBubbleClass: string;
  rammettoOneClass: string;
  bagelFontOneClass: string;
  notoSansClass: string;
}

export const TemplateViews = ({
  type,
  templateData,
  files,
  subdomain,
}: {
  type: TemplateType;
  templateData: TemplateFormData;
  files?: {
    logoFile: File | null;
    backgroundFile: File | null;
    imagePreviewFile: File | null;
  };
  subdomain?: string;
}) => {
  const Template = templates[type];

  const fonts: FontClassNames = {
    dynapuffClass: dynapuff.className,
    cherryBombClass: cherry_bomb_one.className,
    spaceGroteskClass: space_grotesk.className,
    gravitasOneClass: gravitas_one.className,
    rubikBubbleClass: rubik_bubble.className,
    rammettoOneClass: rammetto_one.className,
    bagelFontOneClass: bagel_font_one.className,
    notoSansClass: noto_sans.className,
  };

  if (!Template) {
    return <div>Template not found</div>;
  }

  return (
    <div className={`w-full h-screen overflow-y-auto`}>
      <Template
        templateData={templateData}
        fonts={fonts}
        files={files}
        subdomain={subdomain}
      />
    </div>
  );
};
