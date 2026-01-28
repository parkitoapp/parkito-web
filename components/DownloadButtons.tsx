"use client";

import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/mixpanel";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import { slugify } from "@/lib/slugify";

export default function DownloadButtons() {
  const pathname = usePathname();
  const prettifiedPathname = slugify(pathname);
  console.log(prettifiedPathname);

  const handleDownloadClick = () => {
    trackEvent("downloadapp_clicked", {
      page: pathname,
    });
  };

  return (
    <Button
      variant="default"
      size={"lg"}
      className="min-w-[200px]"
      onClick={handleDownloadClick}
      asChild
    >
      <Link href="https://parkito.onelink.me/86z0/wosp70hz" target="_blank" referrerPolicy="strict-origin-when-cross-origin">
        <Download />
        Scarica l&apos;app
      </Link>
    </Button>
  );
}
