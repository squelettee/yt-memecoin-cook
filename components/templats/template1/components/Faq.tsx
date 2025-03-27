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
    <section id="faq" className="w-full px-4 py-12 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex justify-center mb-12">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl lg:text-7xl text-white font-bold relative z-10 [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]">
              {templateData.faqTitle}
            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-7xl text-black font-bold absolute top-[2px] md:top-[3px] lg:top-[4px] right-[-2px] md:right-[-3px] lg:right-[-4px]">
              {templateData.faqTitle}
            </h2>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {faqItems.map((item, index) => (
            <div key={index} className="relative group min-w-0">
              {/* Shadow effect */}
              <div className="absolute bg-black py-7 rounded-xl w-full h-full top-[5px] right-[-5px]" />

              {/* FAQ item */}
              <div className="bg-white rounded-xl py-5 border border-black border-solid relative z-10">
                <button
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-left"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    {/* Index avec taille responsive */}
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-500 text-white font-bold text-base sm:text-lg">
                      {index + 1}
                    </span>
                    <span className="font-bold text-base sm:text-lg break-words min-w-0 overflow-hidden text-ellipsis">
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
