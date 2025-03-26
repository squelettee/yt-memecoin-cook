import { HomeNavbar } from "@/components/home/home-navbar";
import { HomeFooter } from "@/components/home/home-footer";
import { HomeTitle } from "@/components/home/home-title";
import { HomeContent } from "@/components/home/home-content";
import { getTemplates } from "@/lib/queries/get-templates";
import { HomeDialog } from "@/components/home/home-dialog";
import { cookies } from "next/headers";

export default async function HomePage() {
  const templates = await getTemplates();
  const cookieStore = await cookies();
  const hasSeenBeta = cookieStore.get("seen-beta");

  return (
    <>
      <HomeNavbar />
      <main className="w-full flex items-center justify-center flex-col relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" />
        <div className="relative w-full flex items-center justify-center flex-col bg-background/80 backdrop-blur-sm">
          <HomeTitle />
          <HomeContent templates={templates} />
        </div>
      </main>
      <HomeFooter />
      {!hasSeenBeta && <HomeDialog />}
    </>
  );
}
