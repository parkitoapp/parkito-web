import Banner from "@/components/Banner";
import ReviewsList from "@/components/ReviewsList";
import Image from "next/image";
import { faq } from "@/data/faq";
import Faq from "@/components/Faq";
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';
import LazyVideo from '@/components/LazyVideo';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import DownloadButtons from "@/components/DownloadButtons";
import CityCarousel from "@/components/CityCarousel";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: 'Home',
  description: 'Prenota in anticipo Parcheggi Privati sicuri e verificati',
}

export default function Home() {

  return (
    <>
      <Banner title="Prenota in anticipo Parcheggi Privati sicuri e verificati" subtitle="Vacanze, eventi, viaggi di lavoro: dimentica per sempre il problema del parcheggio, scarica Parkito!" src="/homePic.webp" icon={true} social={true} dwbtn={true} />
      <div className="bg-background">

        <div className=" bg-background">
          {/* Reviews */}
          <div className="w-full bg-background py-10 flex flex-col justify-center items-center gap-6" id="icon-link">
            <ReviewsList />
          </div>

          {/* Card */}
          <div className="w-full mx-auto bg-background lg:pb-20" >

            <div className="w-full flex mx-auto flex-col min-h-80 bg-accent justify-center items-center py-10 px-16 text-white text-center rounded-t-3xl lg:rounded-none shadow-lg gap-5">

              <h1 className="text-4xl flex flex-col font-bold mb-4 text-foreground">Trovare parcheggio in una città che non conosci? <span className="pb-2 border-b border-secondary text-secondary dark:text-accent-foreground md:w-[5em]">Un incubo</span></h1>
              <div className="flex flex-col lg:grid lg:grid-cols-4 items-baseline gap-10">

                <Card className="flex flex-col w-50 bg-card p-4 rounded-xl">
                  <CardHeader>
                    <Image src="/headache.webp" alt="headache" width={200} height={200} sizes="(max-width: 768px) 160px, 200px" loading="lazy" className="md:w-50 w-40 mx-auto" />
                  </CardHeader>

                  <CardTitle className="text-md font-bold text-primary dark:text-chart-3 text-lg">
                    Rischio di girare a vuoto per ore.
                  </CardTitle>
                </Card>
                <Card className="flex flex-col w-50 bg-card p-4 rounded-xl">
                  <CardHeader>
                    <Image src="/clock.webp" alt="orologio" width={200} height={200} sizes="(max-width: 768px) 160px, 200px" loading="lazy" className="md:w-50 w-40 mx-auto" />
                  </CardHeader>
                  <CardTitle className="text-md font-bold text-primary dark:text-chart-3 text-lg">
                    Nessuna garanzia sulla disponibilità.
                  </CardTitle>
                </Card>
                <Card className="flex flex-col w-50 bg-card p-4 rounded-xl">
                  <CardHeader>
                    <Image src="/light.webp" alt="luci" width={200} height={200} sizes="(max-width: 768px) 160px, 200px" loading="lazy" className="md:w-50 w-40 mx-auto" />
                  </CardHeader>
                  <CardTitle className="text-md font-bold text-primary dark:text-chart-3 text-lg">
                    Prezzi poco trasparenti
                  </CardTitle>
                </Card>
                <Card className="flex flex-col w-50 bg-card p-4 rounded-xl">
                  <CardHeader>
                    <Image src="/x.webp" alt="croce" width={200} height={200} sizes="(max-width: 768px) 160px, 200px" loading="lazy" className="md:w-50 w-40 mx-auto" />
                  </CardHeader>
                  <CardTitle className="text-md font-bold text-primary dark:text-chart-3 text-lg">
                    No H24 e niente sicurezza
                  </CardTitle>
                </Card>

              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-background min-h-screen">
          <h2 className="text-5xl font-extrabold mx-auto mb-4 text-center pt-10 text-primary">La soluzione? Prenota un Parkito!</h2>
          <p className="text-xl mx-auto text-center">Scopri la prima piattaforma di Park Sharing in Italia: i Parkito sono parcheggi privati verificati, <span className="font-bold underline">NON</span> autorimesse e <span className="font-bold underline">NON</span> strisce blu.</p>
          <div className="flex md:flex-row flex-col items-center justify-center gap-4 mt-10">

            <Card className="flex flex-col w-90 bg-card p-4 rounded-xl">
              <CardHeader>
                <Image src="/house.webp" alt="house" width={200} height={200} sizes="(max-width: 768px) 160px, 200px" loading="lazy" className="md:w-50 w-40 mx-auto" />
              </CardHeader>
              <CardTitle className="font-bold text-primary dark:text-chart-3 text-2xl">
                Come a casa, ma ovunque.
              </CardTitle>
              <CardDescription className="text-lg">
                Hai un box o posto auto? Vivi la stessa esperienza.
              </CardDescription>
            </Card>
            <Card className="flex flex-col w-90 bg-card p-4 rounded-xl">
              <CardHeader>
                <Image src="/banner.webp" alt="banner" width={200} height={200} sizes="(max-width: 768px) 160px, 200px" loading="lazy" className="md:w-50 w-40 mx-auto" />
              </CardHeader>
              <CardTitle className="font-bold text-primary dark:text-chart-3 text-2xl">
                Esclusività e sicurezza
              </CardTitle>
              <CardDescription className="text-lg">
                I parcheggi sono prenotabili solo in Parkito.
              </CardDescription>
            </Card>
            <Card className="flex flex-col w-90 bg-card p-4 rounded-xl">
              <CardHeader>
                <Image src="/secure.webp" alt="secure" width={200} height={200} sizes="(max-width: 768px) 160px, 200px" loading="lazy" className="md:w-50 w-40 mx-auto" />
              </CardHeader>
              <CardTitle className="font-bold text-primary dark:text-chart-3 text-2xl">
                Gestione digitale
              </CardTitle>
              <CardDescription className="text-lg">
                Nessun ticket o pagamento cash: paghi online con un click e tutto rimane tracciato
              </CardDescription>
            </Card>

          </div>
          <ScrollStack className="bg-background">
            {/* ITEM 1 */}
            <ScrollStackItem itemClassName="flex flex-col md:flex-row p-4 md:p-8 bg-accent rounded-lg justify-between w-full mx-auto md:max-w-5xl">

              <div className="flex flex-col w-full md:w-[40%] p-2 md:p-4 justify-center items-start">
                <h3 className="text-xl md:text-2xl font-bold text-accent-foreground mb-2 md:mb-4 uppercase">
                  Prepara un documento e
                </h3>
                <h2 className="text-2xl md:text-4xl font-bold text-primary mb-2 md:mb-4">
                  Prenota in anticipo direttamente dall&apos;app
                </h2>
                <p className="text-base md:text-lg">
                  Per poche ore o per più giorni, in base alle tue necessità e senza vincoli orari
                </p>
              </div>

              <LazyVideo src="/ricerca-edited.mp4" className="w-full md:w-[40%] h-auto rounded-lg mt-4 md:mt-0" />
            </ScrollStackItem>

            {/* ITEM 2 */}
            <ScrollStackItem itemClassName="flex flex-col md:flex-row p-4 md:p-8 bg-accent rounded-lg justify-between w-full mx-auto md:max-w-5xl">

              {/* Desktop video */}
              <LazyVideo
                src="/mappa-edited.mp4"
                className="hidden md:block w-full md:w-[40%] h-auto rounded-lg"
              />

              <div className="flex flex-col w-full md:w-[40%] p-2 md:p-4 justify-center items-end text-right">
                <h3 className="text-xl md:text-2xl font-bold text-accent-foreground mb-2 md:mb-4 uppercase">
                  Scegli tra più di 300 parcheggi
                </h3>
                <h2 className="text-2xl md:text-4xl font-bold text-primary mb-2 md:mb-4">
                  Un parcheggio privato a tua disposizione
                </h2>
                <p className="text-base md:text-lg">
                  Box, posti auto, silos: durante la sosta entri ed esci tutte le volte che vuoi
                </p>
              </div>

              {/* Mobile video */}
              <LazyVideo
                src="/mappa-edited.mp4"
                className="md:hidden w-full h-auto rounded-lg mt-4"
              />
            </ScrollStackItem>

            {/* ITEM 3 */}
            <ScrollStackItem itemClassName="flex flex-col md:flex-row p-4 md:p-8 bg-accent rounded-lg justify-between w-full mx-auto md:max-w-5xl">

              <div className="flex flex-col w-full md:w-[40%] p-2 md:p-4 justify-center items-start">
                <h3 className="text-xl md:text-2xl font-bold text-accent-foreground mb-2 md:mb-4 uppercase">
                  accedi tramite l&apos;app
                </h3>
                <h2 className="text-2xl md:text-4xl font-bold text-primary mb-2 md:mb-4">
                  Massima sicurezza per la tua auto
                </h2>
                <p className="text-base md:text-lg">
                  I parcheggi sono verificati e in contesti tranquilli. Dimentica il caos di strisce blu e autorimesse.
                </p>
              </div>

              <LazyVideo
                src="/istruzioni-edited.mp4"
                className="w-full md:w-[40%] h-auto rounded-lg mt-4 md:mt-0"
              />
            </ScrollStackItem>
          </ScrollStack>

        </div>

        {/* Carosello */}
        <div className="bg-primary flex flex-col items-center justify-center p-4">
          <h2 className="text-5xl font-bold text-accent w-full text-center">Città già attive</h2>
          <CityCarousel />
          <Button variant={"default"} className="bg-foreground hover:bg-blue-900/90 hover:text-white mt-4 rounded-full p-6 text-lg" asChild><Link href={"/citta"}>Scoprile tutte <ArrowRightIcon /></Link></Button>
          <div className="flex flex-col items-center justify-center gap-4 my-10">
            <h2 className="text-2xl font-bold text-accent">Prenota subito il tuo primo Parkito!</h2>
            <DownloadButtons />
          </div>
        </div>


        {/* FAQ */}
        <Faq items={faq} />
      </div>
    </>
  );
}
