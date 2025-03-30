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
    <section id="how-to-buy" className="w-full px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2
            className={`inline-block text-4xl md:text-5xl font-bold ${headingFontClass} transform rotate-[-1deg] transition-transform duration-300 py-4 px-12 rounded-full`}
            style={{
              color: templateData.headingColor,
              backgroundColor: templateData.primaryColor,
              border: `4px solid ${templateData.borderColor}`,
              boxShadow: `8px 8px 0 ${templateData.borderColor}`,
              textShadow: `-2px -2px 0 ${templateData.textBorderColor}, 2px -2px 0 ${templateData.textBorderColor}, -2px 2px 0 ${templateData.textBorderColor}, 2px 2px 0 ${templateData.textBorderColor}, 4px 4px 0 ${templateData.borderColor}`,
            }}
          >
            {templateData.howtobuyTitle}
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="flex flex-col gap-8 w-full">
          {/* Step Cards */}
          {howToBuyItems.map((item, index) => (
            <div
              key={index}
              className="relative z-10 transform hover:scale-105 transition-transform duration-300 w-full"
            >
              <div
                className="absolute rounded-[30px] w-full h-full"
                style={{
                  backgroundColor: templateData.borderColor,
                  transform: "translate(8px, 8px)",
                }}
              />

              <div
                className="rounded-[30px] p-6 h-full relative z-10 flex items-center gap-8"
                style={{
                  backgroundColor: templateData.backgroundColor,
                  border: `4px solid ${templateData.borderColor}`,
                }}
              >
                {/* Step Image */}
                <div
                  className="w-24 h-24 relative rounded-2xl overflow-hidden shrink-0"
                  style={{ border: `3px solid ${templateData.borderColor}` }}
                >
                  <Image
                    src={item.image}
                    alt={`Step ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Step Text */}
                <p
                  className="text-lg font-bold"
                  style={{ color: templateData.textColor }}
                >
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
