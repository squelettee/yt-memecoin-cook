"use client";

type RoadmapPhase = {
  phase: number;
  text: string;
};

const roadmapPhases: RoadmapPhase[] = [
  {
    phase: 1,
    text: "Launch on Jupiter, Marketing Campaign, Community Building, Social Media Growth, Influencer Partnerships",
  },
  {
    phase: 2,
    text: "CEX Listings, Partnerships Development, Utility Expansion, NFT Collection Launch, Staking Platform",
  },
  {
    phase: 3,
    text: "Global Expansion, New Product Features, Community Rewards, Metaverse Integration, DAO Governance",
  },
];

export const Roadmap = () => {
  return (
    <section id="roadmap" className="w-full px-4 py-12 bg-cyan-300">
      <div className="max-w-7xl mx-auto">
        <div className="relative flex justify-center mb-12">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl lg:text-7xl text-white font-bold relative z-10 [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]">
              ROADMAP
            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-7xl text-black font-bold absolute top-[2px] md:top-[3px] lg:top-[4px] right-[-2px] md:right-[-3px] lg:right-[-4px]">
              ROADMAP
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roadmapPhases.map((phase) => (
            <div key={phase.phase} className="relative group">
              {/* Shadow effect */}
              <div className="absolute bg-black py-7 rounded-xl w-full h-full top-[5px] right-[-5px]" />

              {/* Phase card */}
              <div className="bg-white rounded-xl py-5 border border-black border-solid relative z-10 h-full">
                <div className="px-6 py-4 flex flex-col items-center gap-3 h-full">
                  <span className="flex items-center justify-center w-auto px-4 h-8 rounded-full bg-yellow-500 text-white font-bold">
                    Phase {phase.phase}
                  </span>
                  <span className="font-bold text-lg text-center">{phase.text}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
