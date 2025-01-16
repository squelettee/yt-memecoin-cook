'use client'

import { subdomainAction } from "@/actions/subdomain-action";
import { SubdomainForm } from "@/components/forms/subdomain-form";
import { SubdomainFormData } from "@/schemas/subdomainSchema";
import { Badge } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

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
    <main className="container flex items-center justify-center flex-col">
      <div className="w-full flex flex-col items-center justify-center pt-24">
        <Badge size={70} />
        <h3 className="text-6xl font-bold p-12 w-[830px] text-center">Build your memesite in a minute</h3>
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
            <p className="text-center"></p>
          </Card>
          <Card className="w-[130px] h-[130px] flex items-center justify-center">
            <p className="text-center">Secure</p>
          </Card>
        </div>
      </div>
    </main>
  )
}