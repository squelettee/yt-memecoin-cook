"use client";

type HowToBuyItem = {
  text: string;
};

const howToBuyItems: HowToBuyItem[] = [
  {
    text: "Create any wallet of your choice, we recommend Phantom.",
  },
  {
    text: "Fund your wallet with Solana, you can buy Solana from an exchange.",
  },
  {
    text: "Head to Jupiter & paste our Contract Address, and swap your Solana to our token.",
  },
  {
    text: "Wait for the transaction to confirm, and you're in!",
  },
];

export const HowToBuy = () => {
  return (
    <section id="how-to-buy" className="w-full px-4 py-12 bg-cyan-300">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex justify-center mb-12">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl lg:text-7xl text-white font-bold relative z-10 [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]">
              HOW TO BUY
            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-7xl text-black font-bold absolute top-[2px] md:top-[3px] lg:top-[4px] right-[-2px] md:right-[-3px] lg:right-[-4px]">
              HOW TO BUY
            </h2>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {howToBuyItems.map((item, index) => (
            <div key={index} className="relative group">
              {/* Shadow effect */}
              <div className="absolute bg-black py-7 rounded-xl w-full h-full top-[5px] right-[-5px]" />

              {/* How to buy item */}
              <div className="bg-white rounded-xl py-5 border border-black border-solid relative z-10">
                <div className="px-6 py-4 flex flex-col items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500 text-white font-bold">
                    {index + 1}
                  </span>
                  <span className="font-bold text-lg">{item.text}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
