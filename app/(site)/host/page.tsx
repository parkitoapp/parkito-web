import Banner from '@/components/Banner'
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack'
import Image from 'next/image'
import Faq from '@/components/Faq'
import { rows } from '@/data/rows'
import { faq } from '@/data/faq'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import TableCompare from '@/components/TableCompare'
import MobileCompare from '@/components/MobileCompare'
import BC from '@/components/BC'


export default function page() {
    return (
        <>
            <Banner title='Scarica Parkito e attiva il tuo parcheggio in 5 minuti.' subtitle='Condividi qualsiasi parcheggio, anche quelli condominiali.' src='/host.webp' dwbtn={true} icon={true} social={true}
            />
            <div className='bg-background'>
                <div className="px-16 pt-8">
                    <BC />
                </div>
                <div className=" min-h-screen sm:pb-120 md:pb-50 pb-150">
                    <h2 className="text-5xl font-extrabold mx-auto mb-4 px-4 text-center pt-10">La soluzione? Un parcheggio <span className="text-primary dark:text-ring">Parkito!</span></h2>
                    <ScrollStack className="bg-background">
                        {/* ITEM 1 */}
                        <ScrollStackItem itemClassName="flex flex-col md:flex-row p-4 md:p-8 bg-white dark:bg-accent rounded-lg justify-between w-full max-w-full md:max-w-5xl mx-auto">

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

                            <video
                                autoPlay
                                playsInline
                                loop
                                muted
                                preload="auto"
                                className="w-full md:w-[40%] h-auto rounded-lg mt-4 md:mt-0"
                            >
                                <source src="/diventa-host-1.mp4" type="video/mp4" />
                            </video>
                        </ScrollStackItem>

                        {/* ITEM 2 */}
                        <ScrollStackItem itemClassName="flex flex-col md:flex-row p-4 md:p-8 bg-white dark:bg-accent rounded-lg justify-between w-full max-w-full md:max-w-5xl mx-auto">

                            {/* Desktop video */}
                            <video
                                autoPlay
                                playsInline
                                loop
                                muted
                                preload="auto"
                                className="hidden md:block w-full md:w-[40%] h-auto rounded-lg"
                            >
                                <source src="/diventa-host-2.mp4" type="video/mp4" />
                            </video>

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
                            <video
                                autoPlay
                                playsInline
                                loop
                                muted
                                preload="auto"
                                className="md:hidden w-full h-auto rounded-lg mt-4"
                            >
                                <source src="/diventa-host-2.mp4" type="video/mp4" />
                            </video>
                        </ScrollStackItem>

                        {/* ITEM 3 */}
                        <ScrollStackItem itemClassName="flex flex-col md:flex-row p-4 md:p-8 bg-white dark:bg-accent rounded-lg justify-between w-full max-w-full md:max-w-5xl mx-auto">

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

                            <video
                                autoPlay
                                playsInline
                                loop
                                muted
                                preload="auto"
                                className="w-full md:w-[40%] h-auto rounded-lg mt-4 md:mt-0"
                            >
                                <source src="/diventa-host-3.mp4" type="video/mp4" />
                            </video>
                        </ScrollStackItem>

                        {/* ITEM 4 */}
                        <ScrollStackItem itemClassName="flex flex-col md:flex-row p-4 md:p-8 bg-white dark:bg-accent rounded-lg justify-between w-full max-w-full md:max-w-5xl mx-auto">

                            {/* Desktop video */}
                            <video
                                autoPlay
                                playsInline
                                loop
                                muted
                                preload="auto"
                                className="hidden md:block w-full md:w-[40%] h-auto rounded-lg"
                            >
                                <source src="/diventa-host-2.mp4" type="video/mp4" />
                            </video>

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
                            <video
                                autoPlay
                                playsInline
                                loop
                                muted
                                preload="auto"
                                className="md:hidden w-full h-auto rounded-lg mt-4"
                            >
                                <source src="/diventa-host-2.mp4" type="video/mp4" />
                            </video>

                        </ScrollStackItem>
                    </ScrollStack>

                </div>
                <div className='min-h-96 bg-accent'>
                    <h1 className="text-5xl font-extrabold mx-auto mb-4 text-center pt-10 text-primary">Perché scegliere <span className="text-primary dark:text-ring">Parkito:</span></h1>
                    <div className='md:grid md:grid-cols-2 flex flex-col gap-4 p-16'>
                        <Card className="bg-card rounded-lg flex flex-col items-center justify-start w-full">
                            <Image src={"/notif.webp"} alt="icona Disponibilità e prezzo" width={1300} height={1300} className='w-36 h-36 p-4' />
                            <div className='w-full p-6'>
                                <h2 className="text-2xl font-bold text-primary mt-4">Scegli la disponibilità e prezzo</h2>
                                <p className="mt-2 w-[60%] text-left">
                                    Condividi il tuo parcheggio quando e a che prezzo vuoi con un calendario super flessibile
                                </p>
                            </div>
                        </Card>
                        <Card className="bg-card rounded-lg flex flex-col items-center justify-start w-full">
                            <Image src={"/star.webp"} alt="icona Disponibilità e prezzo" width={1300} height={1300} className='w-36 h-36 p-4' />
                            <CardContent className='w-full p-6'>
                                <CardTitle className="text-2xl font-bold text-primary mt-4">100% Gratuito</CardTitle>
                                <CardDescription className="mt-2 w-[60%] text-left">
                                    Incassa sempre quello che chiedi, senza commissioni a carico
                                    tuo ed oneri burocratici
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card className="bg-card rounded-lg flex flex-col items-center justify-start w-full">
                            <Image src={"/reload.webp"} alt="icona Disponibilità e prezzo" width={1300} height={1300} className='w-36 h-36 p-4' />
                            <CardContent className='w-full p-6'>
                                <CardTitle className="text-2xl font-bold text-primary mt-4">Recedi quando vuoi</CardTitle>
                                <CardDescription className="mt-2 w-[60%] text-left">
                                    In Parkito non esistono vincoli: sarai sempre libero di eliminare il tuo parcheggio
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card className="bg-card rounded-lg flex flex-col items-center justify-start w-full">
                            <Image src={"/gold.webp"} alt="icona Disponibilità e prezzo" width={1300} height={1300} className='w-36 h-36 p-4' />
                            <CardContent className='w-full p-6'>
                                <CardTitle className="text-2xl font-bold text-primary mt-4">Guadagna fino al 300%</CardTitle>
                                <CardDescription className="mt-2 w-[60%] text-left">
                                    Massimizza il tuo ritorno economico
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className='w-full bg-accent flex flex-col gap-6 py-10 px-4'>
                    <h1 className="text-5xl font-extrabold mx-auto mb-4 text-center text-primary">Non puoi essere presente per l&apos;accoglienza?</h1>
                    <Image src="/access.webp" alt="icona Disponibilità e prezzo" width={1300} height={1300} className='mx-auto w-[50%] p-4' />
                    {/* <p className="text-center text-lg mx-auto w-[60%]">Nessun problema! Con Parkito puoi automatizzare l&apos;accesso al tuo parcheggio in pochi semplici passi, permettendo ai driver di entrare e uscire in completa autonomia tramite l&apos;app.</p> */}
                    <Button variant={"default"} className="mx-auto rounded-full p-4" size={"lg"} asChild>
                        <Link href={"/devices"}>
                            Automatizza l&apos;accesso
                        </Link>
                    </Button>
                </div>
                <div className=''>
                    <h1 className="text-5xl font-extrabold mx-auto mb-4 text-center text-primary pt-10">Hai ancora dubbi?</h1>
                    <div className='md:block hidden'>
                        <TableCompare rows={rows} />
                    </div>
                    <div className='md:hidden block'>
                        <MobileCompare rows={rows} />
                    </div>
                </div>
                <div className='min-h-80 bg-red-500' id='icon-link'>

                    <h1 className="text-5xl font-extrabold mx-auto mb-4 text-center pt-10">RECENSIONI</h1>

                </div>
                <Faq items={faq} />
            </div>
        </>
    )
}