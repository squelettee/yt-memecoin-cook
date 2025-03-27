"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TemplateFormData } from "@/schemas/templateSchema";

export const Faq = ({ templateData }: { templateData: TemplateFormData }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!templateData.faqEnable) {
    return null;
  }

  const faqItems = [
    {
      question: templateData.faqQuestion1,
      answer: templateData.faqAnswer1,
    },
    {
      question: templateData.faqQuestion2,
      answer: templateData.faqAnswer2,
    },
    {
      question: templateData.faqQuestion3,
      answer: templateData.faqAnswer3,
    },
    {
      question: templateData.faqQuestion4,
      answer: templateData.faqAnswer4,
    },
  ].filter((item) => item.question && item.answer);

  return (
    <section id="faq" className={`w-full px-4 py-12`} style={{ backgroundColor: templateData.secondaryColor }} >
      <div className="max-w-4xl mx-auto">
        <div className="relative flex justify-center mb-12">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold relative z-10 " style={{ color: templateData.headingColor, textShadow: `-1px -1px 0 ${templateData.textBorderColor}, 1px -1px 0 ${templateData.textBorderColor}, -1px 1px 0 ${templateData.textBorderColor}, 1px 1px 0 ${templateData.textBorderColor}` }}>
              {templateData.faqTitle}
            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold absolute top-[2px] md:top-[3px] lg:top-[4px] right-[-2px] md:right-[-3px] lg:right-[-4px]" style={{ color: templateData.borderColor }}>
              {templateData.faqTitle}
            </h2>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {faqItems.map((item, index) => (
            <div key={index} className="relative group min-w-0">
              {/* Shadow effect */}
              <div className="absolute rounded-xl w-full h-full top-[5px] right-[-5px]" style={{ backgroundColor: templateData.borderColor }} />

              {/* FAQ item */}
              <div className="bg-white rounded-xl py-5 border border-solid relative z-10" style={{ borderColor: templateData.borderColor }}>
                <button
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-left"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    {/* Index avec taille responsive */}
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-white font-bold text-base sm:text-lg" style={{ backgroundColor: templateData.accentColor, color: templateData.headingColor }}>
                      {index + 1}
                    </span>
                    <span className="font-bold text-base sm:text-lg break-words min-w-0 overflow-hidden text-ellipsis" style={{ color: templateData.textColor }}>
                      {item.question}
                    </span>
                  </div>
                  {/* Flèche responsive */}
                  <ChevronDown
                    className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 ml-2 transition-transform ${openIndex === index ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-4 sm:px-6 pb-4 text-gray-600 mx-2 sm:mx-11 break-words overflow-auto max-w-full max-h-[300px] overflow-y-auto text-sm sm:text-base">
                    {item.answer}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
