import Link from "next/link";
import Image from "next/image";

export function BetaFooter() {
  return (
    <footer className="w-full px-4 py-6 mt-auto border-t flex flex-col justify-center items-center gap-2">
      <p className="text-center text-sm text-muted-foreground">
        <Link
          href={process.env.NEXT_PUBLIC_API_URL!}
          className="hover:text-primary transition-colors flex items-center gap-2"
        >
          Powered by Memecook{" "}
          <Image
            src="https://memecook.fun/assets/beta.png"
            alt="beta"
            width={50}
            height={50}
            className="inline"
          />
        </Link>
      </p>
      <span className="text-xs sm:text-sm text-muted-foreground text-center">
        © 2025 Memecook. All rights reserved.
      </span>
    </footer>
  );
}
