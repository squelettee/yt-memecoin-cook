"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRightIcon, Edit, ExternalLink } from "lucide-react";
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

  // Rediriger vers la page d'accueil si l'utilisateur est déconnecté
  useEffect(() => {
    if (!publicKey) {
      router.push(process.env.NEXT_PUBLIC_BASE_URL || "/");
    }
  }, [publicKey, router]);

  const handleEdit = (subdomain: string, template: Template) => {
    setEditTemplate(template);
  };

  // Si l'utilisateur n'est pas connecté, ne pas afficher le contenu
  if (!publicKey) {
    return null;
  }

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
                  className="p-4 border rounded-lg bg-white hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {template.logo ? (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={template.logo}
                          alt={template.projectName || "Project"}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-800 font-bold">
                        {(template.projectName || "P").charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold">
                        {template.domain?.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleEdit(template.domain?.name || "", template)
                      }
                      className="w-full hover:bg-pink-50 hover:border-pink-300 transition-colors"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Project
                    </Button>

                    <Link
                      href={`http://${template.domain?.name}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}`}
                      target="_blank"
                      className="w-full"
                    >
                      <Button
                        variant="ghost"
                        className="w-full hover:bg-gray-50"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Site
                      </Button>
                    </Link>
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
