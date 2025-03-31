"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import localFont from "next/font/local";
import { ArrowRightIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { subscribeToNewsletter } from "@/actions/newletter/subscribe";
import { updateTemplate } from "@/actions/template/update-template";
import bs58 from "bs58";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  {
    ssr: false,
  },
);

export interface TemplateFormProps {
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
  isEditing?: boolean;
}

const dynapuff = localFont({
  src: "../../public/fonts/DynaPuff/DynaPuff-VariableFont_wdth,wght.ttf",
  weight: "800",
});

export function TemplateForm({
  onUpdate,
  templateData,
  subdomain,
  files,
  setFiles,
  isEditing = false,
}: TemplateFormProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    templateData.type || "template1",
  );
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { publicKey, wallet, signMessage } = useWallet();
  const isWalletConnected = !!publicKey;
  const [activeTab, setActiveTab] = useState<string>(
    isEditing ? "edits" : "template",
  );
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [showDurationDialog, setShowDurationDialog] = useState(false);
  const [affiliateCode, setAffiliateCode] = useState<string>("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);

  const form = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: templateData,
    mode: "onSubmit",
  });

  const formConfig = useMemo(() => {
    return formConfigByTemplate[selectedTemplate];
  }, [selectedTemplate]);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    form.setValue("type", templateId);
    const currentValues = form.getValues();
    onUpdate({ ...currentValues, type: templateId });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(() => {
      if (isEditing) {
        const formData = form.getValues();
        onSubmit({ ...formData });
      } else {
        setShowTermsDialog(true);
      }
    })();
  };

  const handleTermsAccept = async () => {
    if (!acceptedTerms) return;

    setShowTermsDialog(false);
    setShowDurationDialog(true);
  };

  const handleDurationSelect = (duration: string) => {
    setSelectedDuration(duration);
    const formData = form.getValues();
    onSubmit({ ...formData, affiliateCode, deploymentDuration: duration });
    setShowDurationDialog(false);
  };

  const onSubmit = async (
    data: TemplateFormData & {
      affiliateCode?: string;
      deploymentDuration?: string;
    },
  ) => {
    setError(null);

    startTransition(async () => {
      try {
        if (!publicKey) {
          throw new Error("Wallet not connected");
        }

        if (isEditing) {
          try {
            if (!wallet || !publicKey) {
              throw new Error("Wallet not connected or not initialized");
            }

            // Créer un message à signer
            const message = `Update template: ${subdomain} at ${new Date().toISOString()}`;

            // Demander à l'utilisateur de signer le message
            const encodedMessage = new TextEncoder().encode(message);

            // Use the signMessage from the wallet context
            const signatureBytes = await signMessage!(encodedMessage);
            const signature = bs58.encode(signatureBytes);

            // Envoyer la signature avec les données du formulaire
            const response = await updateTemplate(
              {
                ...data,
                subdomain: subdomain,
                signature: signature,
                message: message,
                publicKey: publicKey.toBase58(),
              },
              {
                logo: files.logoFile,
                background: files.backgroundFile,
                preview: files.previewImage,
              }
            );

            if (!response.success) {
              throw new Error(response.error || "Failed to update template");
            }

            alert("Template updated successfully!");

            const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN;
            if (baseDomain && subdomain) {
              window.location.href = `http://${subdomain}.${baseDomain}`;
            }
          } catch (error) {
            if (error instanceof Error && error.message.includes("User rejected")) {
              setError("Signature rejected. You must sign the message to update your template.");
            } else {
              setError(error instanceof Error ? error.message : "An error occurred during signature");
            }
          }
          return;
        }

        const newsletterResponse = await subscribeToNewsletter(email);

        if (!newsletterResponse.success) {
          throw new Error(
            newsletterResponse.error || "Failed to subscribe to newsletter",
          );
        }

        const response = await createTemplate(
          data,
          subdomain,
          publicKey.toBase58(),
          selectedDuration || "1month",
          {
            logo: files.logoFile,
            background: files.backgroundFile,
            preview: files.previewImage,
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
    <div className="flex flex-col h-full min-w-[320px] overflow-y-auto">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full md:w-[320px] flex flex-col h-full"
      >
        {/* Header */}
        <div className="px-4 bg-background w-full">
          <h1
            className={`font-bold text-center pt-5 text-3xl ${dynapuff.className}`}
          >
            <Link href={process.env.NEXT_PUBLIC_BASE_URL!}>Memecook 🍳</Link>
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
            <form onSubmit={handleSubmit}>
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
                          className={`w-full h-24 flex flex-col items-center justify-center gap-2 transition-all duration-300 rounded-xl border-2 ${selectedTemplate === template.id
                            ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-400 shadow-lg shadow-blue-200"
                            : "hover:border-blue-400 hover:bg-blue-50 border-blue-200"
                            }`}
                          disabled={isEditing}
                        >
                          <span className="text-lg font-bold">
                            {template.name}
                          </span>

                          <span className="text-sm font-medium px-4 py-1 rounded-full bg-blue-100 text-blue-800">
                            beta (free)
                          </span>
                        </Button>
                        {isEditing && selectedTemplate === template.id && (
                          <div className="absolute inset-0 bg-black/10 flex items-center justify-center rounded-xl">
                            <div className="bg-white px-4 py-2 rounded-md text-sm font-medium text-gray-700 flex items-center gap-2 shadow-sm">
                              <span>👉</span> Please use the{" "}
                              <span className="font-bold">Edit Content</span>{" "}
                              tab
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="edits" className="mt-4">
                <div className="space-y-5 px-4">
                  <Accordion type="single" collapsible>
                    {/* Map through each section of form fields */}
                    {Object.entries(formConfig).map(([section, fields]) => (
                      <AccordionItem key={section} value={section} className="">
                        {/* Section header */}
                        <AccordionTrigger className="px-4 py-2 hover:bg-violet-50 text-md font-bold">
                          {section === "General" && "🥘 "}
                          {section === "Hero" && "🍖 "}
                          {section === "About" && "🥑 "}
                          {section === "Features" && "🥪 "}
                          {section === "Roadmap" && "🥨 "}
                          {section === "FAQ" && "🥐 "}
                          {section === "Footer" && "🥯 "}
                          {section === "Links" && "🥞 "}
                          {section === "Navbar" && "🥓 "}
                          {section === "Styling" && "🥖 "}
                          {section === "HowToBuy" && "🥗 "}
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
                        To {isEditing ? "update" : "create"} your template,
                        please connect your wallet first
                      </p>
                    </div>
                    <WalletMultiButtonDynamic className="w-full max-w-md py-3 rounded-lg border-2 border-violet-300 bg-white hover:bg-violet-100 transition-colors shadow-sm" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 p-4">
                    <Button
                      type="submit"
                      className={`w-full max-w-md py-6 rounded-lg bg-violet-800 hover:bg-black text-primary-foreground font-bold text-lg ${dynapuff.className}`}
                      disabled={isPending || !isWalletConnected}
                    >
                      {isPending ? (
                        <span
                          className={`flex items-center gap-2 ${dynapuff.className}`}
                        >
                          <span className="animate-spin">🍳</span>{" "}
                          {isEditing ? "Updating..." : "Creating..."}
                        </span>
                      ) : (
                        <>
                          {isEditing ? "Update Project" : "I'm done cooking"}
                          <ArrowRightIcon className="w-5 h-5 ml-2" />
                        </>
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
      {/* Terms and Conditions Dialog */}
      {!isEditing && (
        <Dialog open={showTermsDialog} onOpenChange={setShowTermsDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle
                className={`text-center text-2xl font-bold ${dynapuff.className}`}
              >
                Terms & Conditions
              </DialogTitle>
              <DialogDescription className="text-center pt-4">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    By creating a template, you agree to the following terms and
                    conditions:
                  </p>

                  <div className="space-y-3 text-left bg-violet-50 p-4 rounded-lg border border-violet-200">
                    <div className="flex items-start gap-2">
                      <span className="text-violet-600 mt-1">•</span>

                      <span className="text-sm text-violet-900">
                        This is a one shot template creation service. You
                        can&apos;t edit the template once it&apos;s created.
                        (may change in the future)
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="text-violet-600 mt-1">•</span>
                      <span className="text-sm text-violet-900">
                        Memecook is not responsible for the content of the
                        template.
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="text-violet-600 mt-1">•</span>
                      <span className="text-sm text-violet-900">
                        Memecook can modify or cancel the template at any time
                        if the template is offensive or violates any laws.
                      </span>
                    </div>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-center bg-violet-100 rounded-lg p-3">
                  <p className="text-sm font-medium text-violet-800">
                    memecook.contact@proton.me
                  </p>
                </div>
                <Input
                  type="email"
                  placeholder="Enter your email to be validated as an early adopter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mb-4"
                />
                <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) =>
                      setAcceptedTerms(checked as boolean)
                    }
                    className="border-2 border-violet-400"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I accept the terms and conditions
                  </label>
                </div>
              </div>
              <Button
                onClick={handleTermsAccept}
                disabled={!acceptedTerms}
                className="w-full py-6 bg-violet-800 hover:bg-violet-900 text-white"
              >
                Accept and Continue
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Duration Selection Dialog */}
      {!isEditing && (
        <Dialog open={showDurationDialog} onOpenChange={setShowDurationDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle
                className={`text-center text-2xl ${dynapuff.className}`}
              >
                Choose Deployment Option
              </DialogTitle>
              <DialogDescription className="text-center pt-2">
                Select your deployment option
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                type="text"
                placeholder="Enter promo code for discount"
                value={affiliateCode}
                onChange={(e) => setAffiliateCode(e.target.value)}
                className="w-full mb-4"
                disabled={true}
              />
              <div className="grid grid-cols-1 gap-4">
                <Button
                  onClick={() => handleDurationSelect("1week")}
                  className="py-6 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  1 month (beta free)
                </Button>
                <Button
                  onClick={() => handleDurationSelect("1month")}
                  className="py-6 bg-gray-400 cursor-not-allowed text-gray-600"
                  disabled
                >
                  3 months (+0.03 SOL)
                </Button>
                <Button
                  onClick={() => handleDurationSelect("3months")}
                  className="py-6 bg-gray-400 cursor-not-allowed text-gray-600"
                  disabled
                >
                  6 months (+0.05 SOL)
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
