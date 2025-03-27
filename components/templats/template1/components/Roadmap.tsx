import { TemplateFormData } from "@/schemas/templateSchema";

export const Roadmap = ({
  templateData,
}: {
  templateData: TemplateFormData;
}) => {
  if (!templateData.roadmapEnable) return null;

  const roadmapPhases = [
    {
      phase: 1,
      text: templateData.roadmapPhase1,
    },
    {
      phase: 2,
      text: templateData.roadmapPhase2,
    },
    {
      phase: 3,
      text: templateData.roadmapPhase3,
    },
  ].filter((phase) => phase.text);

  return (
    <section
      id="roadmap"
      className={`w-full px-4 py-12`}
      style={{ backgroundColor: templateData.primaryColor }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative flex justify-center mb-12">
          <div className="relative">
            <h2
              className="text-4xl md:text-5xl lg:text-7xl font-bold relative z-10"
              style={{
                color: templateData.headingColor,
                textShadow: `-1px -1px 0 ${templateData.textBorderColor}, 1px -1px 0 ${templateData.textBorderColor}, -1px 1px 0 ${templateData.textBorderColor}, 1px 1px 0 ${templateData.textBorderColor}`,
              }}
            >
              {templateData.roadmapTitle}
            </h2>
            <h2
              className="text-4xl md:text-5xl lg:text-7xl  font-bold absolute top-[2px] md:top-[3px] lg:top-[4px] right-[-2px] md:right-[-3px] lg:right-[-4px]"
              style={{ color: templateData.borderColor }}
            >
              {templateData.roadmapTitle}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roadmapPhases.map((phase) => (
            <div key={phase.phase} className="relative group">
              {/* Shadow effect */}
              <div
                className="absolute rounded-xl w-full h-full top-[5px] right-[-5px]"
                style={{ backgroundColor: templateData.borderColor }}
              />

              {/* Phase card */}
              <div
                className="rounded-xl py-5 border border-solid relative z-10 h-full"
                style={{
                  borderColor: templateData.borderColor,
                  backgroundColor: templateData.backgroundColor,
                }}
              >
                <div className="px-6 py-4 flex flex-col items-center gap-3 h-full">
                  <span
                    className="flex items-center justify-center w-auto px-4 h-8 rounded-full text-white font-bold"
                    style={{
                      backgroundColor: templateData.accentColor,
                      color: templateData.headingColor,
                    }}
                  >
                    Phase {phase.phase}
                  </span>
                  <span
                    className="font-bold text-lg text-center"
                    style={{ color: templateData.textColor }}
                  >
                    {phase.text}
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
