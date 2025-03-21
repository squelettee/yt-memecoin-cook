import { TemplateFormData } from "@/schemas/templateSchema";
import { Navbar } from "./components/Navbar";

export default function Template1({
  templateData,
}: {
  templateData: TemplateFormData;
}) {
  return (
    <main className="w-full h-full">
      <Navbar templateData={templateData} />
    </main>
  );
}
