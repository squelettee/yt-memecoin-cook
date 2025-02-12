'use client'

import { checkAvailability } from "@/actions/subdomain-action";
import { SubdomainForm } from "@/components/forms/subdomain-form";
import { SubdomainFormData } from "@/schemas/subdomainSchema";
import { useRouter } from "next/navigation";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import { LatestTemplates } from "@/components/latest-templates";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { AuroraText } from "@/components/magicui/aurora-text";
import { useTheme } from "next-themes";

export default function Page() {
  const router = useRouter();
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";

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
        <div className="w-full flex flex-col items-center gap-5 pb-5 pt-10 sm:pt-20 sm:pb-10">
          <h1 className="text-balance text-center text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            Ship <AuroraText>beautiful</AuroraText> memesites <br /> in <LineShadowText className="italic" shadowColor={shadowColor}>half</LineShadowText> the time
          </h1>
          <p className="max-w-[64rem] text-center text-balance text-sm tracking-tight text-muted-foreground md:text-xl">
            Create your <strong>memecoin website</strong> in <strong>minutes</strong> by choosing a <strong>template</strong>, customizing it to your liking, and launching your project <strong>instantly</strong> with quick and easy payment in <strong>$SOL</strong>.
          </p>
        </div>

        <SubdomainForm onSubmit={handleSubmit} />

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
        <LatestTemplates />
      </main>
      <Footer />
    </>
  )
}