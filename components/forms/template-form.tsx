"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, ControllerRenderProps, Path } from "react-hook-form";
import { templateSchema, TemplateFormData } from "@/schemas/templateSchema";
import { createTemplate } from "@/actions/template/create-template";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

// Types
interface FormFieldConfig {
  id: string;
  label: string;
  type: "text" | "color" | "file" | "checkbox" | "select";
  section: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  showForTemplates?: string[]; // Types de templates pour lesquels ce champ est visible
}

// Configuration des champs du formulaire par type de template
const formConfigByTemplate: Record<
  string,
  Record<string, FormFieldConfig[]>
> = {
  // Configuration pour template1
  template1: {
    Links: [
      { id: "twitter", label: "Twitter", type: "text", section: "Links" },
      { id: "telegram", label: "Telegram", type: "text", section: "Links" },
      { id: "pumpFun", label: "PumpFun", type: "text", section: "Links" },
      { id: "jupiter", label: "Jupiter", type: "text", section: "Links" },
      {
        id: "dexscreener",
        label: "Dexscreener",
        type: "text",
        section: "Links",
      },
    ],
    Styling: [
      {
        id: "headingFont",
        label: "Heading Font",
        type: "select",
        section: "Styling",
        options: [
          { label: "dynapuff", value: "dynapuff" },
          { label: "cherry-bomb", value: "cherry-bomb" },
          { label: "space-grotesk", value: "space-grotesk" },
          { label: "gravitas-one", value: "gravitas-one" },
          { label: "modak", value: "modak" },
          { label: "rock-3d", value: "rock-3d" },
          { label: "rubik-bubble", value: "rubik-bubble" },
          { label: "rammetto-one", value: "rammetto-one" },
          { label: "bagel-font-one", value: "bagel-font-one" },
        ],
      },
      {
        id: "bodyFont",
        label: "Body Font",
        type: "select",
        section: "Styling",
        options: [
          { label: "dynapuff", value: "dynapuff" },
          { label: "cherry-bomb", value: "cherry-bomb" },
          { label: "space-grotesk", value: "space-grotesk" },
          { label: "gravitas-one", value: "gravitas-one" },
          { label: "modak", value: "modak" },
          { label: "rock-3d", value: "rock-3d" },
          { label: "rubik-bubble", value: "rubik-bubble" },
          { label: "rammetto-one", value: "rammetto-one" },
          { label: "bagel-font-one", value: "bagel-font-one" },
        ],
      },
      {
        id: "headingColor",
        label: "Heading Color",
        type: "color",
        section: "Styling",
      },
      {
        id: "backgroundColor",
        label: "Background Color",
        type: "color",
        section: "Styling",
      },
      {
        id: "primaryColor",
        label: "Primary Color",
        type: "color",
        section: "Styling",
      },
      {
        id: "secondaryColor",
        label: "Secondary Color",
        type: "color",
        section: "Styling",
      },
      {
        id: "accentColor",
        label: "Accent Color",
        type: "color",
        section: "Styling",
      },
      {
        id: "textColor",
        label: "Text Color",
        type: "color",
        section: "Styling",
      },
      {
        id: "borderColor",
        label: "Border Color",
        type: "color",
        section: "Styling",
      },
      {
        id: "textBorderColor",
        label: "Text Border Color",
        type: "color",
        section: "Styling",
      },
    ],
    Navbar: [{ id: "logo", label: "Logo", type: "file", section: "Navbar" }],
    Hero: [
      { id: "ticker", label: "Ticker", type: "text", section: "Hero" },
      {
        id: "contractAddress",
        label: "Contract Address",
        type: "text",
        section: "Hero",
      },
      {
        id: "previewImage",
        label: "Preview Image",
        type: "file",
        section: "Hero",
      },
    ],
    About: [
      { id: "aboutTitle", label: "Title", type: "text", section: "About" },
      { id: "aboutContent", label: "Content", type: "text", section: "About" },
      { id: "aboutImage", label: "Image", type: "file", section: "About" },
    ],
    Roadmap: [
      {
        id: "roadmapEnable",
        label: "Enable Roadmap",
        type: "checkbox",
        section: "Roadmap",
      },
      { id: "roadmapTitle", label: "Title", type: "text", section: "Roadmap" },
      {
        id: "roadmapPhase1",
        label: "Phase 1",
        type: "text",
        section: "Roadmap",
      },
      {
        id: "roadmapPhase2",
        label: "Phase 2",
        type: "text",
        section: "Roadmap",
      },
      {
        id: "roadmapPhase3",
        label: "Phase 3",
        type: "text",
        section: "Roadmap",
      },
    ],
    HowToBuy: [
      {
        id: "howtobuyTitle",
        label: "Title",
        type: "text",
        section: "HowToBuy",
      },
      {
        id: "howtobuyStep1",
        label: "Question 1",
        type: "text",
        section: "HowToBuy",
      },
      {
        id: "howtobuyStep2",
        label: "Question 1",
        type: "text",
        section: "HowToBuy",
      },
      {
        id: "howtobuyStep3",
        label: "Question 1",
        type: "text",
        section: "HowToBuy",
      },
      {
        id: "howtobuyStep4",
        label: "Question 1",
        type: "text",
        section: "HowToBuy",
      },
    ],
    FAQ: [
      {
        id: "faqEnable",
        label: "Enable FAQ",
        type: "checkbox",
        section: "FAQ",
      },
      { id: "faqTitle", label: "Title", type: "text", section: "FAQ" },
      { id: "faqQuestion1", label: "Question 1", type: "text", section: "FAQ" },
      { id: "faqAnswer1", label: "Answer 1", type: "text", section: "FAQ" },
      { id: "faqQuestion2", label: "Question 2", type: "text", section: "FAQ" },
      { id: "faqAnswer2", label: "Answer 2", type: "text", section: "FAQ" },
      { id: "faqQuestion3", label: "Question 3", type: "text", section: "FAQ" },
      { id: "faqAnswer3", label: "Answer 3", type: "text", section: "FAQ" },
      { id: "faqQuestion4", label: "Question 4", type: "text", section: "FAQ" },
      { id: "faqAnswer4", label: "Answer 4", type: "text", section: "FAQ" },
    ],
    Footer: [
      {
        id: "footerText",
        label: "Footer Text",
        type: "text",
        section: "Footer",
      },
    ],
  },
};

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

const FormFieldRenderer = ({
  field,
  formField,
  setFiles,
}: {
  field: FormFieldConfig;
  formField: ControllerRenderProps<TemplateFormData, Path<TemplateFormData>>;
  setFiles: TemplateFormProps["setFiles"];
}) => {
  // 📁 File Input
  if (field.type === "file") {
    return (
      <div className="w-full">
        <Input
          type="file"
          className="file:mr-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            formField.onChange(file);

            // Update files state based on field ID
            if (field.id === "previewImage") {
              setFiles((prev) => ({ ...prev, previewImage: file }));
            } else if (field.id === "aboutImage") {
              setFiles((prev) => ({ ...prev, backgroundFile: file }));
            } else if (field.id === "logo") {
              setFiles((prev) => ({ ...prev, logoFile: file }));
            }
          }}
        />
      </div>
    );
  }

  if (field.type === "checkbox") {
    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          {...formField}
          checked={formField.value}
          onCheckedChange={(checked) => {
            formField.onChange(checked);
          }}
          className="data-[state=checked]:bg-violet-700"
        />
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {field.label}
        </label>
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <Select
        value={formField.value}
        onValueChange={(value) => formField.onChange(value)}
      >
        <SelectTrigger className="w-full bg-white/5 backdrop-blur-sm border-violet-200 focus:ring-violet-400">
          <SelectValue placeholder={field.placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white/95 backdrop-blur-lg border-violet-200">
          {field.options?.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="hover:bg-violet-50 focus:bg-violet-50"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (field.type === "color") {
    return (
      <div className="flex items-center gap-3">
        <Input
          {...formField}
          type="color"
          className="h-12 w-24 cursor-pointer rounded-lg border-2 border-violet-200 hover:border-violet-300 transition-colors p-1"
          onChange={(e) => {
            formField.onChange(e.target.value);
          }}
        />
        <Input
          value={formField.value}
          type="text"
          className="h-12 w-32 uppercase rounded-lg border-violet-200 focus:border-violet-400 focus:ring-violet-400 font-mono"
          onChange={(e) => {
            formField.onChange(e.target.value);
          }}
        />
      </div>
    );
  }

  return (
    <Input
      {...formField}
      type={field.type}
      placeholder={field.placeholder}
      onChange={(e) => {
        formField.onChange(e.target.value);
      }}
    />
  );
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
                          className={`w-full h-24 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                            selectedTemplate === template.id
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "hover:border-blue-400 hover:bg-blue-50"
                          }`}
                        >
                          <span className="text-lg font-bold">
                            {template.name}
                          </span>
                          <span className="text-sm opacity-80">
                            Click to select
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
