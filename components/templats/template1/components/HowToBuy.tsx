import { TemplateFormData } from "@/schemas/templateSchema";

export const HowToBuy = ({
  templateData,
}: {
  templateData: TemplateFormData;
}) => {
  const howToBuyItems = [
    {
      text: templateData.howtobuyStep1,
    },
    {
      text: templateData.howtobuyStep2,
    },
    {
      text: templateData.howtobuyStep3,
    },
    {
      text: templateData.howtobuyStep4,
    },
  ].filter((item) => item.text);

  return (
    <section
      id="how-to-buy"
      className={`w-full px-4 py-12`}
      style={{ backgroundColor: templateData.primaryColor }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative flex justify-center mb-12">
          <div className="relative">
            <h2
              className="text-4xl md:text-5xl lg:text-7xl font-bold relative z-10 "
              style={{
                color: templateData.headingColor,
                textShadow: `-1px -1px 0 ${templateData.textBorderColor}, 1px -1px 0 ${templateData.textBorderColor}, -1px 1px 0 ${templateData.textBorderColor}, 1px 1px 0 ${templateData.textBorderColor}`,
              }}
            >
              {templateData.howtobuyTitle}
            </h2>
            <h2
              className="text-4xl md:text-5xl lg:text-7xl  font-bold absolute top-[2px] md:top-[3px] lg:top-[4px] right-[-2px] md:right-[-3px] lg:right-[-4px]"
              style={{ color: templateData.borderColor }}
            >
              {templateData.howtobuyTitle}
            </h2>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {howToBuyItems.map((item, index) => (
            <div key={index} className="relative group">
              {/* Shadow effect */}
              <div
                className="absolute rounded-xl w-full h-full top-[5px] right-[-5px]"
                style={{ backgroundColor: templateData.borderColor }}
              />

              {/* How to buy item */}
              <div
                className="bg-white rounded-xl py-4 sm:py-5 border border-solid relative z-10"
                style={{ borderColor: templateData.borderColor }}
              >
                <div className="px-4 sm:px-6 py-2 sm:py-4 flex flex-col items-center gap-2 sm:gap-3 w-full">
                  <span
                    className="flex-shrink-0 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-white font-bold text-sm sm:text-base"
                    style={{
                      backgroundColor: templateData.accentColor,
                      color: templateData.headingColor,
                    }}
                  >
                    {index + 1}
                  </span>
                  <span
                    className="font-bold text-base sm:text-lg text-center break-words w-full max-w-full overflow-hidden"
                    style={{ color: templateData.textColor }}
                  >
                    {item.text}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
