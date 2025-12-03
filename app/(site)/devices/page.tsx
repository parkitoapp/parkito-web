import Banner from "@/components/Banner"
import Image from "next/image"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DeviceTabs from "@/components/DeviceTabs"
import BC from "@/components/BC"


export default function page() {
    return (
        <>
            <Banner title="Automatizza l'accesso del tuo parcheggio, senza preoccupazioni, anche in condominio" subtitle="Compatibile con tutti i tipi di accesso e nessun permesso necessario" src="/device.webp" src2="/devicePill.webp" icon={true} social={true} dwbtn={true} />

            <div className="bg-background">
                <div className="px-16 pt-8">
                    <BC />
                </div>
                <div className="w-full mx-auto bg-background lg:pb-20" >

                    <div className="w-full flex mx-auto flex-col min-h-80 bg-accent justify-center items-center py-10 px-16 text-center rounded-t-3xl lg:rounded-none shadow-lg gap-5">

                        <h1 className="text-4xl flex flex-col font-bold mb-4 text-primary">Come funziona?</h1>
                        <p className="text-2xl text-chart-3 dark:text-primary text-center max-w-[80%]">
                            Parkito ti mette a disposizione una serie di dispositivi intelligenti integrati direttamente con l&apos;applicazione,
                            in grado di farti ricevere prenotazioni senza essere presente di persona.
                            Con Parkito tutti i varchi, tra cui i cancelli condominiali e le serrande dei box auto, sono automatizzabili.
                        </p>
                        <div className="flex flex-col lg:grid lg:grid-cols-3 items-baseline gap-10">

                            <Card className="flex flex-col w-50 bg-card p-4 rounded-xl">
                                <CardHeader>
                                    <Image src="/headache.webp" alt="icona stress" width={200} height={200} sizes="(max-width: 768px) 160px, 200px" loading="lazy" />
                                </CardHeader>

                                <CardTitle className="text-md font-bold text-primary dark:text-chart-3 text-lg">
                                    No Stress per la sicurezza
                                </CardTitle>
                                <CardDescription>
                                    Traccia gli accessi al tuo parcheggio
                                </CardDescription>
                            </Card>
                            <Card className="flex flex-col w-50 bg-card p-4 rounded-xl">
                                <CardHeader>
                                    <Image src="/clock.webp" alt="icona orologio" width={200} height={200} sizes="(max-width: 768px) 160px, 200px" loading="lazy" />
                                </CardHeader>
                                <CardTitle className="text-md font-bold text-primary dark:text-chart-3 text-lg">
                                    Utenti Verificati
                                </CardTitle>
                                <CardDescription>
                                    Potrà accedere solo chi ha scaricato l&apos;app e ha prenotao il tuo parcheggio
                                </CardDescription>
                            </Card>
                            <Card className="flex flex-col w-50 bg-card p-4 rounded-xl">
                                <CardHeader>
                                    <Image src="/light.webp" alt="icona luci" width={200} height={200} sizes="(max-width: 768px) 160px, 200px" loading="lazy" />
                                </CardHeader>
                                <CardTitle className="text-md font-bold text-primary dark:text-chart-3 text-lg">
                                    Accesso in autonomia
                                </CardTitle>
                                <CardDescription>
                                    La tua presenza non sarà necessaria
                                </CardDescription>
                            </Card>
                        </div>
                    </div>
                </div>

                <div className="bg-background pb-10 px-4">

                    <h2 className="text-5xl font-extrabold mx-auto mb-4 text-center pt-10">La soluzione? Un parcheggio <span className="text-primary">Parkito!</span></h2>

                    <div className="flex xl:flex-row md:flex-col flex-col p-8 bg-white dark:bg-accent rounded-lg justify-between mx-auto max-w-5xl md:items-center w-full">

                        <div className="flex flex-col min-h-full lg:w-[50%] md:w-[40%] p-4 justify-center items-start">

                            <h3 className="text-2xl w-full font-bold text-accent-foreground mb-4 uppercase">
                                Ricevi il dispositivo su misura per te!
                            </h3>
                            <h2 className="text-4xl lg:w-lg font-bold text-primary">
                                Inserisci i dati del parcheggio
                            </h2>
                            <p className="text-lg lg:w-lg">
                                Parkito permette una <strong>compatibilità universale</strong> con i <strong>più sicuri dispositivi</strong> di accesso in circolazione, grazie ad <strong>accordi esclusivi</strong> con le più affidabili aziende produttrici del settore
                            </p>

                        </div>
                        <div className="flex xl:flex-col md:flex-row flex-col items-center gap-6 bg-white p-4 rounded-xl">
                            <Image src={"/masterlock.webp"} alt="masterlock logo" width={300} height={300} loading="lazy" />
                            <Image src={"/1control.webp"} alt="1control logo" width={300} height={300} loading="lazy" />
                            <Image src={"/okhome.webp"} alt="okhome logo" width={300} height={300} loading="lazy" />
                        </div>
                    </div>

                </div>
                <div className="w-full mx-auto" >
                    <div className="w-full flex mx-auto flex-col min-h-80 bg-accent justify-center items-center py-10 px-16 text-center rounded-t-3xl lg:rounded-none shadow-lg gap-5">
                        <h2 className="text-5xl font-extrabold mx-auto mb-4 text-center text-primary">Scegli come far accedere i driver al tuo parcheggio</h2>
                        <DeviceTabs />
                    </div>

                </div>
            </div >
        </>
    )
}