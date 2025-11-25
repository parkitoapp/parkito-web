import Banner from '@/components/Banner'
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack'
import Image from 'next/image'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Faq from '@/components/Faq'
import { faq } from '@/data/faq'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { rows } from '@/data/rows'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'


export default function page() {
    return (
        <>
            <Banner title='Scarica Parkito e attiva il tuo parcheggio in 5 minuti.' subtitle='Condividi qualsiasi parcheggio, anche quelli condominiali.' src='/host.webp' dwbtn={true} icon={true} social={true}
            />
            <div className='min-h-80 bg-red-500' id='icon-link'>

                <h1 className="text-5xl font-extrabold mx-auto mb-4 text-center pt-10">RECENSIONI</h1>

            </div>
            <div className='min-h-96 bg-accent'>
                <h1 className="text-5xl font-extrabold mx-auto mb-4 text-center pt-10 text-primary">Perché scegliere Parkito:</h1>
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
            <div className="bg-background min-h-screen sm:pb-120 md:pb-50 pb-150">
                <h2 className="text-5xl font-extrabold mx-auto mb-4 text-center pt-10">La soluzione? Un parcheggio <span className="text-primary">Parkito!</span></h2>
                <ScrollStack className="bg-backround ">
                    <ScrollStackItem itemClassName="flex md:flex-row flex-col p-8 bg-white dark:bg-accent rounded-lg justify-between mx-auto md:max-w-5xl w-full">

                        <div className="flex flex-col min-h-full lg:w-[50%] md:w-[40%] p-4 justify-center items-start">

                            <h3 className="text-2xl w-full font-bold text-accent-foreground mb-4 uppercase">
                                Registrati e inizia a guadagnare
                            </h3>
                            <h2 className="text-4xl lg:w-lg font-bold text-primary">
                                Vai sul profilo e clicca &quot;Diventa Host&quot;
                            </h2>
                            <p className="text-lg lg:w-lg">Condividi il tuo parcheggio con le migliaia di utenti che ogni mese cercano un posto auto in Parkito</p>

                        </div>
                        <video autoPlay playsInline loop muted preload="auto" className=" bg-transparent rounded-lg md:h-full md:w-[40%] mx-auto md:mx-0">
                            <source src={"/diventa-host-1.mp4"} type="video/mp4" />
                        </video>

                    </ScrollStackItem>

                    <ScrollStackItem itemClassName="flex md:flex-row flex-col p-8 bg-white dark:bg-accent rounded-lg justify-between mx-auto md:max-w-5xl w-full">
                        <video autoPlay playsInline loop muted preload="auto" className="hidden md:block bg-transparent rounded-lg h-full md:w-[40%] mx-auto md:mx-0">
                            <source src={"/diventa-host-2.mp4"} type="video/mp4" />
                        </video>
                        <div className="flex flex-col min-h-full  lg:w-[50%] md:w-[40%] p-4 justify-center items-end">

                            <h3 className="text-2xl w-full font-bold text-accent-foreground mb-4 uppercase">
                                Prepara IBAN e foto del parcheggio
                            </h3>
                            <h2 className="text-4xl lg:w-lg font-bold text-primary">
                                Inserisci il tuo IBAN e inizia a guadagnare
                            </h2>
                            <p className="text-lg lg:w-lg">Inserisci le info principali del tuo parcheggio e il tuo IBAN: riceverai i pagamenti direttamente sul tuo conto corrente</p>
                        </div>
                        <video autoPlay playsInline loop muted preload="auto" className="md:hidden bg-transparent rounded-lg md:h-full md:w-[40%] mx-auto md:mx-0">
                            <source src={"/diventa-host-2.mp4"} type="video/mp4" />
                        </video>
                    </ScrollStackItem>

                    <ScrollStackItem itemClassName="flex md:flex-row flex-col p-8 bg-white dark:bg-accent rounded-lg justify-between mx-auto md:max-w-5xl w-full">
                        <div className="flex flex-col min-h-full  lg:w-[50%] md:w-[40%] p-4 justify-center items-start">

                            <h3 className="text-2xl w-full font-bold text-accent-foreground mb-4 uppercase">
                                PERSONALIZZA IL CALENDARIO
                            </h3>
                            <h2 className="text-4xl lg:w-lg font-bold text-chart-5">
                                Scegli disponibilità e prezzo
                            </h2>
                            <p className="text-lg lg:w-lg">24/7, solo in alcuni giornifasce orarie: con il calendario hai massima flessibilità su date e prezzo.</p>

                        </div>
                        <video autoPlay playsInline loop muted preload="auto" className=" bg-transparent rounded-lg md:h-full md:w-[40%] mx-auto md:mx-0">
                            <source src={"/diventa-host-3.mp4"} type="video/mp4" />
                        </video>
                    </ScrollStackItem>
                    <ScrollStackItem itemClassName="flex md:flex-row flex-col p-8 bg-white dark:bg-accent rounded-lg justify-between mx-auto md:max-w-5xl w-full">
                        <video autoPlay playsInline loop muted preload="auto" className="hidden md:block bg-transparent rounded-lg h-full md:w-[40%] mx-auto md:mx-0">
                            <source src={"/diventa-host-2.mp4"} type="video/mp4" />
                        </video>
                        <div className="flex flex-col min-h-full  lg:w-[50%] md:w-[40%] p-4 justify-center items-end">

                            <h3 className="text-2xl w-full font-bold text-accent-foreground mb-4 uppercase">
                                IMPOSTA L&apos;ACCESSO AL PARCHEGGIO
                            </h3>
                            <h2 className="text-4xl lg:w-lg font-bold text-primary">
                                Imposta come si accede al parcheggio
                            </h2>
                            <p className="text-lg lg:w-lg">Gestisci gli accessi di persona o automatizza il parcheggio, permettendo ai driver di accedere tramite l&apos;app durante la prenotazione</p>
                        </div>
                        <video autoPlay playsInline loop muted preload="auto" className="md:hidden bg-transparent rounded-lg md:h-full md:w-[40%] mx-auto md:mx-0">
                            <source src={"/diventa-host-2.mp4"} type="video/mp4" />
                        </video>
                    </ScrollStackItem>
                </ScrollStack>
            </div>
            <div className='w-full bg-accent flex flex-col gap-6 py-10 px-4 md:pt-60'>
                <h1 className="text-5xl font-extrabold mx-auto mb-4 text-center pt-10 text-primary">Non puoi essere presente per l&apos;accoglienza?</h1>
                <Image src="/access.webp" alt="icona Disponibilità e prezzo" width={1300} height={1300} className='mx-auto w-[50%] p-4' />
                {/* <p className="text-center text-lg mx-auto w-[60%]">Nessun problema! Con Parkito puoi automatizzare l&apos;accesso al tuo parcheggio in pochi semplici passi, permettendo ai driver di entrare e uscire in completa autonomia tramite l&apos;app.</p> */}
                <Button variant={"default"} className="mx-auto rounded-full p-4" size={"lg"} asChild>
                    <Link href={"/devices"}>
                        Automatizza l&apos;accesso
                    </Link>
                </Button>
            </div>
            <div className='bg-background'>
                <h1 className="text-5xl font-extrabold mx-auto mb-4 text-center text-primary pt-10">Hai ancora dubbi?</h1>
                <Table className='w-[60%] mx-auto bg-card'>
                    <TableCaption>Motivi per cui siamo i migliori😎.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead className='font-bold text-lg text-foreground'>Affitti Tradizionali</TableHead>
                            <TableHead className='p-2'>
                                <Image src="/logo-cropped.webp" width={50} height={50} className="object-contain mx-auto" alt="parkito-logo" />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row, idx) => (
                            <TableRow key={idx}>
                                <TableCell className="font-medium text-lg p-6 text-foreground">{row.feature}</TableCell>
                                <TableCell className='p-6 text-lg text-foreground'>{row.traditional}</TableCell>
                                <TableCell className='p-6 text-lg text-foreground'>{row.parkito}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Faq items={faq} />
        </>
    )
}