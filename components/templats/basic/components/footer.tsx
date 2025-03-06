import Link from "next/link";

export function BasicFooter() {
  return (
    <footer className="w-full px-4 py-6 mt-auto border-t">
      <p className="text-center text-sm text-muted-foreground">
        <Link
          href={process.env.NEXT_PUBLIC_API_URL!}
          className="hover:text-primary transition-colors"
        >
          Powered by Memecook 🍳
        </Link>
      </p>
    </footer>
  );
}
