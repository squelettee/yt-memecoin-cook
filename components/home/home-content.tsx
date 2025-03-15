"use client";

import { useRouter } from "next/navigation";
import { SubdomainForm } from "@/components/forms/subdomain-form";
import { TemplatesTable } from "@/components/templates-table";
import { Template } from "@/interfaces/template";
import { checkSubdomainAvailability } from "@/actions/domain/check-subdomain-avaibility";

export function HomeContent({ templates }: { templates: Template[] }) {
  const router = useRouter();

  const handleSubmit = async (data: { subdomain: string }) => {
    const isAvailable = await checkSubdomainAvailability(data.subdomain);
    if (!isAvailable) {
      throw new Error("Domain already exists");
    } else {
      router.push(`/create/${data.subdomain.toLowerCase()}`);
    }
  };

  return (
    <>
      <div className="mb-12">
        <SubdomainForm onSubmit={handleSubmit} />
      </div>

      <div className="my-16 w-full">
        <TemplatesTable templates={templates} />
      </div>
    </>
  );
}
