import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { HomeTitle } from "@/components/home/home-title";
import { HomeContent } from "@/components/home/home-content";
import { getTemplates } from "@/lib/queries/get-templates";
import { BetaDialog } from "@/components/home/beta-dialog";
import { cookies } from "next/headers";

export default async function HomePage() {
  const templates = await getTemplates();
  const cookieStore = await cookies();
  const hasSeenBeta = cookieStore.get("seen-beta");

  return (
    <>
      <Navbar />
      <main className="w-full flex items-center justify-center flex-col relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" />
        <div className="relative w-full flex items-center justify-center flex-col bg-background/80 backdrop-blur-sm">
          <HomeTitle />
          <HomeContent templates={templates} />
        </div>
      </main>
      <Footer />
      {!hasSeenBeta && <BetaDialog />}
    </>
  );
}
