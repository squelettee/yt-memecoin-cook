import { TemplateFormData } from "@/schemas/templateSchema";
import Image from "next/image";

export const HowToBuy = ({
  templateData,
}: {
  templateData: TemplateFormData;
}) => {
  const howToBuyItems = [
    {
      text: templateData.howtobuyStep1,
      image: "https://memecook.fun/assets/phantom-how-to-buy.jpeg",
      icon: "/assets/winxp-step1.png",
    },
    {
      text: templateData.howtobuyStep2,
      image: "https://memecook.fun/assets/solana-how-to-buy.jpeg",
      icon: "/assets/winxp-step2.png",
    },
    {
      text: templateData.howtobuyStep3,
      image: "https://memecook.fun/socials/pump.jpeg",
      icon: "/assets/winxp-step3.png",
    },
  ].filter((item) => item.text);

  return (
    <section id="how-to-buy" className="w-full p-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Windows XP Style Window - Simplified */}
        <div className="border border-[#0055EA] rounded bg-[#ECE9D8] shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-[#0A246A] via-[#3A6EA5] to-[#0A246A] text-white p-1">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/winxp-help.png"
                alt="Help"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold">
                How to Buy {templateData.ticker}
              </span>
            </div>
          </div>

          <div className="p-4">
            <div className="space-y-4">
              {howToBuyItems.map((item, index) => (
                <div
                  key={index}
                  className="border border-[#ACA899] bg-white p-3 rounded"
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0">
                      <Image
                        src={item.icon}
                        alt={`Step ${index + 1}`}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-[#0055EA] mb-1">
                        Step {index + 1}
                      </h3>
                      <p className="text-xs">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
