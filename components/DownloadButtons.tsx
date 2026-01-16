"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/mixpanel";

export default function DownloadButtons() {
  const pathname = usePathname();

  const handleDownloadClick = (store: "apple" | "google") => {
    trackEvent("downloadapp_clicked", {
      store,
      page: pathname,
    });
  };

  return (
    <div className="flex gap-4 relative z-10">
      <Link
        href="https://apps.apple.com/it/app/parkito-park-sharing/id6446240996"
        data-download-store="apple"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="apple download button"
        onClick={() => handleDownloadClick("apple")}
      >
        <Image
          src="/applebtn.webp"
          alt="App Store"
          width={120}
          height={40}
          className="h-10 w-auto"
        />
      </Link>

      <Link
        href="https://play.google.com/store/apps/details?id=it.autoindabox.mobile&hl=it"
        data-download-store="google"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="google download button"
        onClick={() => handleDownloadClick("google")}
      >
        <Image
          src="/googlebtn.webp"
          alt="Google Play"
          width={180}
          height={40}
          className="h-10 w-auto"
        />
      </Link>
    </div>
  );
}
