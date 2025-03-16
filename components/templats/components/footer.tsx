import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

export function BasicFooter() {
  const { subdomain } = useParams();

  return (
    <footer className="w-full px-4 py-6 mt-auto border-t flex flex-col justify-center items-center gap-2">
      <p className="text-center text-sm text-muted-foreground">
        <Link
          href={process.env.NEXT_PUBLIC_API_URL!}
          className="hover:text-primary transition-colors flex items-center gap-2"
        >
          Powered by Memecook{" "}
          <Image
            src="/assets/beta.png"
            alt="beta"
            width={50}
            height={50}
            className="inline"
          />
        </Link>
      </p>
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} {subdomain}.memecook.fun. All rights
        reserved.
      </p>
    </footer>
  );
}
