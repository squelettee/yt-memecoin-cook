"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Edit, ExternalLink, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Template } from "@/interfaces/template";
import { useState } from "react";
import localFont from "next/font/local";
const dynapuff = localFont({
  src: "../public/fonts/DynaPuff/DynaPuff-VariableFont_wdth,wght.ttf",
  weight: "800",
});

interface ProjectsEditsProps {
  templates: Template[];
}

export function ProjectsEdits({ templates }: ProjectsEditsProps) {
  const [editTemplate, setEditTemplate] = useState<Template | null>(null);

  const router = useRouter();
  const handleEdit = (subdomain: string, template: Template) => {
    setEditTemplate(template);
  };

  return (
    <div className="container py-8 mx-auto ">
      {editTemplate ? (
        <div>
          <h1 className="text-2xl font-bold mb-6">
            Edit Project: {editTemplate.projectName}
          </h1>
          <Button
            variant="outline"
            onClick={() => setEditTemplate(null)}
            className="mb-4"
          >
            Back to Projects
          </Button>
        </div>
      ) : (
        <>
          <div
            className={`flex justify-between items-center mb-6 ${dynapuff.className}`}
          >
            <h1 className="text-2xl font-bold">My Projects</h1>
            <Button
              onClick={() => router.push("/")}
              className={`h-12 bg-violet-800 hover:bg-black text-primary-foreground font-bold text-lg ${dynapuff.className}`}
            >
              Create New Project
              <Plus className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {templates.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500 mb-6">
                You haven&apos;t created any projects yet.
              </p>
              <Button onClick={() => router.push("/")}>
                Create Your First Project
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="p-4 border rounded-lg bg-white"
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
                      className="w-full"
                      disabled
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Project
                    </Button>

                    <Link
                      href={`http://${template.domain?.name}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}`}
                      target="_blank"
                      className="w-full"
                    >
                      <Button variant="ghost" className="w-full">
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
