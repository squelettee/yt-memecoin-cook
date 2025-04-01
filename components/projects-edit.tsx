"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRightIcon, Edit, ExternalLink, Copy, Check, BarChart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Template } from "@/interfaces/template";
import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import localFont from "next/font/local";
import { CreateTemplateForm } from "@/components/forms/template-form-create";

const dynapuff = localFont({
  src: "../public/fonts/DynaPuff/DynaPuff-VariableFont_wdth,wght.ttf",
  weight: "800",
});

interface ProjectsEditsProps {
  templates: Template[];
}

export function ProjectsEdits({ templates }: ProjectsEditsProps) {
  const [editTemplate, setEditTemplate] = useState<Template | null>(null);
  const { publicKey } = useWallet();
  const router = useRouter();
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Rediriger vers la page d'accueil si l'utilisateur est déconnecté
  useEffect(() => {
    if (!publicKey) {
      router.push(process.env.NEXT_PUBLIC_BASE_URL || "/");
    }
  }, [publicKey, router]);

  const handleEdit = (subdomain: string, template: Template) => {
    setEditTemplate(template);
  };

  const handleCopy = async (url: string, templateId: number) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(templateId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Si l'utilisateur n'est pas connecté, ne pas afficher le contenu
  if (!publicKey) {
    return null;
  }

  const getRemainingTime = (expirationDate: Date) => {
    const now = new Date();
    const expiration = new Date(expirationDate);
    const diffTime = expiration.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="container py-8 mx-auto">
      {editTemplate ? (
        <div>
          <div className="mb-6 flex justify-between items-center">
            <h1 className={`text-3xl ${dynapuff.className} text-pink-600`}>
              ✏️ Edit Mode
            </h1>
            <Button
              variant="outline"
              onClick={() => setEditTemplate(null)}
              className="hover:bg-pink-50 border-pink-200"
            >
              ← Back to Projects
            </Button>
          </div>

          {/* Utiliser le composant CreateTemplateForm avec le template existant */}
          <div className="bg-white rounded-lg border border-pink-100 shadow-sm overflow-hidden">
            {editTemplate.domain?.name && (
              <CreateTemplateForm
                subdomain={editTemplate.domain.name}
                existingTemplate={editTemplate}
                isEditing={true}
              />
            )}
          </div>
        </div>
      ) : (
        <>
          {templates.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500 mb-6">
                You haven&apos;t created any projects yet.
              </p>
              <Button
                onClick={() => router.push("/")}
                className={`h-12 bg-violet-800 hover:bg-black text-primary-foreground font-bold text-lg ${dynapuff.className}`}
              >
                Create Your First Project
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="flex flex-col p-6 border rounded-lg bg-white hover:shadow-lg transition-all duration-200"
                >
                  {/* En-tête avec logo et nom */}
                  <div className="flex items-center gap-4 mb-6">
                    {template.logo ? (
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                        <Image
                          src={template.logo}
                          alt={template.projectName || "Project"}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 text-2xl font-bold border border-violet-200">
                        {(template.projectName || "P").charAt(0)}
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-violet-600">
                        {template.domain?.name}
                      </h3>
                      {template.expirationDate && (
                        <span className={`inline-block text-sm px-3 py-1 rounded-full ${getRemainingTime(template.expirationDate) <= 7
                          ? 'bg-pink-50 text-pink-600 border border-pink-200'
                          : getRemainingTime(template.expirationDate) <= 30
                            ? 'bg-amber-50 text-amber-600 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          }`}>
                          {getRemainingTime(template.expirationDate)} days remaining
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto space-y-3">
                    <Button
                      variant="outline"
                      onClick={() => handleEdit(template.domain?.name || "", template)}
                      className="w-full bg-violet-50 text-violet-600 border-violet-200 hover:bg-violet-100"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Project
                    </Button>

                    <Link
                      href={`http:/${template.domain?.name}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}`}
                      target="_blank"
                      className="block w-full"
                    >
                      <Button
                        variant="outline"
                        className="w-full bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-100"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Live Site
                      </Button>
                    </Link>

                    <Button
                      variant="outline"
                      onClick={() => template.id && handleCopy(`http:/${template.domain?.name}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}`, template.id)}
                      className="w-full bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100"
                    >
                      {copiedId === template.id ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy URL
                        </>
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      disabled
                      className="w-full bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                    >
                      <BarChart className="h-4 w-4 mr-2" />
                      Analytics (Coming Soon)
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
