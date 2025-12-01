import React from "react"
import "@/app/globals.css"
import { Inter_Tight } from "next/font/google"
import { Metadata } from "next";
import Script from "next/script";

const interTight = Inter_Tight(
    {
        subsets: ["latin"],
        weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
        variable: "--font-inter-tight"
    }
);

export const metadata: Metadata = {
    title: {
        default: "Parkito",
        template: "%s | Parkito",
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
        title: 'Parkito',
        description: 'Trova parcheggio sicuro con un click!',
        url: 'https://parkito.app',
        siteName: 'Parkito',
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
                <Script id="iubenda-config" strategy="beforeInteractive">
                    {`
            var _iub = _iub || [];
            _iub.csConfiguration = {
              askConsentAtCookiePolicyUpdate: false,
              cookiePolicyInOtherWindow: true,
              floatingPreferencesButtonDisplay: "bottom-left",
              hasEmailMarketing: false,
              perPurposeConsent: true,
              siteId: 2311382,
              whitelabel: false,
              cookiePolicyId: 94483316,
              banner: {
                acceptButtonDisplay: true,
                closeButtonRejects: true,
                customizeButtonDisplay: true,
                explicitWithdrawal: true,
                listPurposes: true,
                position: "float-top-center",
                showTitle: false
              }
            };
            _iub.csLangConfiguration = {
              it: { cookiePolicyId: 94483316 }
            };
          `}
                </Script>

                <Script
                    src="https://cs.iubenda.com/autoblocking/2311382.js"
                    strategy="afterInteractive"
                />
            </head>
            <body className={`${interTight.className} bg-background min-h-screen`}>
                <Script
                    src="https://cdn.iubenda.com/cs/iubenda_cs.js"
                    strategy="afterInteractive"
                />
                <main>
                    {children}
                </main>
            </body>
        </html>
    )
}


