import Banner from '@/components/Banner'
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack'
import Image from 'next/image'
import Faq from '@/components/Faq'
import { rows } from '@/data/rows'
import { faq } from '@/data/faq'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import TableCompare from '@/components/TableCompare'
import MobileCompare from '@/components/MobileCompare'
import BC from '@/components/BC'
import LazyVideo from '@/components/LazyVideo'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import DownloadButtons from '@/components/DownloadButtons'


export default function page() {
    return (
        <>
            <Banner title='Scarica Parkito e attiva il tuo parcheggio in 5 minuti.' subtitle='Condividi qualsiasi parcheggio, anche quelli condominiali.' src='/host.webp' src2={true} dwbtn={true} icon={true} social={true}
            />
            <div className='bg-background'>
                <div className="px-16 pt-8">
                    <BC />
                </div>
                <div className='min-h-96'>
                    <h1 className="text-5xl font-extrabold mx-auto mb-4 text-center pt-10 text-primary">Perché scegliere <span className="text-primary dark:text-ring">Parkito:</span></h1>
                    <div className='md:grid md:grid-cols-2 flex flex-col gap-4 p-16'>
                        <Card className="bg-card rounded-lg flex flex-col items-center justify-start w-full">
                            <Image src="/notif.webp" alt="icona Disponibilità e prezzo" width={200} height={200} loading="lazy" className='w-36 h-36 p-4' />
                            <CardContent className='w-full p-6'>
                                <CardTitle className="text-2xl font-bold text-primary mt-4">Scegli la disponibilità e prezzo</CardTitle>
                                <CardDescription className="mt-2 w-[60%] text-left text-md text-primary">
                                    Condividi il tuo parcheggio quando e a che prezzo vuoi con un calendario super flessibile
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card className="bg-card rounded-lg flex flex-col items-center justify-start w-full">
                            <Image src="/star.webp" alt="icona stelle" width={200} height={200} sizes="144px" loading="lazy" className='w-36 h-36 p-4' />
                            <CardContent className='w-full p-6'>
                                <CardTitle className="text-2xl font-bold text-primary mt-4">100% Gratuito</CardTitle>
                                <CardDescription className="mt-2 w-[60%] text-left text-md text-primary">
                                    Incassa sempre quello che chiedi, senza commissioni a carico
                                    tuo ed oneri burocratici
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card className="bg-card rounded-lg flex flex-col items-center justify-start w-full">
                            <Image src="/reload.webp" alt="icona ricarica" width={200} height={200} sizes="144px" loading="lazy" className='w-36 h-36 p-4' />
                            <CardContent className='w-full p-6'>
                                <CardTitle className="text-2xl font-bold text-primary mt-4">Recedi quando vuoi</CardTitle>
                                <CardDescription className="mt-2 w-[60%] text-left text-md text-primary">
                                    In Parkito non esistono vincoli: sarai sempre libero di eliminare il tuo parcheggio
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card className="bg-card rounded-lg flex flex-col items-center justify-start w-full">
                            <Image src="/gold.webp" alt="icona oro" width={200} height={200} sizes="144px" loading="lazy" className='w-36 h-36 p-4' />
                            <CardContent className='w-full p-6'>
                                <CardTitle className="text-2xl font-bold text-primary mt-4">Guadagna fino al 300%</CardTitle>
                                <CardDescription className="mt-2 w-[60%] text-left text-md text-primary">
                                    Massimizza il tuo ritorno economico
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className=" min-h-screen sm:pb-120 md:pb-60 lg:pb-60">
                    <h2 className="text-5xl font-extrabold mx-auto mb-4 px-4 text-center pt-10 text-primary">Inizia a ricevere prenotazioni in 5 minuti!</h2>
                    <ScrollStack className="bg-background">
                        {/* ITEM 1 */}
                        <ScrollStackItem itemClassName="flex flex-col md:flex-row p-4 md:p-8 bg-accent rounded-lg justify-between w-full max-w-full md:max-w-5xl mx-auto">

                            <div className="flex flex-col w-full md:w-[40%] p-2 md:p-4 justify-center items-start">
                                <h3 className="text-xl md:text-2xl font-bold text-accent-foreground mb-2 md:mb-4 uppercase">
                                    Registrati e inizia a guadagnare
                                </h3>
                                <h2 className="text-2xl md:text-4xl font-bold text-primary mb-2 md:mb-4">
                                    Vai sul profilo e clicca Diventa Host
                                </h2>
                                <p className="text-base md:text-lg">
                                    Condividi il tuo parcheggio con le migliaia di utenti che ogni mese cercano un posto auto in Parkito
                                </p>
                            </div>

                            <LazyVideo
                                src="/diventa-host-1.mp4"
                                className="w-full md:w-[40%] h-auto rounded-lg mt-4 md:mt-0"
                            />
                        </ScrollStackItem>

                        {/* ITEM 2 */}
                        <ScrollStackItem itemClassName="flex flex-col md:flex-row p-4 md:p-8 bg-accent rounded-lg justify-between w-full max-w-full md:max-w-5xl mx-auto">

                            {/* Desktop video */}
                            {/* Desktop video */}
                            <LazyVideo
                                src="/diventa-host-2.mp4"
                                className="hidden md:block w-full md:w-[40%] h-auto rounded-lg"
                            />

                            <div className="flex flex-col w-full md:w-[40%] p-2 md:p-4 justify-center items-end text-right md:text-right">
                                <h3 className="text-xl md:text-2xl font-bold text-accent-foreground mb-2 md:mb-4 uppercase">
                                    Prepara IBAN e foto del parcheggio
                                </h3>
                                <h2 className="text-2xl md:text-4xl font-bold text-primary mb-2 md:mb-4">
                                    Inserisci il tuo IBAN e inizia a guadagnare
                                </h2>
                                <p className="text-base md:text-lg">
                                    Inserisci le info principali del tuo parcheggio e il tuo IBAN: riceverai i pagamenti direttamente sul tuo conto corrente
                                </p>
                            </div>

                            {/* Mobile video */}
                            {/* Mobile video */}
                            <LazyVideo
                                src="/diventa-host-2.mp4"
                                className="md:hidden w-full h-auto rounded-lg mt-4"
                            />
                        </ScrollStackItem>

                        {/* ITEM 3 */}
                        <ScrollStackItem itemClassName="flex flex-col md:flex-row p-4 md:p-8 bg-accent rounded-lg justify-between w-full max-w-full md:max-w-5xl mx-auto">

                            <div className="flex flex-col w-full md:w-[40%] p-2 md:p-4 justify-center items-start">
                                <h3 className="text-xl md:text-2xl font-bold text-accent-foreground mb-2 md:mb-4 uppercase">
                                    Personalizza il calendario
                                </h3>
                                <h2 className="text-2xl md:text-4xl font-bold text-primary mb-2 md:mb-4">
                                    Scegli disponibilità e prezzo
                                </h2>
                                <p className="text-base md:text-lg">
                                    24/7, solo in alcuni giorni, fasce orarie: con il calendario hai massima flessibilità su date e prezzo.
                                </p>
                            </div>

                            <LazyVideo
                                src="/diventa-host-3.mp4"
                                className="w-full md:w-[40%] h-auto rounded-lg mt-4 md:mt-0"
                            />
                        </ScrollStackItem>

                        {/* ITEM 4 */}
                        <ScrollStackItem itemClassName="flex flex-col md:flex-row p-4 md:p-8 bg-accent rounded-lg justify-between w-full max-w-full md:max-w-5xl mx-auto">

                            {/* Desktop video */}
                            {/* Desktop video */}
                            <LazyVideo
                                src="/diventa-host-2.mp4"
                                className="hidden md:block w-full md:w-[40%] h-auto rounded-lg"
                            />

                            <div className="flex flex-col w-full md:w-[40%] p-2 md:p-4 justify-center items-end text-right">
                                <h3 className="text-xl md:text-2xl font-bold text-accent-foreground mb-2 md:mb-4 uppercase">
                                    Imposta l&apos;accesso al parcheggio
                                </h3>
                                <h2 className="text-2xl md:text-4xl font-bold text-primary mb-2 md:mb-4">
                                    Imposta come si accede al parcheggio
                                </h2>
                                <p className="text-base md:text-lg">
                                    Gestisci gli accessi di persona o automatizza il parcheggio, permettendo ai driver di accedere tramite l&apos;app durante la prenotazione
                                </p>
                            </div>

                            {/* Mobile video */}
                            {/* Mobile video */}
                            <LazyVideo
                                src="/diventa-host-2.mp4"
                                className="md:hidden w-full h-auto rounded-lg mt-4"
                            />

                        </ScrollStackItem>
                    </ScrollStack>

                </div>
                <div className='w-full bg-accent flex flex-col gap-6 py-10 px-4'>
                    <h2 className="text-5xl font-extrabold mx-auto text-center text-primary">Non puoi essere presente per l&apos;accoglienza?</h2>
                </div>
                <div>
                    <div>
                        <h2 className="text-4xl font-bold mx-auto text-center text-primary px-4 mt-10">Inserisci i dati del parcheggio in app e ricevi il setup migliore</h2>
                        <p className="text-xl mx-auto text-center text-foreground w-[60%] mt-10">Scegli <span className='font-bold'>come impostare</span> gli accessi al tuo parcheggio: accogliendo di persona, utilizzando un dispositivo fornito da Parkito oppure utilizzandone uno che già possiedi.</p>
                    </div>
                    <div className="py-10 flex flex-col gap-4">
                        <Card className="flex flex-col md:flex-row bg-primary p-6 md:p-8 rounded-3xl shadow-xl w-[90%] md:w-[50%] mx-auto overflow-visible">
                            <CardHeader className=" flex flex-col items-center justify-center p-4 md:w-1/3">
                                <Badge className=" md:left-6 bg-accent-foreground text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold shadow-md z-10">
                                    consigliato
                                </Badge>
                                <Image
                                    src={"/rocket.webp"}
                                    alt="rocket"
                                    width={180}
                                    height={180}
                                    loading="lazy"
                                    className="mx-auto drop-shadow-lg"
                                />
                            </CardHeader>

                            {/* Right side - Content */}
                            <div className="flex flex-col md:w-2/3 p-4">
                                <CardContent className="flex flex-col items-start p-0 mb-4">
                                    <p className="text-sm text-lime-300 uppercase font-semibold tracking-wide mb-1">
                                        VUOI UN&apos;AUTOMAZIONE SU MISURA?
                                    </p>
                                    <CardTitle className="text-3xl font-bold text-accent mb-4">
                                        Dispositivo Parkito
                                    </CardTitle>
                                </CardContent>

                                <CardFooter className="p-0 flex-1 flex-col justify-center items-start">
                                    <ul className="text-left text-primary-foreground/90 flex flex-col gap-2 text-sm">
                                        <li className="flex items-start gap-2">
                                            <span className="text-lime-300">✨</span>
                                            Presenza fisica non necessaria
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-lime-300">📱</span>
                                            Invio automatizzato delle indicazioni per l&apos;accesso
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-lime-300">🕐</span>
                                            Assistenza 24h gestita da Parkito
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-lime-300">🔑</span>
                                            Eliminazione chiavi
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-lime-300">👥</span>
                                            Condivisione degli accessi con i tuoi famigliari (su richiesta)
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-lime-300">🏢</span>
                                            Accesso digitale per tutti i condomini disponibile (su richiesta)
                                        </li>
                                    </ul>
                                    <div className="flex justify-center mt-12">
                                        <Button
                                            variant="outline"
                                            className="rounded-full px-6 py-3 border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
                                            asChild
                                        >
                                            <Link href="/devices">
                                                Scopri i vantaggi <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardFooter>
                            </div>

                        </Card>
                        <Card className="flex flex-col md:flex-row bg-card p-6 md:p-8 rounded-3xl shadow-xl w-[90%] md:w-[50%] mx-auto overflow-visible">
                            <CardHeader className=" flex flex-col items-center justify-center p-4 md:w-1/3">
                                <Image
                                    src={"/secure.webp"}
                                    alt="security"
                                    width={180}
                                    height={180}
                                    loading="lazy"
                                    className="mx-auto drop-shadow-lg"
                                />
                            </CardHeader>

                            {/* Right side - Content */}
                            <div className="flex flex-col md:w-2/3 p-4">
                                <CardContent className="flex flex-col items-start p-0 mb-4">
                                    <p className="text-sm text-lime-300 uppercase font-semibold tracking-wide mb-1">
                                        HAI GIÀ UN DISPOSITIVO?
                                    </p>
                                    <CardTitle className="text-3xl font-bold mb-4">
                                        Dispositivo personale
                                    </CardTitle>
                                </CardContent>

                                <CardFooter className="p-0 flex-1 flex-col justify-center items-start">
                                    <ul className="text-left text-primary-foreground/90 flex flex-col gap-2 text-sm">
                                        <li className="flex items-start gap-2 text-foreground">
                                            <span>🏃🏻</span>
                                            Presenza fisica necessaria
                                        </li>
                                        <li className="flex items-start gap-2 text-foreground">
                                            <span>📱</span>
                                            Invio automatizzato delle indicazioni per l&apos;accesso
                                        </li>
                                        <li className="flex items-start gap-2 text-foreground">
                                            <span>🕐</span>
                                            Assistenza a carico tuo
                                        </li>
                                        <li className="flex items-start gap-2 text-foreground">
                                            <span>🔑</span>
                                            Non vengono eliminate le chiavi
                                        </li>
                                        <li className="flex items-start gap-2 text-foreground">
                                            <span>💔</span>
                                            Non è prevista la condivisione degli accessi con i tuoi famigliari
                                        </li>
                                        <li className="flex items-start gap-2 text-foreground">
                                            <span>🏢</span>
                                            Non disponibile l&apos;accesso digitale per tutti i condomini
                                        </li>
                                    </ul>
                                </CardFooter>
                            </div>

                        </Card>
                    </div>
                </div>
                <div className='relative bg-primary min-h-60 flex flex-col items-center justify-center gap-10'>
                    <h2 className='relative z-10 text-4xl font-bold mx-auto text-center text-accent'>Scarica Parkito e scopri la soluzione migliore per il tuo parcheggio</h2>
                    <DownloadButtons />
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
                </div>
                <div>
                    <h1 className="text-5xl font-extrabold mx-auto mb-4 text-center text-primary pt-10">Guadagna pià degli affitti tradizionali, ma non solo:</h1>
                    <div className='md:block hidden'>
                        <TableCompare rows={rows} />
                    </div>
                    <div className='md:hidden block'>
                        <MobileCompare rows={rows} />
                    </div>
                </div>
                {/* <div className='min-h-80 bg-red-500' id='icon-link'>

                    <h1 className="text-5xl font-extrabold mx-auto mb-4 text-center pt-10">RECENSIONI</h1>

                </div> */}
                <Faq items={faq} />
            </div>
        </>
    )
}