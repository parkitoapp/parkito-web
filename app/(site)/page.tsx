import Banner from "@/components/Banner";
import ReviewsList from "@/components/ReviewsList";
import Image from "next/image";
import { faq } from "@/data/faq";
import Faq from "@/components/Faq";
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';
import LazyVideo from '@/components/LazyVideo';
import DownloadButtons from "@/components/DownloadButtons";
import CityCarousel from "@/components/CityCarousel";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import HomeCards from "@/components/HomeCards";
import { cards, howItWorks } from '@/data/homeCards'
import { JsonLd } from "@/components/JsonLd";

export const metadata = {
  title: 'Prenota Parcheggi Privati',
  description: 'Parkito: la prima app per il Park Sharing in Italia. Prenota in anticipo Parcheggi Privati sicuri e verificati',
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ParkingFacility',
  name: 'Parkito - Parcheggi in Viaggio',
  description: 'Il primo servizio di Park Sharing in Italia. Prenota parcheggi privati verificati nelle principali città italiane.',
  url: 'https://parkito.app',
  logo: 'https://parkito.app/logo.webp',
  image: 'https://parkito.app/logo.webp',
  areaServed: ['Milano', 'Firenze', 'Bologna', 'Torino', 'Roma', 'Napoli'],
  serviceType: 'Park Sharing',
  priceRange: '€',
}

export default function Home() {

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <Banner title="Prenota in anticipo Parcheggi Privati sicuri e verificati con Parkito!" subtitle="Vacanze, eventi, viaggi di lavoro: dimentica per sempre il problema del parcheggio, scarica Parkito!" src="/homePic.webp" icon={true} social={true} dwbtn={true} src2={true} classname="max-w-xl" />
      <div className="bg-background">

        <div className=" bg-background">
          <div className="relative flex flex-col items-center justify-center p-4">
            <h2 className="text-5xl font-bold text-primary dark:text-accent w-full text-center">Città già <span className="text-lime-300 dark:text-chart-2">attive</span></h2>
            <CityCarousel />
            <div className="relative z-10 flex flex-col items-center justify-center gap-4 mb-10">
              <Button variant={"default"} className="hover:bg-blue-900/90 hover:text-white mt-4 rounded-lg px-6 text-lg mb-20" asChild>
                <Link href={"/citta"}>
                  Scoprile tutte <ArrowRightIcon />
                </Link>
              </Button>
            </div>
          </div>

          {/* Card */}
          <div className="w-full mx-auto bg-background lg:pb-20" >

            <div className="w-full flex mx-auto flex-col min-h-80 justify-center items-center py-10 px-16 text-white text-center rounded-t-3xl lg:rounded-none gap-5">

              <h1 className="text-4xl flex flex-col font-bold mb-4 text-primary">
                <span className="text-5xl dark:text-accent mb-2">Parkito</span>
                <span className="dark:text-chart-1">Trovare parcheggio in una città che non conosci? <br />Un incubo</span>
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-4 items-stretch gap-8 w-full">
                <HomeCards cards={cards} />
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="min-h-screen">
          <div className="relative bg-primary dark:bg-chart-2 pb-10 overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="relative w-full h-full">
                <Image
                  src="/linea-desk.webp"
                  alt=""
                  fill
                  className="hidden xl:block object-cover object-center opacity-90"
                  aria-hidden
                />
                <Image
                  src="/linea-mob.webp"
                  alt=""
                  fill
                  className="xl:hidden object-cover object-center opacity-90"
                  aria-hidden
                />
              </div>
            </div>
            <h2 className="relative text-accent z-10 text-5xl font-extrabold mx-auto mb-4 text-center pt-10 px-2">La soluzione? Prenota <span className="text-lime-300 dark:text-chart-1">un Parkito!</span></h2>
            <p className="relative text-accent z-10 text-xl mx-auto text-center">Scopri <span className="font-bold">Parkito</span>, la prima piattaforma di Park Sharing in Italia: I Parkito sono parcheggi privati verificati, <span className="font-bold underline">NON</span> autorimesse</p>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-5xl mx-auto px-4">
              <HomeCards cards={howItWorks} />
            </div>
          </div>
          <ScrollStack className="bg-background mt-10 px-8 md:px-0">
            {/* ITEM 1 */}
            <ScrollStackItem itemClassName="flex flex-col md:flex-row p-4 md:p-8 bg-accent dark:bg-secondary rounded-lg justify-between w-full mx-auto md:max-w-5xl">

              <div className="flex flex-col w-full md:w-full p-2 md:p-4 justify-center items-start">
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

              <LazyVideo src="/video_home1.mp4" className="w-full md:w-[30%] h-auto rounded-lg mt-4 md:mt-0" />
            </ScrollStackItem>

            {/* ITEM 2 */}
            <ScrollStackItem itemClassName="flex flex-col md:flex-row p-4 md:p-8 bg-accent dark:bg-secondary rounded-lg justify-between w-full mx-auto md:max-w-5xl">

              {/* Desktop video */}
              <LazyVideo
                src="/video_home2.mp4"
                className="hidden md:block w-full md:w-[30%] h-auto rounded-lg"
              />

              <div className="flex flex-col w-full md:w-full p-2 md:p-4 justify-center items-end text-right">
                <h3 className="text-xl md:text-2xl font-bold text-accent-foreground mb-2 md:mb-4 uppercase">
                  Scegli il tuo Parkito!
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
                src="/video_home3.mp4"
                className="md:hidden w-full h-auto rounded-lg mt-4"
              />
            </ScrollStackItem>

            {/* ITEM 3 */}
            <ScrollStackItem itemClassName="flex flex-col md:flex-row p-4 md:p-8 bg-accent dark:bg-secondary rounded-lg justify-between w-full mx-auto md:max-w-5xl">

              <div className="flex flex-col w-full md:w-full p-2 md:p-4 justify-center items-start">
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
                src="/video_home3.mp4"
                className="w-full md:w-[30%] h-auto rounded-lg mt-4 md:mt-0"
              />
            </ScrollStackItem>
          </ScrollStack>

        </div>

        {/* Reviews */}
        <div className="w-full bg-primary py-10 flex flex-col justify-center items-center gap-6" id="icon-link">
          <ReviewsList />
        </div>

        {/* FAQ */}
        <Faq items={faq} />
      </div>
    </>
  );
}
