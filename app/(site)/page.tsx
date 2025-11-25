import Banner from "@/components/Banner";
import ReviewsList from "@/components/ReviewsList";
import Image from "next/image";
import { faq } from "@/data/faq";
import Faq from "@/components/Faq";
import Link from "next/link";
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

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
              <p className="hidden sm:block text-chart-4 font-semibold text-lg">
                Oltre 10.000 utenti soddisfatti in tutta Italia
              </p>
              <Image src='/homePill.webp' alt="App preview" width={1500} height={1800} className="mt-4 object-contain drop-shadow-2xl z-10 w-[25em] min-w-[50%] sm:hidden" />
            </>
            <ReviewsList />
          </div>

          {/* Card */}
          <div className="w-full mx-auto bg-background lg:pb-20" >

            <div className="w-full flex mx-auto flex-col min-h-80 bg-accent justify-center items-center py-10 px-16 text-white text-center rounded-t-3xl lg:rounded-none shadow-lg gap-5">

              <h1 className="text-4xl flex flex-col font-bold mb-4 text-foreground">Trovare parcheggio in una città che non conosci? <span className="pb-2 border-b border-secondary text-secondary w-[5em]">Un incubo</span></h1>
              <div className="flex flex-col lg:grid lg:grid-cols-4 items-baseline gap-10">

                <div className="flex flex-col w-50 bg-white p-4 rounded-xl">
                  <Image src={"/headache.webp"} alt="headache" width={1300} height={1300} />
                  <p className="text-md font-bold text-primary dark:text-chart-3 text-lg">
                    Rischio di girare a vuoto per ore.
                  </p>
                </div>
                <div className="flex flex-col w-50 bg-white p-4 rounded-xl">
                  <Image src={"/clock.webp"} alt="headache" width={1300} height={1300} />
                  <p className="text-md font-bold text-primary dark:text-chart-3 text-lg">
                    Nessuna garanzia sulla disponibilità.
                  </p>
                </div>
                <div className="flex flex-col w-50 bg-white p-4 rounded-xl">
                  <Image src={"/light.webp"} alt="headache" width={1300} height={1300} />
                  <p className="text-md font-bold text-primary dark:text-chart-3 text-lg">
                    Prezzi poco trasparenti
                  </p>
                </div>
                <div className="flex flex-col w-50 bg-white p-4 rounded-xl">
                  <Image src={"/x.webp"} alt="headache" width={1300} height={1300} />
                  <p className="text-md font-bold text-primary dark:text-chart-3 text-lg">
                    No H24 e niente sicurezza
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-background min-h-screen sm:mb-120 md:mb-50 mb-150">
          <h2 className="text-5xl font-extrabold mx-auto mb-4 text-center pt-10">La soluzione? Un parcheggio <span className="text-primary">Parkito!</span></h2>
          <ScrollStack className="bg-backround ">
            <ScrollStackItem itemClassName="flex md:flex-row flex-col p-8 bg-white dark:bg-accent rounded-lg justify-between mx-auto md:max-w-5xl w-full">

              <div className="flex flex-col min-h-full lg:w-[50%] md:w-[40%] p-4 justify-center items-start">

                <h3 className="text-2xl w-full font-bold text-accent-foreground mb-4 uppercase">
                  Prepara un documento e
                </h3>
                <h2 className="text-4xl lg:w-lg font-bold text-primary">
                  Prenota in anticipo direttamente dall&apos;app
                </h2>
                <p className="text-lg lg:w-lg">Per poche ore o per più giorni, in base alle tue necessità e senza vincoli orari</p>

              </div>
              <video autoPlay playsInline loop muted preload="auto" className=" bg-transparent rounded-lg md:h-full md:w-[40%] mx-auto md:mx-0">
                <source src={"/ricerca-edited.mp4"} type="video/mp4" />
              </video>

            </ScrollStackItem>

            <ScrollStackItem itemClassName="flex md:flex-row flex-col p-8 bg-white dark:bg-accent rounded-lg justify-between mx-auto md:max-w-5xl w-full">
              <video autoPlay playsInline loop muted preload="auto" className="hidden md:block bg-transparent rounded-lg h-full md:w-[40%] mx-auto md:mx-0">
                <source src={"/mappa-edited.mp4"} type="video/mp4" />
              </video>
              <div className="flex flex-col min-h-full  lg:w-[50%] md:w-[40%] p-4 justify-center items-end">

                <h3 className="text-2xl w-full font-bold text-accent-foreground mb-4 uppercase">
                  Scegli tra più di 300 parcheggi
                </h3>
                <h2 className="text-4xl lg:w-lg font-bold text-primary">
                  Un parcheggio privato a tua disposizione
                </h2>
                <p className="text-lg lg:w-lg">Box, posti auto, silos: durante la sosta entri ed esci tutte le volte che vuoi</p>
              </div>
              <video autoPlay playsInline loop muted preload="auto" className="md:hidden bg-transparent rounded-lg md:h-full md:w-[40%] mx-auto md:mx-0">
                <source src={"/mappa-edited.mp4"} type="video/mp4" />
              </video>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="flex md:flex-row flex-col p-8 bg-white dark:bg-accent rounded-lg justify-between mx-auto md:max-w-5xl w-full">
              <div className="flex flex-col min-h-full  lg:w-[50%] md:w-[40%] p-4 justify-center items-start">

                <h3 className="text-2xl w-full font-bold text-accent-foreground mb-4 uppercase">
                  accedi tramite l&apos;app
                </h3>
                <h2 className="text-4xl lg:w-lg font-bold text-chart-5">
                  Massima sicurezza per la tua auto
                </h2>
                <p className="text-lg lg:w-lg">I parcheggi sono verificati e in contesti tranquilli. Dimentica il caos di strisce blu e autorimesse.</p>

              </div>
              <video autoPlay playsInline loop muted preload="auto" className=" bg-transparent rounded-lg md:h-full md:w-[40%] mx-auto md:mx-0">
                <source src={"/istruzioni-edited.mp4"} type="video/mp4" />
              </video>
            </ScrollStackItem>
          </ScrollStack>
        </div>

        {/* Download */}
        <div className="w-full bg-accent flex flex-col gap-6 py-10 px-4 text-center">

          <h2 className="text-5xl text-primary font-extrabold">Scarica Parkito!</h2>
          <p className="text-xl w-[20%] mx-auto text-primary">E trasforma l&apos;esperienza del parcheggio in città con Parkito</p>

          <div className="flex flex-row w-full mx-auto items-center justify-center gap-4 mt-6">
            <Link href="https://apps.apple.com/it/app/parkito-park-sharing/id6446240996" aria-label="apple download button" title="apple download button">
              <Image src="/applebtn.webp" alt="App Store" width={150} height={50} />
            </Link>
            <Link href="https://play.google.com/store/apps/details?id=it.autoindabox.mobile&hl=it" aria-label="android download button" title="google download button">
              <Image src="/googlebtn.webp" alt="Google Play" width={150} height={50} />
            </Link>
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
