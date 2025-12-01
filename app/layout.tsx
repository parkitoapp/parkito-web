import React from "react"
import "@/app/globals.css"
import { Inter_Tight } from "next/font/google"
import { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

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


  { console.log("segment", process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY) }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>

        <Script id="segment-analytics" strategy="beforeInteractive">
          {`
            !function(){
              var analytics=window.analytics=window.analytics||[];
              if(!analytics.initialize){
                if(analytics.invoked){ console.error("Segment snippet included twice."); return; }
                analytics.invoked=!0;
                analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on"];
                analytics.factory=function(method){ return function(){ var args=Array.prototype.slice.call(arguments); args.unshift(method); analytics.push(args); return analytics; }; };
                for(var i=0;i<analytics.methods.length;i++){ var key=analytics.methods[i]; analytics[key]=analytics.factory(key); }
                analytics.load=function(key){ 
                  var script=document.createElement("script"); 
                  script.type="text/javascript"; 
                  script.async=!0; 
                  script.src="https://cdn.segment.com/analytics.js/v1/"+key+"/analytics.min.js"; 
                  var first=document.getElementsByTagName("script")[0]; 
                  first.parentNode.insertBefore(script,first); 
                };
                analytics._writeKey="${process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY}";
                analytics.SNIPPET_VERSION="5.2.1";
                analytics.load("${process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY}");
              }
            }();
          `}
        </Script>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        {/* ---------------- IUBENDA ---------------- */}
        <Script id="iubenda-config" strategy="afterInteractive">
          {`
    var _iub = _iub || [];
    _iub.csConfiguration = {
      askConsentAtCookiePolicyUpdate: true,
      cookiePolicyInOtherWindow: true,
      cookiePolicyUrl: "https://www.iubenda.com/privacy-policy/94483316/cookie-policy",
      floatingPreferencesButtonDisplay: "bottom-left",
      hasEmailMarketing: false,
      perPurposeConsent: true,
      siteId: 2311382,
      whitelabel: false,
      cookiePolicyId: 94483316,
      consentOnContinuedBrowsing: false,
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
        <Script
          src="https://cdn.iubenda.com/cs/iubenda_cs.js"
          strategy="afterInteractive"
        />


      </head>
      {/* <GoogleTagManager gtmId="" /> */}
      <body className={`${interTight.className} bg-background min-h-screen`}>

        <main>
          {children}
        </main>
        {/* <GoogleAnalytics id="" /> */}
      </body>
    </html>
  )
}


