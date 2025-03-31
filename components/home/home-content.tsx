"use client";

import { useRouter } from "next/navigation";
import { SubdomainForm } from "@/components/forms/subdomain-form";
import { Badge } from "@/components/ui/badge";
import { checkSubdomainAvailability } from "@/actions/domain/check-subdomain-avaibility";

export function HomeContent() {
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
      <div className="mb-12 flex  h-full flex-col items-center justify-center gap-4">
        <SubdomainForm onSubmit={handleSubmit} />
        <div className="my-16 w-full flex items-center justify-center gap-4 flex-wrap">
          <Badge
            variant="outline"
            className="text-violet-600 border-violet-200 bg-violet-50"
          >
            No Code Required
          </Badge>
          <Badge
            variant="outline"
            className="text-emerald-600 border-emerald-200 bg-emerald-50"
          >
            Free Domain
          </Badge>
          <Badge
            variant="outline"
            className="text-pink-600 border-pink-200 bg-pink-50"
          >
            Full Customization
          </Badge>
          <Badge
            variant="outline"
            className="text-amber-600 border-amber-200 bg-amber-50"
          >
            Affordable Price
          </Badge>
        </div>
      </div>
    </>
  );
}
