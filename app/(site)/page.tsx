import Banner from "@/components/Banner";
import ReviewsList from "@/components/ReviewsList";
import Image from "next/image";
import { faq } from "@/data/faq";
import Faq from "@/components/Faq";
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';
import LazyVideo from '@/components/LazyVideo';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import DownloadButtons from "@/components/DownloadButtons";

export const metadata = {
  title: 'Home',
}

export default function Home() {

  return (
    <>
      <Banner title="Prenota in anticipo Parcheggi Privati sicuri e verificati" subtitle="Vacanze, eventi, viaggi di lavoro: dimentica per sempre il problema del parcheggio, scarica Parkito!" src="/homePic.webp" src2={"/homePill.webp"} icon={true} social={true} dwbtn={true} />
      <div className="bg-background">

        <div className=" bg-background">
          {/* Reviews */}
          <div className="w-full bg-background py-10 flex flex-col justify-center items-center gap-6" id="icon-link">
            <h1 className="text-5xl font-bold text-center text-primary">
              Prova l&apos;esperienza Parkito
            </h1>
            <>
              <p className="hidden sm:block text-chart-4 dark:text-chart-3 font-semibold text-lg">
                Oltre 10.000 utenti soddisfatti in tutta Italia
              </p>
              <Image src='/homePill.webp' alt="App preview" width={800} height={960} sizes="(max-width: 640px) 400px, 800px" className="mt-4 object-contain drop-shadow-2xl z-10 w-[25em] min-w-[50%] sm:hidden px-4" />
            </>
            <ReviewsList />
          </div>

          {/* Card */}
          <div className="w-full mx-auto bg-background lg:pb-20" >

            <div className="w-full flex mx-auto flex-col min-h-80 bg-accent justify-center items-center py-10 px-16 text-white text-center rounded-t-3xl lg:rounded-none shadow-lg gap-5">

              <h1 className="text-4xl flex flex-col font-bold mb-4 text-foreground">Trovare parcheggio in una città che non conosci? <span className="pb-2 border-b border-secondary text-secondary dark:text-accent-foreground md:w-[5em]">Un incubo</span></h1>
              <div className="flex flex-col lg:grid lg:grid-cols-4 items-baseline gap-10">

                <Card className="flex flex-col w-50 bg-card p-4 rounded-xl">
                  <CardHeader>
                    <Image src="/headache.webp" alt="headache" width={200} height={200} sizes="(max-width: 768px) 160px, 200px" className="md:w-50 w-40 mx-auto" />
                  </CardHeader>

                  <CardTitle className="text-md font-bold text-primary dark:text-chart-3 text-lg">
                    Rischio di girare a vuoto per ore.
                  </CardTitle>
                </Card>
                <Card className="flex flex-col w-50 bg-card p-4 rounded-xl">
                  <CardHeader>
                    <Image src="/clock.webp" alt="orologio" width={200} height={200} sizes="(max-width: 768px) 160px, 200px" className="md:w-50 w-40 mx-auto" />
                  </CardHeader>
                  <CardTitle className="text-md font-bold text-primary dark:text-chart-3 text-lg">
                    Nessuna garanzia sulla disponibilità.
                  </CardTitle>
                </Card>
                <Card className="flex flex-col w-50 bg-card p-4 rounded-xl">
                  <CardHeader>
                    <Image src="/light.webp" alt="luci" width={200} height={200} sizes="(max-width: 768px) 160px, 200px" className="md:w-50 w-40 mx-auto" />
                  </CardHeader>
                  <CardTitle className="text-md font-bold text-primary dark:text-chart-3 text-lg">
                    Prezzi poco trasparenti
                  </CardTitle>
                </Card>
                <Card className="flex flex-col w-50 bg-card p-4 rounded-xl">
                  <CardHeader>
                    <Image src="/x.webp" alt="croce" width={200} height={200} sizes="(max-width: 768px) 160px, 200px" className="md:w-50 w-40 mx-auto" />
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
          <h2 className="text-5xl font-extrabold mx-auto mb-4 text-center pt-10">La soluzione? Un parcheggio <span className="text-primary">Parkito!</span></h2>
          <ScrollStack className="bg-background">
            {/* ITEM 1 */}
            <ScrollStackItem itemClassName="flex flex-col md:flex-row p-4 md:p-8 bg-white dark:bg-accent rounded-lg justify-between w-full mx-auto md:max-w-5xl">

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
            <ScrollStackItem itemClassName="flex flex-col md:flex-row p-4 md:p-8 bg-white dark:bg-accent rounded-lg justify-between w-full mx-auto md:max-w-5xl">

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
            <ScrollStackItem itemClassName="flex flex-col md:flex-row p-4 md:p-8 bg-white dark:bg-accent rounded-lg justify-between w-full mx-auto md:max-w-5xl">

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

        {/* Download */}
        <div className="w-full bg-accent flex flex-col gap-6 py-10 px-4 text-center">

          <h2 className="text-5xl text-primary font-extrabold">Scarica Parkito!</h2>
          <p className="text-xl md:w-[20%] mx-auto text-primary">E trasforma l&apos;esperienza del parcheggio in città con Parkito</p>

          <div className="flex flex-row w-full mx-auto items-center justify-center gap-4 mt-6">
            <DownloadButtons />
          </div>
          <div className="flex md:flex-row flex-col gap-8 items-center justify-center">
            <Card className="rounded-lg bg-card flex flex-col justify-between w-64 h-40 p-6">
              <CardHeader>
                <CardTitle className="text-accent-foreground font-extrabold text-2xl text-center">0</CardTitle>
              </CardHeader>
              <CardFooter>
                <CardDescription className="w-[80%] mx-auto text-primary text-lg font-semibold text-center">Problemi di sicurezza registrati</CardDescription>
              </CardFooter>
            </Card>
            <Card className="rounded-lg bg-card flex flex-col justify-between w-64 h-40 p-6">
              <CardHeader>
                <CardTitle className="text-accent-foreground font-extrabold text-2xl text-center">+ 300</CardTitle>
              </CardHeader>
              <CardFooter>
                <CardDescription className="w-[80%] mx-auto text-primary text-lg font-semibold text-center">Parcheggi prenotabili</CardDescription>
              </CardFooter>
            </Card>
            <Card className="rounded-lg bg-card flex flex-col justify-between w-64 h-40 p-6">
              <CardHeader>
                <CardTitle className="text-accent-foreground font-extrabold text-2xl text-center">Infinite</CardTitle>
              </CardHeader>
              <CardFooter>
                <CardDescription className="w-[80%] mx-auto text-primary text-lg font-semibold text-center">Ore risparmiate a cercare parcheggio</CardDescription>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <Faq items={faq} />
      </div>
    </>
  );
}
