import { TemplateFormData } from "@/schemas/templateSchema";
import Image from "next/image";

export const HowToBuy = ({
  templateData,
  headingFontClass,
}: {
  templateData: TemplateFormData;
  headingFontClass: string;
}) => {
  const howToBuyItems = [
    {
      text: templateData.howtobuyStep1,
      image: "https://memecook.fun/assets/phantom-how-to-buy.jpeg",
    },
    {
      text: templateData.howtobuyStep2,
      image: "https://memecook.fun/assets/solana-how-to-buy.jpeg",
    },
    {
      text: templateData.howtobuyStep3,
      image: "https://memecook.fun/socials/pump.jpeg",
    },
  ].filter((item) => item.text);

  return (
    <section id="how-to-buy" className={`w-full px-4 py-12`}>
      <div className="max-w-6xl mx-auto">
        <div className="relative flex justify-center mb-12 max-w-4xl mx-auto">
          <div className="relative group">
            <h2
              className={`text-4xl md:text-5xl lg:text-7xl font-bold relative z-10 ${headingFontClass} transform rotate-[-2deg] hover:rotate-2 transition-transform duration-300`}
              style={{
                color: templateData.headingColor,
                textShadow: `-2px -2px 0 ${templateData.textBorderColor}, 2px -2px 0 ${templateData.textBorderColor}, -2px 2px 0 ${templateData.textBorderColor}, 2px 2px 0 ${templateData.textBorderColor}, 4px 4px 0 ${templateData.borderColor}`,
              }}
            >
              {templateData.howtobuyTitle}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howToBuyItems.map((item, index) => (
            <div
              key={index}
              className="relative group transform hover:scale-105 transition-transform duration-300 hover:-rotate-1"
            >
              <div
                className="absolute rounded-[30px] w-full h-full"
                style={{
                  transform: "translate(8px, 8px)",
                }}
              />

              <div
                className="rounded-[30px] py-6 h-full relative z-10"
                style={{
                  backgroundColor: templateData.backgroundColor,
                  border: `4px solid ${templateData.borderColor}`,
                }}
              >
                <div className="px-6 py-4 flex flex-col items-center gap-4 w-full h-full">
                  <span
                    className="font-bold text-2xl"
                    style={{ color: "#000000" }}
                  >
                    STEP {index + 1}
                  </span>
                  <span
                    className="font-bold text-2xl text-center break-words flex-1"
                    style={{ color: "#000000" }}
                  >
                    {item.text}
                  </span>
                  <div className="w-24 h-24 relative mt-2">
                    <Image
                      src={item.image}
                      alt={`Step ${index + 1}`}
                      fill
                      className="object-contain rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Filter for blob effect */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </section>
  );
};
