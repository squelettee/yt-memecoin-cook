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
    "Project Info": [
      {
        id: "projectName",
        label: "Project Name",
        type: "text",
        section: "Project Info",
        placeholder: "Enter project name",
      },
      {
        id: "ticker",
        label: "Ticker",
        type: "text",
        section: "Project Info",
        placeholder: "Enter ticker",
      },
      {
        id: "description",
        label: "Description",
        type: "text",
        section: "Project Info",
        placeholder: "Enter description",
      },
    ],
    Appearance: [
      {
        id: "headingColor",
        label: "Heading Color",
        type: "color",
        section: "Appearance",
      },
      {
        id: "backgroundColor",
        label: "Background Color",
        type: "color",
        section: "Appearance",
      },
      {
        id: "primaryColor",
        label: "Primary Color",
        type: "color",
        section: "Appearance",
      },
    ],
    Media: [
      { id: "logoFile", label: "Logo", type: "file", section: "Media" },
      {
        id: "backgroundFile",
        label: "Background",
        type: "file",
        section: "Media",
      },
      {
        id: "imagePreviewFile",
        label: "Image Preview",
        type: "file",
        section: "Media",
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
}: {
  field: FormFieldConfig;
  formField: ControllerRenderProps<TemplateFormData, Path<TemplateFormData>>;
}) => {
  if (field.type === "file") {
    return (
      <Input
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          formField.onChange(file);
        }}
      />
    );
  }

  if (field.type === "checkbox") {
    return (
      <Checkbox
        {...formField}
        checked={formField.value}
        onCheckedChange={(checked) => {
          formField.onChange(checked);
        }}
      />
    );
  }

  if (field.type === "color") {
    return (
      <Input
        {...formField}
        type="color"
        className="h-10 w-full cursor-pointer"
        onChange={(e) => {
          formField.onChange(e.target.value);
        }}
      />
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

  const onSubmit = (values: TemplateFormData) => {
    setError(null);

    startTransition(async () => {
      try {
        if (!publicKey) {
          throw new Error("Wallet not connected");
        }

        const response = await createTemplate(
          values,
          subdomain,
          publicKey.toBase58(),
          {
            logoFile: values.logoFile,
            backgroundFile: values.backgroundFile,
            imagePreviewFile: values.imagePreviewFile,
          },
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
    <div className="flex flex-col h-full min-w-[320px]">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full md:w-[320px] flex flex-col h-full"
      >
        {/* Header */}
        <div className="px-4 bg-background w-full">
          <h1 className="font-bold text-center pt-5 text-lg">
            <Link href={process.env.NEXT_PUBLIC_API_URL!}>Memecook</Link>
          </h1>
          <Separator className="my-4" />
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="template">Template</TabsTrigger>
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
                      <Button
                        key={template.id}
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
                      >
                        {template.name}
                      </Button>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="edits" className="mt-4">
                <div className="space-y-4 px-4">
                  <Accordion type="single" collapsible>
                    {Object.entries(formConfig).map(([section, fields]) => (
                      <AccordionItem key={section} value={section}>
                        <AccordionTrigger>{section}</AccordionTrigger>
                        <AccordionContent>
                          {fields.map((field) => (
                            <FormField
                              key={field.id}
                              control={form.control}
                              name={field.id}
                              render={({ field: formField }) => (
                                <FormItem>
                                  <FormLabel>{field.label}</FormLabel>
                                  <FormControl>
                                    <FormFieldRenderer
                                      field={field}
                                      formField={formField}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>

              {/* Footer */}
              <div className="w-full px-4 py-4 bg-background">
                {!isWalletConnected ? (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Connect your wallet to create your template
                    </p>
                    <WalletMultiButtonDynamic className="w-full" />
                  </div>
                ) : (
                  <Button
                    type="submit"
                    className="w-full bg-violet-800 hover:bg-black"
                    disabled={isPending || !isWalletConnected}
                  >
                    {isPending ? "Creating..." : "Create Memesite"}
                  </Button>
                )}
                {error && (
                  <p className="text-sm text-red-500 mt-2 text-center">
                    {error}
                  </p>
                )}
              </div>
            </form>
          </Form>
        </div>
      </Tabs>
    </div>
  );
}
