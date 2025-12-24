import React from "react"
import "@/app/globals.css"
import { Inter_Tight } from "next/font/google"
import { Metadata } from "next";
import Script from "next/script";
import GlobalTracking from "./_tracking/GlobalTracking";
import { GoogleAnalytics } from '@next/third-parties/google'
import { ThemeProvider } from "@/hooks/theme-provider";

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

        <Script id="segment-official" strategy="beforeInteractive">
          {`
          !function(){
            var i="analytics",analytics=window[i]=window[i]||[];
            if(!analytics.initialize){
              if(analytics.invoked){
                window.console&&console.error&&console.error("Segment snippet incluso due volte.");
              } else {
                analytics.invoked=!0;
                analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview",
                "identify","reset","group","track","ready","alias","debug","page","screen","once",
                "off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId",
                "addDestinationMiddleware","register"];
                analytics.factory=function(e){
                  return function(){
                    if(window[i].initialized) return window[i][e].apply(window[i],arguments);
                    var n=Array.prototype.slice.call(arguments);
                    if(["track","screen","alias","group","page","identify"].indexOf(e)>-1){
                      var c=document.querySelector("link[rel='canonical']");
                      n.push({__t:"bpc",c:c&&c.getAttribute("href")||void 0,
                      p:location.pathname,u:location.href,s:location.search,
                      t:document.title,r:document.referrer});
                    }
                    n.unshift(e);
                    analytics.push(n);
                    return analytics
                  }
                };
                for(var n=0;n<analytics.methods.length;n++){
                  var key=analytics.methods[n];
                  analytics[key]=analytics.factory(key)
                }
                analytics.load=function(key,n){
                  var t=document.createElement("script");
                  t.type="text/javascript";t.async=!0;
                  t.setAttribute("data-global-segment-analytics-key",i);
                  t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";
                  var r=document.getElementsByTagName("script")[0];
                  r.parentNode.insertBefore(t,r);
                  analytics._loadOptions=n
                };
                analytics._writeKey="${process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY}";
                analytics.SNIPPET_VERSION="5.2.0";
                analytics.load("${process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY}");
                analytics.page();
              }    
            }
          }();
        `}
        </Script>

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <main>
            {children}
          </main>
          <GoogleAnalytics gaId="G-MJ696D3GF8" />
          <GlobalTracking />
        </ThemeProvider>
      </body>
    </html>
  )
}


