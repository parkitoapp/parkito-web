import Banner from "@/components/Banner"
import Image from "next/image"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import BC from "@/components/BC"
import DownloadButtons from "@/components/DownloadButtons"
import Link from "next/link"


export default function page() {
    return (
        <>
            <Banner title="Automatizza gli accessi al tuo parcheggio e guadagna senza preoccuparti di nulla" src="/device.webp" src2={true} icon={true} social={true} dwbtn={true} />

            <div className="bg-background">
                <div className="px-16 pt-8">
                    <BC />
                </div>
                <div className="w-full mx-auto bg-background lg:pb-20" >

                    <div className="w-full flex mx-auto flex-col min-h-80 justify-center items-center py-10 px-16 text-center rounded-t-3xl lg:rounded-none gap-5">

                        <h1 className="text-4xl flex flex-col font-bold mb-4 text-primary">Come funziona?</h1>
                        <p className="text-2xl text-center max-w-[80%] mb-4 text-primary">
                            La piattaforma di Parkito ti consente di automatizzare gli accessi del tuo parcheggio in modo semplice e veloce, per farti ricevere prenotazioni senza essere presente di persona.
                        </p>
                        <p className="text-2xl text-center max-w-[80%] mb-8 text-primary">
                            Grazie a Parkito puoi attivare un controllo da remoto per qualsiasi tipologia di varco: cancelli, portoni, sbarre, basculanti...
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 items-stretch gap-10">
                            <Card className="flex flex-col bg-card p-4 rounded-xl">
                                <CardHeader>
                                    <Image src="/safety.webp" alt="icona sicurezza" width={200} height={200} sizes="(max-width: 768px) 160px, 200px" loading="lazy" className="mx-auto" />
                                </CardHeader>
                                <div className="mt-auto">
                                    <CardTitle className="text-lg font-bold text-primary dark:text-chart-3">
                                        Sicurezza aumentata
                                    </CardTitle>
                                    <CardDescription>
                                        Traccia gli accessi al tuo parcheggio
                                    </CardDescription>
                                </div>
                            </Card>
                            <Card className="flex flex-col bg-card p-4 rounded-xl">
                                <CardHeader>
                                    <Image src="/secure.webp" alt="icona utenti verificati" width={200} height={200} sizes="(max-width: 768px) 160px, 200px" loading="lazy" className="mx-auto" />
                                </CardHeader>
                                <div className="mt-auto">
                                    <CardTitle className="text-lg font-bold text-primary dark:text-chart-3">
                                        Utenti Verificati
                                    </CardTitle>
                                    <CardDescription>
                                        Gli utenti sono verificati tramite carta di identità
                                    </CardDescription>
                                </div>
                            </Card>
                            <Card className="flex flex-col bg-card p-4 rounded-xl">
                                <CardHeader>
                                    <Image src="/automatic.webp" alt="icona automatico" width={200} height={200} sizes="(max-width: 768px) 160px, 200px" loading="lazy" className="mx-auto" />
                                </CardHeader>
                                <div className="mt-auto">
                                    <CardTitle className="text-lg font-bold text-primary dark:text-chart-3">
                                        Accesso in autonomia
                                    </CardTitle>
                                    <CardDescription>
                                        La tua presenza non sarà necessaria
                                    </CardDescription>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                <div className="relative bg-primary flex flex-col gap-6 min-h-96 py-20">
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="relative w-full h-full">
                            <Image
                                src="/linea-desk.webp"
                                alt=""
                                fill
                                className="hidden xl:block object-cover object-center opacity-70"
                                aria-hidden
                            />
                            <Image
                                src="/linea-mob.webp"
                                alt=""
                                fill
                                className="xl:hidden object-cover object-center opacity-70"
                                aria-hidden
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center w-full gap-8 md:gap-0">
                        <div className="w-full md:w-2/3 flex flex-col items-center justify-start mt-10 px-4">
                            <h2 className="text-3xl md:text-5xl font-extrabold mx-auto mb-4 text-center text-background"><span className="text-lime-300 dark:text-accent-foreground">Collaboriamo</span> con le migliori aziende</h2>
                            <p className="text-lg md:text-2xl text-center max-w-full md:max-w-[70%] mb-4 text-background">
                                Grazie ad <span className="text-lime-300 dark:text-accent-foreground">accordi esclusivi</span> con le migliori aziende produttrici, la piattaforma di Parkito offre una <span className="text-lime-300 dark:text-accent-foreground">compatibilità universale</span> con i più sicuri dispositivi di gestione degli accessi presenti sul mercato.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 items-center justify-center w-full md:w-1/3 px-4">
                            <div className="bg-white rounded-full px-8 md:px-12 py-4 md:py-6 flex items-center justify-center w-full max-w-[30em]">
                                <Image src={'/masterlock.webp'} width={180} height={60} alt="masterlock logo" className="object-contain w-auto h-auto" />
                            </div>
                            <div className="bg-white rounded-full px-8 md:px-12 py-4 md:py-6 flex items-center justify-center w-full max-w-[30em]">
                                <Image src={'/1control.webp'} width={180} height={60} alt="1control logo" className="object-contain w-auto h-auto" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between relative z-20 gap-8 md:gap-0">
                        <div className="px-4 md:px-12 py-6 flex items-center justify-center w-full md:w-[50em] order-2 md:order-1">
                            <Image src={'/automatic.webp'} width={480} height={60} alt="automatic logo" className="object-contain w-full max-w-[480px] h-auto" />
                        </div>
                        <div className="w-full md:w-2/3 flex flex-col items-center justify-start mt-10 px-4 order-1 md:order-2">
                            <h2 className="text-3xl md:text-5xl font-extrabold mx-auto mb-4 text-center text-background">Per garantirti <span className="text-lime-300 dark:text-accent-foreground">sicurezza</span> possibile</h2>
                            <p className="text-lg md:text-2xl text-center max-w-full md:max-w-[80%] mb-4 text-background">
                                I driver potranno <span className="text-lime-300 dark:text-accent-foreground">accedere</span> al tuo parcheggio soltanto all&apos;interno della fascia oraria prenotata, utilizzando <span className="text-lime-300 dark:text-accent-foreground">codici</span> di accesso <span className="text-lime-300 dark:text-accent-foreground">unici</span> e <span className="text-lime-300 dark:text-accent-foreground">temporanei</span>.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-5xl font-extrabold mx-auto mb-4 text-center text-primary mt-10">
                        Non servono permessi condominiali
                    </h2>
                    <div className="flex md:flex-row flex-col items-center justify-between w-full mx-auto">
                        <div className="md:w-1/2 p-20">
                            <p className="text-primary text-xl">
                                In base all&apos;attuale normativa italiana <Link className="underline text-chart-2" href='https://legis.xligo.com/documento/it/documentazione/stato/codice.civile/art1102/comma1?v=2025-02-20'>(art. 1102 Codice Civile)</Link> <span className="font-bold">non c&apos;è alcuna limitazione all&apos;utilizzo della cosa comune</span> purché non ne venga alterata la destinazione e non venga impedito agli altri condomini di farne parimenti uso secondo il loro diritto.
                            </p>
                        </div>
                        <div className="md:w-1/2 p-20">
                            <Image src={'/condo.webp'} width={480} height={60} alt="condominio logo" className="object-contain w-full mx-auto" />
                        </div>
                    </div>
                </div>
                <div className='relative bg-primary min-h-60 flex flex-col items-center justify-center gap-10'>
                    <h2 className='relative z-10 text-2xl md:text-4xl font-bold mx-auto text-center text-accent'>Scarica Parkito e scopri la soluzione migliore per il tuo parcheggio</h2>
                    <DownloadButtons />
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="relative w-full h-full">
                            <Image
                                src="/linea-desk.webp"
                                alt=""
                                fill
                                className="hidden xl:block object-cover object-center opacity-70"
                                aria-hidden
                            />
                            <Image
                                src="/linea-mob.webp"
                                alt=""
                                fill
                                className="xl:hidden object-cover object-center opacity-70"
                                aria-hidden
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}