import "../globals.css";
import { ThemeProvider } from "@/hooks/theme-provider";
// import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ResNav from "@/components/ResNav";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";


export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <>
      <Link
        href="#main-content"
        tabIndex={0}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-9999 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:outline-2 focus:outline-blue-500 focus:rounded"
      >
        Vai al contenuto
      </Link>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {/* <Nav /> */}
        {<ResNav />}
        <div id="main-content" className="min-h-screen">
          {children}
        </div>
        <BackToTop />
        <Footer />
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </>
  );
}
