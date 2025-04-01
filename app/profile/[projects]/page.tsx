"use client";

import { getTemplatesByAddress } from "@/lib/queries/get-templates-by-address";
import { HomeNavbar } from "@/components/home/home-navbar";
import { HomeFooter } from "@/components/home/home-footer";
import { ProjectsEdits } from "@/components/projects-edit";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Template } from "@/interfaces/template";
import { use } from "react";

interface GetProjectsPageProps {
  params: Promise<{
    projects: string;
  }>;
}

export default function GetProjectsPage({ params }: GetProjectsPageProps) {
  const resolvedParams = use(params);
  const { publicKey } = useWallet();
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Rediriger si l'utilisateur n'est pas connecté
    if (!publicKey) {
      router.push("/");
      return;
    }

    // Vérifier si l'adresse dans l'URL correspond à l'adresse connectée
    if (publicKey.toString() !== resolvedParams.projects) {
      router.push(`/profile/${publicKey.toString()}`);
      return;
    }

    // Charger les templates
    const fetchTemplates = async () => {
      try {
        const fetchedTemplates = await getTemplatesByAddress(
          publicKey.toString(),
        );
        setTemplates(fetchedTemplates as Template[]);
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [publicKey, resolvedParams.projects, router]);

  // Afficher un état de chargement pendant la vérification
  if (loading) {
    return (
      <>
        <HomeNavbar />
        <main className="w-full flex items-center flex-col relative min-h-[82vh]">
          <div className="flex items-center justify-center h-full">
            <p>Loading...</p>
          </div>
        </main>
        <HomeFooter />
      </>
    );
  }

  return (
    <>
      <HomeNavbar />
      <main className="w-full flex items-center flex-col relative min-h-[82vh]">
        <div className="relative w-full flex items-center justify-center flex-col">
          <ProjectsEdits templates={templates} />
        </div>
      </main>
      <HomeFooter />
    </>
  );
}
