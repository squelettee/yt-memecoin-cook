"use client";

import { format } from "timeago.js";
import { TemplateType } from "@/schemas/templateSchema";
import { useRouter } from "next/navigation";
import { Table, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { InfoIcon } from "lucide-react";
import Image from "next/image";
import { ShadowButton } from "@/components/ui/shadow-button";

export function TemplatesTable({ templates }: { templates: TemplateType[] }) {
  const router = useRouter();

  if (!templates.length) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        <InfoIcon className="mr-2 h-4 w-4" />
        No templates available at the moment
      </div>
    );
  }

  const handleRowClick = (domainName: string) => {
    router.push(`http://${domainName}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}`);
  };

  return (
    <div className="rounded-md border bg-background/80 backdrop-blur-sm">
      <Table>
        <TableBody>
          {templates.map((template) => (
            <TableRow
              key={template.id}
              className="hover:bg-muted/50 cursor-pointer"
              onClick={() =>
                template.domain?.name && handleRowClick(template.domain.name)
              }
            >
              <TableCell className="flex items-center justify-center">
                <Image
                  src={template.logo || `${process.env.NEXT_PUBLIC_BASE_URL}/assets/upload_image.jpeg`}
                  alt={`${template.domain?.name} logo`}
                  width={48}
                  height={48}
                  className="h-10 w-10 md:h-12 md:w-12 object-cover border-2 rounded-full"
                  unoptimized
                />
              </TableCell>

              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground line-clamp-1">
                    {template.domain?.name}.memecook.fun
                  </span>
                </div>
              </TableCell>

              <TableCell className="table-cell">
                <span className="font-mono bg-muted px-2 py-1 rounded-md text-sm">
                  {template.ticker || "N/A"}
                </span>
              </TableCell>

              <TableCell className="table-cell">
                <div className="flex gap-1 md:gap-2 justify-end">
                  {template.twitter && (
                    <ShadowButton
                      icon="/socials/twitter.png"
                      iconAlt="Twitter"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(template.twitter, '_blank');
                      }}
                    />
                  )}
                  {template.telegram && (
                    <ShadowButton
                      icon="/socials/telegram.webp"
                      iconAlt="Telegram"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(template.telegram, '_blank');
                      }}
                    />
                  )}
                </div>
              </TableCell>

              <TableCell className="hidden md:table-cell text-right">
                <time
                  title={new Date(
                    template.domain?.createdAt || Date.now(),
                  ).toLocaleString()}
                  className="text-sm text-muted-foreground"
                >
                  {format(template.domain?.createdAt || new Date(), "en")}
                </time>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
