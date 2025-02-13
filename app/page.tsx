'use client'

import { checkAvailability } from "@/actions/domain/checkAvailability";
import { SubdomainForm } from "@/components/forms/subdomain-form";
import { SubdomainFormData } from "@/schemas/subdomainSchema";
import { useRouter } from "next/navigation";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import { LatestTemplates } from "@/components/latest-templates";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { AuroraText } from "@/components/magicui/aurora-text";

export default function Page() {
  const router = useRouter();
  const shadowColor = "white"

  const handleSubmit = async (values: SubdomainFormData) => {
    const result = await checkAvailability(values.subdomain);
    if (result.error) {
      throw new Error(result.error);
    } else {
      router.push(`/create/${values.subdomain.toLowerCase()}`);
    }
  };

  return (
    <>
      <Navbar />

      <main className="w-full flex items-center justify-center flex-col">
        <div className="w-full flex flex-col items-center gap-8 pb-10 pt-16 sm:pt-28 sm:pb-16">
          <h1 className="text-balance text-center text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            Cook <AuroraText>beautiful</AuroraText> memesites <br /> in <LineShadowText className="italic" shadowColor={shadowColor}>no</LineShadowText> time
          </h1>

          <p className="max-w-[64rem] text-center text-balance text-sm tracking-tight text-muted-foreground md:text-xl">
            Create your <strong>memecoin website</strong> in <strong>minutes</strong> by choosing a <strong>template</strong>, customizing it to your liking, and launching your project <strong>instantly</strong> with quick and easy payment in <strong>$SOL</strong>.
          </p>
        </div>

        <div className="mb-12">
          <SubdomainForm onSubmit={handleSubmit} />
        </div>

        <div className="w-full pt-12 sm:pt-24">
          <VelocityScroll defaultVelocity={1}>
            {[
              " check out these degen memesites just dropped! 🐸",
              " wagmi to the moon! 🚀",
              " build your own memesite now! 👨🏻‍🍳",
              " join the meme revolution! 🦍"
            ]}
          </VelocityScroll>
        </div>

        <div className="my-16 w-full">
          <LatestTemplates />
        </div>
      </main>

      <Footer />
    </>
  )
}