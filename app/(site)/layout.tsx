/**
 * Layout component for the site pages.
 * Includes the navigation, footer, and snow effects.
 * 
 * @param {React.ReactNode} children - The child components to be rendered.
 * @returns {JSX.Element} The layout component.
 */

import "../globals.css";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ResNav from "@/components/ResNav";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
import { SnowProvider } from "@/hooks/useSnow";
import ChristmasSnow from "@/components/ChristmasSnow";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SnowProvider>
      <Link
        href="#main-content"
        tabIndex={0}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-9999 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:outline-2 focus:outline-blue-500 focus:rounded"
      >
        Vai al contenuto
      </Link>
      <ResNav />

      <ChristmasSnow />

      <div id="main-content" className="min-h-screen">

        {children}
      </div>
      <BackToTop />
      <Footer />
      <Toaster richColors position="top-right" />

    </SnowProvider>
  );
}
