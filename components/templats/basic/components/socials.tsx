import { TemplateFormData } from "@/schemas/templateSchema";
import { Button } from "@/components/ui/button";
import { BsTelegram, BsTwitterX } from "react-icons/bs";

export function BasicSocials({
  templateData,
}: {
  templateData: TemplateFormData;
}) {
  const hasSocials = templateData.telegram || templateData.twitter;

  return (
    <section className="w-full max-w-md mx-auto px-4">
      <div className="flex flex-col gap-3 bg-background/40 backdrop-blur-sm p-6 rounded-xl">
        {!hasSocials && (
          <p className="text-center text-sm text-foreground/80">
            Add your social links to connect with your community
          </p>
        )}
        <div className="flex flex-col gap-3">
          {templateData.telegram && (
            <Button
              asChild
              variant="outline"
              className="h-12 text-base bg-background/80 hover:bg-background"
            >
              <a
                href={templateData.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <BsTelegram size={20} />
                Join Telegram
              </a>
            </Button>
          )}
          {templateData.twitter && (
            <Button
              asChild
              variant="outline"
              className="h-12 text-base bg-background/80 hover:bg-background"
            >
              <a
                href={templateData.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <BsTwitterX size={18} />
                Follow Twitter
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
