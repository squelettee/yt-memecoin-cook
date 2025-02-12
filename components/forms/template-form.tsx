"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { templateSchema, TemplateFormData } from "@/schemas/templateSchema"
import { createTemplate } from "@/actions/templates-actions"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MenuIcon, ChartNoAxesCombinedIcon, InfoIcon, ImageIcon, LinkIcon, PaintRollerIcon, FileTextIcon } from "lucide-react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { useState, useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram } from '@solana/web3.js'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

interface TemplateFormProps {
  subdomain: string;
  onUpdate: (data: TemplateFormData) => void;
}

// Type for templates
type Template = {
  id: string;
  name: string;
  fields: string[];
};

const templates: Template[] = [
  {
    id: "minimal",
    name: "Minimal Template",
    fields: ["telegram", "twitter", "pumpFun", "instagram", "tiktok", "logoFile", "contractAddress", "ticker", "description", "backgroundFile"]
  },
  {
    id: "basic",
    name: "Basic Template",
    fields: [
      "projectName",
      "ticker",
      "description",
      "telegram",
      "twitter",
      "logoFile"
    ]
  },
  {
    id: "standard",
    name: "Standard Template",
    fields: [
      // Basic Information
      "projectName", "ticker", "description",
      // Social Networks
      "telegram", "twitter", "instagram",
      // Trading
      "dextools", "dexscreener",
      // Media
      "logoFile", "backgroundFile",
      // Appearance
      "headingColor"
    ]
  },
  {
    id: "pro",
    name: "Pro Template",
    fields: [
      // Basic Information
      "projectName", "ticker", "description", "contractAddress",
      // Documents
      "whitepaper", "coinGecko",
      // Social Networks
      "telegram", "twitter", "instagram", "tiktok",
      // Trading
      "dextools", "dexscreener", "birdeye",
      // Media
      "imagePreviewFile", "logoFile", "backgroundFile",
      // Appearance
      "headingFont", "bodyFont", "headingColor"
    ]
  },
  {
    id: "complete",
    name: "Complete Template",
    fields: [
      // Basic Information
      "projectName", "ticker", "description", "contractAddress",
      // Documents
      "whitepaper", "coinGecko", "coinMarketCap",
      // Social Networks
      "telegram", "twitter", "instagram", "tiktok",
      // Trading
      "dextools", "dexscreener", "birdeye", "jupiter",
      // Media
      "imagePreviewFile", "logoFile", "backgroundFile",
      // Appearance
      "headingFont", "bodyFont", "headingColor"
    ]
  }
];

// Add validation helpers
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function TemplateForm({ subdomain, onUpdate }: TemplateFormProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("minimal")
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  // Ajout de la vérification du wallet connecté
  const isWalletConnected = !!publicKey;

  // 1. Define your form.
  const form = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      projectName: "",
      background: "",
      birdeye: "",
      coinGecko: "",
      coinMarketCap: "",
      contractAddress: "",
      description: "",
      dexscreener: "",
      dextools: "",
      imagePreview: "",
      instagram: "",
      jupiter: false,
      logo: "",
      pumpFun: "",
      telegram: "",
      ticker: "",
      tiktok: "",
      twitter: "",
      whitepaper: "",
      headingColor: "#ffffff",
      domain: {
        name: subdomain.toLowerCase(),
      },
      imagePreviewFile: null,
      logoFile: null,
      backgroundFile: null,
      type: "minimal",
      headingFont: "geist",
      bodyFont: "geist",
    },
  })

  // Add function to handle template change
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    form.setValue("type", templateId);

    // Manually trigger update
    const currentData = form.getValues();
    onUpdate({
      ...currentData,
      type: templateId
    });
  };

  // Modify effect to include template
  useEffect(() => {
    const subscription = form.watch((data) => {
      onUpdate({
        ...data as TemplateFormData,
        type: selectedTemplate
      });
    });

    return () => subscription.unsubscribe();
  }, [form, onUpdate, selectedTemplate]);

  async function onSubmit(values: TemplateFormData) {
    setIsSubmitting(true);
    try {
      if (!connection || !publicKey) {
        throw new Error("Wallet not connected");
      }

      const recipientAddressString = process.env.NEXT_PUBLIC_RECIPIENT_SOLANA_ADDRESS;
      if (!recipientAddressString) {
        throw new Error("Recipient address not configured");
      }

      const recipientPubKey = new PublicKey(recipientAddressString);
      const transaction = new Transaction();

      const sendSolInstruction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipientPubKey,
        lamports: 0.001 * LAMPORTS_PER_SOL
      });

      transaction.add(sendSolInstruction);

      try {
        const signature = await sendTransaction(transaction, connection);
        console.log("Transaction sent:", signature);

        // Create template once transaction is confirmed
        const { template } = await createTemplate(values);

        // Redirect if needed
        const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN;
        if (baseDomain && template?.domain?.name) {
          window.location.href = `http://${template.domain.name}.${baseDomain}`;
        }
      } catch (error) {
        console.error("Error during confirmation:", error);
        throw new Error("Transaction confirmation failed");
      }

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const shouldShowField = (fieldName: string) => {
    const template = templates.find(t => t.id === selectedTemplate);
    return template?.fields.includes(fieldName);
  };

  const hasFieldsInSection = (sectionFields: string[]) => {
    return sectionFields.some(field => shouldShowField(field));
  };

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="template" className="w-full md:w-[400px] border-r flex flex-col h-full">
        {/* Fixed Header */}
        <div className="px-4 border-b bg-background w-full">
          <h1 className="font-bold text-center pt-5 text-lg sm:text-xl md:text-2xl lg:text-3xl ">
            <Link href={process.env.NEXT_PUBLIC_API_URL!}>Memecook</Link>
          </h1>
          <Separator className="my-4" />
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="template">Template</TabsTrigger>
            <TabsTrigger value="edits">Edit Content</TabsTrigger>
          </TabsList>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <TabsContent value="template" className="mt-4 px-4">
            <div className="pt-4">
              <div className="grid gap-4">
                {templates.map((template) => (
                  <Button
                    key={template.id}
                    onClick={() => handleTemplateChange(template.id)}
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    className="w-full"
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="edits" className="mt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pb-6 px-4">
                <Accordion type="single" collapsible className="w-full">
                  {/* Project Info */}
                  {hasFieldsInSection(["projectName", "ticker", "description", "contractAddress"]) && (
                    <AccordionItem value="project-info">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <InfoIcon size={20} />
                          Project Information
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        {shouldShowField("projectName") && (
                          <FormField
                            control={form.control}
                            name="projectName"
                            render={({ field }) => (
                              <FormItem className="px-1">
                                <FormLabel>Project Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter project name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        {shouldShowField("ticker") && (
                          <FormField
                            control={form.control}
                            name="ticker"
                            render={({ field }) => (
                              <FormItem className="px-1">
                                <FormLabel>Ticker</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter ticker symbol" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        {shouldShowField("description") && (
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem className="px-1">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter project description" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        {shouldShowField("contractAddress") && (
                          <FormField
                            control={form.control}
                            name="contractAddress"
                            render={({ field }) => (
                              <FormItem className="px-1">
                                <FormLabel>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>Contract Address</TooltipTrigger>
                                      <TooltipContent>
                                        <p>The address of your token&apos;s smart contract on the blockchain</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter contract address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {/* Documents */}
                  {hasFieldsInSection(["whitepaper", "coinGecko", "coinMarketCap"]) && (
                    <AccordionItem value="documents">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <FileTextIcon size={20} />
                          Documents
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        {shouldShowField("whitepaper") && (
                          <FormField
                            control={form.control}
                            name="whitepaper"
                            render={({ field }) => (
                              <FormItem className="px-1">
                                <FormLabel>Whitepaper</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter whitepaper link" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        {shouldShowField("coinGecko") && (
                          <FormField
                            control={form.control}
                            name="coinGecko"
                            render={({ field }) => (
                              <FormItem className="px-1">
                                <FormLabel>CoinGecko</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter CoinGecko link" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        {shouldShowField("coinMarketCap") && (
                          <FormField
                            control={form.control}
                            name="coinMarketCap"
                            render={({ field }) => (
                              <FormItem className="px-1">
                                <FormLabel>CoinMarketCap</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter CoinMarketCap link" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {/* Social Links */}
                  {hasFieldsInSection(["telegram", "twitter", "instagram", "tiktok"]) && (
                    <AccordionItem value="social-links">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <LinkIcon size={20} />
                          Social Links
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        {shouldShowField("telegram") && (
                          <FormField
                            control={form.control}
                            name="telegram"
                            render={({ field }) => (
                              <FormItem className="px-1">
                                <FormLabel>Telegram</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="https://t.me/your-group"
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      if (!isValidUrl(e.target.value)) {
                                        form.setError('telegram', {
                                          type: 'manual',
                                          message: 'Please enter a valid URL'
                                        });
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        {shouldShowField("twitter") && (
                          <FormField
                            control={form.control}
                            name="twitter"
                            render={({ field }) => (
                              <FormItem className="px-1">
                                <FormLabel>Twitter</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter Twitter link" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        {shouldShowField("instagram") && (
                          <FormField
                            control={form.control}
                            name="instagram"
                            render={({ field }) => (
                              <FormItem className="px-1">
                                <FormLabel>Instagram</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter Instagram link" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        {shouldShowField("tiktok") && (
                          <FormField
                            control={form.control}
                            name="tiktok"
                            render={({ field }) => (
                              <FormItem className="px-1">
                                <FormLabel>TikTok</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter TikTok link" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {/* Trading */}
                  {hasFieldsInSection(["dextools", "dexscreener", "birdeye", "jupiter"]) && (
                    <AccordionItem value="trading">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <ChartNoAxesCombinedIcon size={20} />
                          Trading
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        {shouldShowField("dextools") && (
                          <FormField
                            control={form.control}
                            name="dextools"
                            render={({ field }) => (
                              <FormItem className="px-1">
                                <FormLabel>DEXTools</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter DEXTools link" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        {shouldShowField("dexscreener") && (
                          <FormField
                            control={form.control}
                            name="dexscreener"
                            render={({ field }) => (
                              <FormItem className="px-1">
                                <FormLabel>DEXScreener</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter DEXScreener link" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        {shouldShowField("birdeye") && (
                          <FormField
                            control={form.control}
                            name="birdeye"
                            render={({ field }) => (
                              <FormItem className="px-1">
                                <FormLabel>Birdeye</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter Birdeye link" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        {shouldShowField("jupiter") && (
                          <FormField
                            control={form.control}
                            name="jupiter"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start px-1">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Jupiter</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {/* Media */}
                  {hasFieldsInSection(["imagePreviewFile", "logoFile", "backgroundFile"]) && (
                    <AccordionItem value="media">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <ImageIcon size={20} />
                          Media
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        {shouldShowField("imagePreviewFile") && (
                          <FormField
                            control={form.control}
                            name="imagePreviewFile"
                            render={({ field: { onChange, ...field } }) => (
                              <FormItem className="px-1">
                                <FormLabel>Preview Image</FormLabel>
                                <FormControl>
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0] || null;
                                      onChange(file);
                                    }}
                                    {...field}
                                    value={undefined}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {shouldShowField("logoFile") && (
                          <FormField
                            control={form.control}
                            name="logoFile"
                            render={({ field: { onChange, ...field } }) => (
                              <FormItem className="px-1">
                                <FormLabel>Logo</FormLabel>
                                <FormControl>
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0] || null;
                                      onChange(file);
                                    }}
                                    {...field}
                                    value={undefined}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {shouldShowField("backgroundFile") && (
                          <FormField
                            control={form.control}
                            name="backgroundFile"
                            render={({ field: { onChange, ...field } }) => (
                              <FormItem className="px-1">
                                <FormLabel>Background Image</FormLabel>
                                <FormControl>
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0] || null;
                                      onChange(file);
                                    }}
                                    {...field}
                                    value={undefined}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {/* Appearance */}
                  {hasFieldsInSection(["headingFont", "bodyFont", "headingColor"]) && (
                    <AccordionItem value="appearance">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <PaintRollerIcon size={20} />
                          Appearance
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="headingFont"
                          render={({ field }) => (
                            <FormItem className="px-1">
                              <FormLabel>Heading Font</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a font" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="geist">Geist</SelectItem>
                                    <SelectItem value="inter">Inter</SelectItem>
                                    <SelectItem value="roboto">Roboto</SelectItem>
                                    <SelectItem value="montserrat">Montserrat</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="bodyFont"
                          render={({ field }) => (
                            <FormItem className="px-1">
                              <FormLabel>Body Font</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a font" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="geist">Geist</SelectItem>
                                    <SelectItem value="inter">Inter</SelectItem>
                                    <SelectItem value="roboto">Roboto</SelectItem>
                                    <SelectItem value="montserrat">Montserrat</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="headingColor"
                          render={({ field }) => (
                            <FormItem className="px-1">
                              <FormLabel>Heading Color</FormLabel>
                              <Input type="color" value={field.value} onChange={field.onChange} />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {/* Menu - Will only show if fields are added */}
                  {hasFieldsInSection([]) && (
                    <AccordionItem value="menu">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <MenuIcon size={20} />
                          Menu
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        {/* Add your menu fields here */}
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              </form>
            </Form>
          </TabsContent>
        </div>
      </Tabs>

      {/* Fixed Footer - Modification du footer */}
      <div className="w-full md:w-[400px] border-r px-4 py-4 border-t bg-background">
        <div className="flex flex-col gap-4 items-center">
          {!isWalletConnected ? (
            <div className="w-full flex flex-col gap-2 items-center">
              <p className="text-sm text-muted-foreground text-center">
                Connect your wallet to create your template
              </p>
              <WalletMultiButton className="w-full px-6 py-6" />
            </div>
          ) : (
            <Button
              className="w-full px-6 py-6 bg-secondary-foreground"
              type="submit"
              disabled={isSubmitting}
              onClick={form.handleSubmit(onSubmit)}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Creating...
                </>
              ) : (
                'Create Template'
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
