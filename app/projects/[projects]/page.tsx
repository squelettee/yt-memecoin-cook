import { getTemplatesByAddress } from "@/lib/queries/get-templates-by-address";
import { HomeNavbar } from "@/components/home/home-navbar";
import { HomeFooter } from "@/components/home/home-footer";
import { ProjectsEdits } from "@/components/projects-edit";

interface GetProjectsPageProps {
  params: Promise<{
    address: string;
  }>;
}

export default async function GetProjectsPage({
  params,
}: GetProjectsPageProps) {
  const { address } = await params;
  const templates = await getTemplatesByAddress(address);
  return (
    <>
      <HomeNavbar />
      <main className="w-full flex items-center justify-center flex-col relative">
        <div className="relative w-full flex items-center justify-center flex-col">
          <ProjectsEdits templates={templates} />
        </div>
      </main>
      <HomeFooter />
    </>
  );
}
