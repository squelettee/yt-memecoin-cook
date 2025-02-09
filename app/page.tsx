'use client'

import { checkAvailability } from "@/actions/subdomain-action";
import { SubdomainForm } from "@/components/forms/subdomain-form";
import { SubdomainFormData } from "@/schemas/subdomainSchema";
import { useRouter } from "next/navigation";
import SparklesText from "@/components/ui/sparkles-text"
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import { LatestTemplates } from "@/components/latest-templates";
import Image from "next/image";

export default function Page() {
  const router = useRouter();

  const handleSubmit = async (values: SubdomainFormData) => {
    const result = await checkAvailability(values.subdomain);
    if (result.error) {
      throw new Error(result.error);
    } else {
      router.push(`/create/${values.subdomain.toLowerCase()}`);
    }
  };

  return (
    <main className="w-full flex items-center justify-center flex-col">
      <div className="w-full flex flex-col items-center  pt-10">
        <Image src={"/pepechef.png"} width={140} height={140} alt='pepe the chef' />
        <SparklesText className="text-5xl font-bold py-10 text-center" text="Build your memesite in a minute" />
      </div>

      <SubdomainForm onSubmit={handleSubmit} />

      <div className=" w-full py-20">
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
  )
}