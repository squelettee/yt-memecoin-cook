'use client'

import { subdomainAction } from "@/actions/subdomain-action";
import { SubdomainForm } from "@/components/forms/subdomain-form";
import { SubdomainFormData } from "@/schemas/subdomainSchema";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import SparklesText from "@/components/ui/sparkles-text"
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import { LatestTemplates } from "@/components/latest-templates";

export default function Page() {
  const router = useRouter();

  const handleSubmit = async (values: SubdomainFormData) => {
    const result = await subdomainAction.checkAvailability(values.subdomain);
    if (result.error) {
      throw new Error(result.error);
    } else {
      router.push(`/create/${values.subdomain}`);
    }
  };

  return (
    <main className="w-full flex items-center justify-center flex-col">
      <div className="w-full flex flex-col items-center  pt-20">
        <SparklesText className="text-6xl font-bold w-[600px] py-20 text-center" text="Build your memesite in a minute" />
      </div>

      <SubdomainForm onSubmit={handleSubmit} />

      <div className="w-full flex flex-col items-center justify-center pt-24">
        <div className="flex gap-8">
          <Card className="w-[130px] h-[130px] flex items-center justify-center">
            <p className="text-center">Free memecook domain</p>
          </Card>
          <Card className="w-[130px] h-[130px] flex items-center justify-center">
            <p className="text-center">Easy to customize</p>
          </Card>
          <Card className="w-[130px] h-[130px] flex items-center justify-center">
            <p className="text-center">Ready to share</p>
          </Card>
          <Card className="w-[130px] h-[130px] flex items-center justify-center">
            <p className="text-center">No code needed</p>
          </Card>
        </div>
      </div>

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