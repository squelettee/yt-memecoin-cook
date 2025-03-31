import { HomeNavbar } from "@/components/home/home-navbar";
import { HomeFooter } from "@/components/home/home-footer";
import { HomeTitle } from "@/components/home/home-title";
import { HomeContent } from "@/components/home/home-content";

export default async function HomePage() {
  return (
    <>
      <HomeNavbar />
      <main className="w-full flex items-center justify-center flex-col relative max-h-[82vh]">
        <div className="relative w-full flex items-center justify-center flex-col">
          <HomeTitle />
          <HomeContent />
        </div>
      </main>
      <HomeFooter />
    </>
  );
}
