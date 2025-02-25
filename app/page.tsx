import { Navbar } from "@/components/layouts/navbar"
import { Footer } from "@/components/layouts/footer"
import { HomeTitle } from "@/components/home/home-title"
import { HomeContent } from "@/components/home/home-content"
import { getTemplates } from "@/lib/queries/get-templates"

export default async function HomePage() {
  const templates = await getTemplates()

  return (
    <>
      <Navbar />
      <main className="w-full flex items-center justify-center flex-col">
        <HomeTitle />
        <HomeContent
          templates={templates}
        />
      </main>
      <Footer />
    </>
  )
}