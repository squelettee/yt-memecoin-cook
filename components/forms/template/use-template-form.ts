"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { templateSchema, TemplateFormData } from "@/schemas/templateSchema";
import { useWallet } from "@solana/wallet-adapter-react";
import { createTemplate } from "@/actions/template/create-template";

interface UseTemplateFormProps {
  subdomain: string;
  onUpdate: (data: TemplateFormData) => void;
}

export function useTemplateForm({ subdomain, onUpdate }: UseTemplateFormProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { publicKey } = useWallet();
  const isWalletConnected = !!publicKey;

  const form = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      projectName: "",
      ticker: "",
      description: "",
      contractAddress: "",
      whitepaper: "",
      coinGecko: "",
      coinMarketCap: "",
      telegram: "",
      twitter: "",
      instagram: "",
      tiktok: "",
      dextools: "",
      dexscreener: "",
      birdeye: "",
      jupiter: false,
      imagePreviewFile: null,
      logoFile: null,
      backgroundFile: null,
      headingFont: "",
      bodyFont: "",
      headingColor: "#000000",
      domain: {
        name: subdomain.toLowerCase(),
      },
      type: selectedTemplate,
      user: {
        address: publicKey?.toBase58() || "",
      },
    },
  });

  useEffect(() => {
    if (publicKey) {
      form.setValue("user.address", publicKey.toBase58());
    }
  }, [publicKey, form]);

  useEffect(() => {
    const subscription = form.watch((data) => {
      onUpdate({
        ...(data as TemplateFormData),
        type: selectedTemplate,
      });
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdate, selectedTemplate]);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    form.setValue("type", templateId);
    const currentData = form.getValues();
    onUpdate({
      ...currentData,
      type: templateId,
    });
  };

  const handleSubmit = async () => {
    const formState = form.getValues();

    try {
      setIsSubmitting(true);
      if (!formState.user?.address) {
        console.error("L'adresse de l'utilisateur est requise");
        return;
      }

      const validationResult = await form.trigger();
      if (!validationResult) {
        return;
      }

      const response = await createTemplate(formState);

      if ("error" in response) {
        throw new Error(response.error);
      }

      if (!response.success) {
        throw new Error("Failed to create template");
      }

      const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN;
      if (baseDomain && response.template?.domain?.name) {
        window.location.href = `http://${response.template.domain.name}.${baseDomain}`;
      }
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    isWalletConnected,
    selectedTemplate,
    handleTemplateChange,
    handleSubmit,
  };
} 