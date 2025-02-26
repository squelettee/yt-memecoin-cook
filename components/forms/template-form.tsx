"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { templateSchema, TemplateFormData } from "@/schemas/templateSchema"
import { createTemplate } from "@/actions/template/create-template"
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
import { useWallet } from '@solana/wallet-adapter-react'
import dynamic from 'next/dynamic'
import { templates } from "@/config/templates"
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  {
    ssr: false
  }
)

interface TemplateFormProps {
  subdomain: string;
  onUpdate: (data: TemplateFormData) => void;
}

export function TemplateForm({ subdomain, onUpdate }: TemplateFormProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("terminal")
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { publicKey } = useWallet()

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
        address: publicKey?.toBase58() || ""
      },
    },
  })

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    form.setValue("type", templateId);

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


  // Ajout d'un useEffect pour mettre à jour l'adresse quand le wallet change
  useEffect(() => {
    if (publicKey) {
      form.setValue('user.address', publicKey.toBase58());
    }
  }, [publicKey, form]);

  async function onSubmit(values: TemplateFormData) {
    setIsSubmitting(true);

    if (!publicKey) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Préparation des données
      const formData = {
        projectName: values.projectName || "",
        ticker: values.ticker || "",
        description: values.description || "",
        contractAddress: values.contractAddress || "",
        whitepaper: values.whitepaper || "",
        coinGecko: values.coinGecko || "",
        coinMarketCap: values.coinMarketCap || "",
        telegram: values.telegram || "",
        twitter: values.twitter || "",
        instagram: values.instagram || "",
        tiktok: values.tiktok || "",
        dextools: values.dextools || "",
        dexscreener: values.dexscreener || "",
        birdeye: values.birdeye || "",
        jupiter: values.jupiter || false,
        headingFont: values.headingFont || "",
        bodyFont: values.bodyFont || "",
        headingColor: values.headingColor || "",
        backgroundColor: values.backgroundColor || "",
        type: selectedTemplate,
        domain: {
          name: subdomain.toLowerCase()
        },
        user: {
          address: publicKey.toBase58()
        }
      };

      // Création du template
      const response = await createTemplate(formData);

      if (!response.success) {
        throw new Error(response.error || "Échec de la création du template");
      }

      // Redirection
      const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN;
      if (baseDomain && response.template?.domain?.name) {
        window.location.href = `https://${response.template.domain.name}.${baseDomain}`;
      }

    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      // Gérer l'erreur (afficher un message à l'utilisateur, etc.)
    } finally {
      setIsSubmitting(false);
    }
  }

  // Modification de handleSubmit pour plus de détails sur les erreurs
  const handleSubmit = async () => {
    const formState = form.getValues();

    try {
      // On ne vérifie plus que les champs qui ont des valeurs par défaut
      if (!formState.user?.address) {
        console.error("L'adresse de l'utilisateur est requise");
        return;
      }

      // Validation complète du formulaire
      const validationResult = await form.trigger();
      if (!validationResult) {
        return;
      }

      await form.handleSubmit(onSubmit)();
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    }
  };

  const shouldShowField = (fieldName: string) => {
    const template = templates.find(t => t.id === selectedTemplate);
    return template?.fields.includes(fieldName);
  };

  const hasFieldsInSection = (sectionFields: string[]) => {
    return sectionFields.some(field => shouldShowField(field));
  };

  // Ajout d'une fonction pour empêcher la soumission par défaut
  const handleFormKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="template" className="w-full md:w-[400px] border-r flex flex-col h-full">
        {/* Fixed Header */}
        <div className="px-4 border-b bg-background w-full">
          <h1 className="font-bold text-center pt-5 text-lg sm:text-xl md:text-2xl lg:text-3xl ">
            <Link href={process.env.NEXT_PUBLIC_API_URL!}>Memecook 🐸</Link>
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
              <form
                onSubmit={(e) => e.preventDefault()}
                onKeyPress={handleFormKeyPress}
                className="space-y-4 pb-6 px-4"
              >
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
                                  <Input placeholder="https://t.me/your-group" {...field} />
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
              <WalletMultiButtonDynamic className="w-full px-6 py-6" />
            </div>
          ) : (
            <Button
              className="w-full px-6 py-6 bg-secondary-foreground"
              type="button"
              disabled={isSubmitting || !isWalletConnected}
              onClick={handleSubmit}
            >
              {isSubmitting ? 'Création...' : 'Créer le Template'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
