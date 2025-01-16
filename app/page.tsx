'use client'

import { subdomainAction } from "@/actions/subdomain-action";
import { SubdomainForm } from "@/components/forms/subdomain-form";
import { SubdomainFormData } from "@/schemas/subdomainSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Page() {
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (values: SubdomainFormData) => {
    const result = await subdomainAction.checkAvailability(values.subdomain);
    if (result.error) {
      setMessage(result.error);
    } else {
      router.push(`/create/${values.subdomain}`);
    }
  };

  return <SubdomainForm onSubmit={handleSubmit} message={message} />;
}