"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { templateSchema, TemplateFormData, FormFieldConfig } from "@/schemas/templateSchema";
import { createTemplate } from "@/actions/template/create-template";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useState, useTransition, useMemo, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { templates } from "@/config/templates";
import { FormFieldRenderer } from "./form-field-render";
import { formConfigByTemplate } from "./form-config-by-template";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  {
    ssr: false,
  },
);

interface TemplateFormProps {
  onUpdate: (data: TemplateFormData) => void;
  templateData: TemplateFormData;
  subdomain: string;
  files: {
    logoFile: File | null;
    backgroundFile: File | null;
    previewImage: File | null;
  };
  setFiles: React.Dispatch<
    React.SetStateAction<{
      logoFile: File | null;
      backgroundFile: File | null;
      previewImage: File | null;
    }>
  >;
}



// Configuration des champs du formulaire par type de template


// Configuration par défaut (utilisée si le type de template n'est pas trouvé)
const defaultFormConfig: Record<string, FormFieldConfig[]> = {
  "Project Info": [
    {
      id: "projectName",
      label: "Project Name",
      type: "text",
      section: "Project Info",
      placeholder: "Enter project name",
    },
  ],
};

export function TemplateForm({
  onUpdate,
  templateData,
  subdomain,
  files,
  setFiles,
}: TemplateFormProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    templateData.type || "template1",
  );
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { publicKey } = useWallet();
  const isWalletConnected = !!publicKey;
  const [activeTab, setActiveTab] = useState<string>("template");

  const form = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: templateData,
    mode: "onSubmit",
  });

  // Obtenir la configuration des champs en fonction du template sélectionné
  const formConfig = useMemo(() => {
    return formConfigByTemplate[selectedTemplate] || defaultFormConfig;
  }, [selectedTemplate]);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    form.setValue("type", templateId);

    // Récupérer toutes les valeurs actuelles du formulaire
    const currentValues = form.getValues();

    // Mettre à jour le state parent
    onUpdate({ ...currentValues, type: templateId });

    // Passer à l'onglet d'édition
    setActiveTab("edits");
  };

  const onSubmit = async (data: TemplateFormData) => {
    setError(null);

    startTransition(async () => {
      try {
        if (!publicKey) {
          throw new Error("Wallet not connected");
        }

        // Utilisez directement les fichiers du state
        const fileData = {
          logo: files.logoFile,
          background: files.backgroundFile,
          preview: files.previewImage,
        };

        // Supprimer les références aux fichiers des données du formulaire

        // Envoyer les données du formulaire et les fichiers séparément
        const response = await createTemplate(
          data,
          subdomain,
          publicKey.toBase58(),
          fileData,
        );

        if (!response.success) {
          throw new Error(response.error || "Failed to create template");
        }

        const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN;

        if (baseDomain && response.template?.domain?.name) {
          const redirectUrl = `http://${response.template.domain.name}.${baseDomain}`;
          window.location.href = redirectUrl;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    });
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      onUpdate(value);
    });

    return () => subscription.unsubscribe();
  }, [form, onUpdate]);

  return (
    <div className="flex flex-col h-full min-w-[320px] overflow-y-auto">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full md:w-[320px] flex flex-col h-full"
      >
        {/* Header */}
        <div className="px-4 bg-background w-full">
          <h1 className="font-bold text-center pt-5 text-lg font-mysteryquest">
            <Link href={process.env.NEXT_PUBLIC_API_URL!}>Memecook</Link>
          </h1>
          <Separator className="my-4" />
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="template">Templates</TabsTrigger>
            <TabsTrigger value="edits">Edit Content</TabsTrigger>
          </TabsList>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => {
                onSubmit(data);
              })}
            >
              <TabsContent value="template" className="mt-4 px-4">
                <div className="grid gap-4">
                  {templates
                    .filter((t) => t.enabled)
                    .map((template) => (
                      <div key={template.id} className="relative group">
                        <Button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            handleTemplateChange(template.id);
                          }}
                          variant={
                            selectedTemplate === template.id
                              ? "default"
                              : "outline"
                          }
                          className={`w-full h-40 flex flex-col items-center justify-center gap-3 transition-all duration-300 rounded-xl border-2 ${selectedTemplate === template.id
                            ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-400 shadow-lg shadow-blue-200"
                            : "hover:border-blue-400 hover:bg-blue-50 border-blue-200"
                            }`}
                        >
                          <span className="text-xl font-bold">
                            {template.name}
                          </span>

                          <div className="flex flex-col items-center gap-1 mt-2">
                            <span className="text-sm font-medium">
                              ✨ Professional Design
                            </span>
                            <span className="text-sm font-medium">
                              🚀 Launch in Minutes
                            </span>
                          </div>

                          <span className="text-sm mt-2 font-medium px-4 py-1 rounded-full bg-blue-100 text-blue-800">
                            Select Template 0.2 SOL
                          </span>
                        </Button>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="edits" className="mt-4">
                <div className="space-y-5 px-4">
                  <Accordion type="single" collapsible>
                    {/* Map through each section of form fields */}
                    {Object.entries(formConfig).map(([section, fields]) => (
                      <AccordionItem
                        key={section}
                        value={section}
                        className="border rounded-lg "
                      >
                        {/* Section header */}
                        <AccordionTrigger className="px-4 py-2 hover:bg-violet-50 text-md font-bold">
                          {section}{" "}
                          {section === "Roadmap" || section === "FAQ"
                            ? "(optional)"
                            : ""}
                        </AccordionTrigger>

                        {/* Section content */}
                        <AccordionContent className="px-4 py-2">
                          <div className="space-y-2">
                            {/* Render each field in the section */}
                            {fields.map((field) => (
                              <FormField
                                key={field.id}
                                control={form.control}
                                name={field.id}
                                render={({ field: formField }) => (
                                  <FormItem className="space-y-2">
                                    <FormLabel className="font-medium">
                                      {field.label}
                                    </FormLabel>

                                    <FormControl>
                                      <FormFieldRenderer
                                        field={field}
                                        formField={formField}
                                        setFiles={setFiles}
                                      />
                                    </FormControl>

                                    <FormMessage className="text-sm text-red-500" />
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
              {/* Footer */}
              <div className="w-full px-4 py-4 bg-background">
                {!isWalletConnected ? (
                  <div className="flex flex-col items-center gap-4 p-4 bg-violet-50 rounded-lg border border-violet-200">
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-violet-900 mb-1">
                        Connect Your Wallet
                      </h3>
                      <p className="text-sm text-violet-700">
                        To create your template, please connect your wallet
                        first
                      </p>
                    </div>
                    <WalletMultiButtonDynamic className="w-full max-w-md py-3 rounded-lg border-2 border-violet-300 bg-white hover:bg-violet-100 transition-colors shadow-sm" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 p-4">
                    <Button
                      type="submit"
                      className="w-full max-w-md py-6 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-lg font-bold shadow-lg transition-colors"
                      disabled={isPending || !isWalletConnected}
                    >
                      {isPending ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin">⚡</span> Creating...
                        </span>
                      ) : (
                        "Create my Memesite"
                      )}
                    </Button>
                    {error && (
                      <p className="text-sm text-red-500 text-center font-medium">
                        {error}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </form>
          </Form>
        </div>
      </Tabs>
    </div>
  );
}
