
import React from "react"
import "@/app/globals.css"
import { Inter_Tight } from "next/font/google"
import { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics } from '@next/third-parties/google'
import { ThemeProvider } from "@/hooks/theme-provider";
import Tracking from "./_tracking/Tracking";
const interTight = Inter_Tight(
  {
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-inter-tight"
  }
);

export const metadata: Metadata = {
  title: {
    default: "Parkito.app",
    template: "%s | Parkito.app",
  },
  description: "Trova parcheggio sicuro con un click!",
  keywords: [
    "parkito",
    "parcheggio",
    "parking",
    "park sharing",
    "condivisione parcheggio",
    "app parcheggio",
    "prenotazione parcheggio",
    "parcheggi sicuri",
    "parcheggi economici",
    "parcheggi privati",
    "parcheggi riservati",
    "gestione parcheggi",
    "affitto parcheggio",
    "posti auto",
    "mobilità urbana",
    "soluzioni parcheggio",
    "risparmio parcheggio",
    "parcheggio facile",
    "parcheggio veloce",
    "app mobilità",
    "parcheggi milano",
    "parcheggi firenze",
    "parcheggi bologna",
    "parcheggi centro milano",
    "parcheggi centro firenze",
    "parcheggi centro bologna",
    "parcheggi torino",
    "parcheggi roma",
    "parcheggi napoli"
  ],
  authors: [{ name: 'Parkito Team', url: 'https://parkito.app' }],
  openGraph: {
    title: 'Parkito.app',
    description: 'Trova parcheggio sicuro con un click!',
    url: 'https://parkito.app',
    siteName: 'Parkito.app',
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        {/* ---------------- IUBENDA ---------------- */}
        <Script id="iubenda-config" strategy="lazyOnload">
          {`
        var _iub = _iub || [];
_iub.csConfiguration = {"askConsentAtCookiePolicyUpdate":true,"cookiePolicyInOtherWindow":true,"enableRemoteConsent":true,"floatingPreferencesButtonDisplay":"bottom-left","hasEmailMarketing":false,"perPurposeConsent":true,"siteId":2311382,"whitelabel":false,"cookiePolicyId":94483316,"banner":{"acceptButtonDisplay":true,"closeButtonRejects":true,"customizeButtonDisplay":true,"explicitWithdrawal":true,"listPurposes":true,"position":"float-top-center","showTitle":true}};
_iub.csLangConfiguration = {"it":{"cookiePolicyId":94483316}};


  `}
        </Script>
        <Script
          src="https://cs.iubenda.com/autoblocking/2311382.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://cdn.iubenda.com/cs/iubenda_cs.js"
          strategy="lazyOnload"
        />
      </head>
      {/* <GoogleTagManager gtmId="" /> */}
      <body className={`${interTight.className} bg-background min-h-screen`}>
        <Tracking />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <main>
            {children}
          </main>
          <GoogleAnalytics gaId="G-MJ696D3GF8" />
        </ThemeProvider>
      </body>
    </html>
  )
}


