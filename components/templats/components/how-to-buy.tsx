import Image from "next/image";

interface HowToBuyProps {
  jupiter: boolean;
}

export function HowToBuy({ jupiter }: HowToBuyProps) {
  if (!jupiter) return null;
  return (
    <div className="space-y-8 px-6 flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-center">How to Buy</h2>

      <div className="grid gap-6 md:grid-cols-3 max-w-5xl w-full">
        <div className="p-6 rounded-lg border bg-card flex flex-col items-center text-center h-full">
          <h3 className="text-xl font-semibold mb-2">Step 1</h3>
          <p className="text-muted-foreground flex-1">
            Create any wallet of your choice, we recommend Phantom.
          </p>
          <Image
            src="https://memecook.fun/assets/phantom-how-to-buy.jpeg"
            alt="phantom"
            width={50}
            height={50}
            className="rounded-md mt-4"
          />
        </div>

        <div className="p-6 rounded-lg border bg-card flex flex-col items-center text-center h-full">
          <h3 className="text-xl font-semibold mb-2">Step 2</h3>
          <p className="text-muted-foreground flex-1">
            Fund your wallet with Solana, you can buy Solana from an exchange.
          </p>
          <Image
            src="https://memecook.fun/assets/solana-how-to-buy.jpeg"
            alt="solana"
            width={50}
            height={50}
            className="rounded-md mt-4"
          />
        </div>

        <div className="p-6 rounded-lg border bg-card flex flex-col items-center text-center h-full">
          <h3 className="text-xl font-semibold mb-2">Step 3</h3>
          <p className="text-muted-foreground flex-1">
            Head to Jupiter & paste our Contract Address, and swap your Solana
            to our token.
          </p>
          <Image
            src="https://memecook.fun/assets/jupiter-how-to-buy.jpeg"
            alt="jupiter"
            width={50}
            height={50}
            className="rounded-md mt-4"
          />
        </div>
      </div>
    </div>
  );
}
