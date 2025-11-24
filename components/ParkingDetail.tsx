"use client";;
import useSupabaseJson from "@/hooks/useSupabase";
import { Parking } from "@/types";
import { slugify } from "@/lib/slugify";
import Link from "next/link";
import Loading from "./Loading";
import Error from "./Error";
import ReactMarkdown from "react-markdown";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircleIcon, Book, Car, MapPlus, ParkingCircle, User, } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import Faq from "./Faq";
import { blogFaqs } from "@/data/blogFaq";

const parkingFaq = [
    {
        question: "Come posso prenotare un parcheggio?",
        answer: "Puoi prenotare un parcheggio contattando direttamente il gestore tramite i recapiti forniti nella descrizione del parcheggio."
    },
    {
        question: "Quali tipi di veicoli sono ammessi?",
        answer: "I tipi di veicoli ammessi variano a seconda del parcheggio. Controlla la sezione 'Tipo di veicolo' per maggiori dettagli."
    },
    {
        question: "Ci sono tariffe speciali per lunghi periodi di sosta?",
        answer: "Alcuni parcheggi offrono tariffe scontate per soste prolungate. Ti consigliamo di contattare il gestore per informazioni specifiche."
    }
];


interface Props {
    citySlug: string;
    parkingAddress: string;
}

export default function ParkingDetail({ citySlug, parkingAddress }: Props) {
    const { data: parkings, loading, error, refetch } = useSupabaseJson<Parking>(
        "parking_sheet_data",
        "parkings_data.json"
    );

    const parking = parkings
        ? parkings.find(
            (p) => slugify(p.city) === citySlug && slugify(p.address) === parkingAddress
        ) || null
        : null;

    if (loading) return <Loading />;

    if (error)
        return <Error message={error.message} title="Errore nel fetch del parcheggio" onClick={refetch} />;

    if (!parking)
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center">
                <Alert className=" w-[50%]" variant={"default"}>
                    <AlertTitle className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <AlertCircleIcon /> Parcheggio non trovato
                    </AlertTitle>
                    <AlertDescription>
                        <Button variant="default" className="w-full  " asChild>
                            <Link href={`/citta/${citySlug}`} className="text-blue-600 underline w-full h-full ">
                                Torna a {citySlug}
                            </Link>
                        </Button>
                    </AlertDescription>
                </Alert>
            </div>
        );

    return (
        <div className="flex flex-col w-full min-h-screen items-center justify-center pt-30">
            <Card className="px-10 py-10 max-w-7xl">
                <CardHeader>
                    <CardTitle className="text-4xl font-bold mb-2 flex items-center gap-4 text-primary">
                        {parking.address}, {parking.city}
                    </CardTitle>
                </CardHeader>
                <CardContent className="md:grid md:grid-cols-2 flex flex-col m-2">
                    <Image
                        src={'/torino.webp'}
                        alt={parking.name}
                        width={500}
                        height={300}
                        className="rounded-md m-auto object-cover"
                    />
                    <CardDescription>

                        <div className="flex md:flex-row flex-col w-full justify-evenly items-center mb-4 gap-2 mt-2">
                            <Button variant={"default"} asChild className="rounded-full bg-green-600 hover:bg-green-900 px-4">
                                <Link href={"https://www.google.com/maps/dir//" + encodeURIComponent(parking.address + ", " + parking.city)} target="_blank" rel="noopener noreferrer">
                                    <MapPlus /> Indicazioni
                                </Link>
                            </Button>
                            <Button variant={"default"} asChild className="rounded-full px-4">
                                {(() => {
                                    const humanCity = citySlug
                                        ? citySlug
                                            .split("-")
                                            .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
                                            .join(" ")
                                        : "";
                                    return (
                                        <Link href={`/blog?city=${encodeURIComponent(humanCity)}#blog`} target="_blank" rel="noopener noreferrer">
                                            <Book /> Leggi il nostro blog
                                        </Link>
                                    );
                                })()}
                            </Button>

                        </div>
                        <div className="flex flex-col items-center justify-center gap-4 md:grid md:grid-cols-3 w-full">
                            <div className="flex flex-col items-center justify-center gap-2 mb-2 w-full">
                                <div className="flex gap-2 items-center justify-center w-full">
                                    <ParkingCircle className="text-primary" />
                                    <p className="font-bold text-primary">tipo di parcheggio: </p>
                                </div>
                                <p className="text-foreground">{parking.parking_type}</p>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2 mb-2 w-full">
                                <div className="flex gap-2 items-center justify-center w-full">
                                    <Car className="text-primary" />
                                    <p className="font-bold text-primary">Veicolo Max: </p>
                                </div>
                                <p className="text-foreground">{parking.vehicle_type}</p>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2 mb-2 w-full">
                                <div className="flex gap-2 items-center w-full justify-center">
                                    <User className="text-primary" />
                                    <p className="font-bold text-primary">Host: </p>
                                </div>
                                <p className="text-foreground">{parking.driver_name}</p>
                            </div>
                        </div>

                        <ReactMarkdown
                            components={{
                                p: ({ children }) => (
                                    <p className="mb-4 text-foreground">{children}</p>
                                ),
                                a: ({ href, children }) => (
                                    <Link
                                        href={href || "#"}
                                        className="text-chart-1 hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {children}
                                    </Link>
                                ),
                                h1: ({ children }) => <h1 className="text-5xl font-bold mt-10 mb-6 text-chart-2">{children}</h1>,
                                h2: ({ children }) => <h2 className="text-3xl font-semibold mt-8 mb-4 text-chart-2">{children}</h2>,
                                h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-3 text-chart-2">{children}</h3>,
                                li: ({ children }) => <li className="ml-6 mb-2 list-disc font-bold">{children}</li>,
                            }}
                        >
                            {parking.description}
                        </ReactMarkdown>
                        <div className="flex flex-row w-full mx-auto items-center justify-center gap-4 mt-6">
                            <Link href="https://apps.apple.com/it/app/parkito-park-sharing/id6446240996" aria-label="apple download button">
                                <Image src="/applebtn.png" alt="App Store" width={150} height={50} />
                            </Link>
                            <Link href="https://play.google.com/store/apps/details?id=it.autoindabox.mobile&hl=it" aria-label="android download button">
                                <Image src="/googlebtn.png" alt="Google Play" width={150} height={50} />
                            </Link>
                        </div>
                    </CardDescription>
                </CardContent>
                <Faq items={parkingFaq} />
                <Button variant="default" className="mt-10" asChild>
                    <Link href={`/citta/${citySlug}`} className="text-blue-600 underline m-2">
                        Torna ai parcheggi di {parking.city}
                    </Link>
                </Button>
            </Card>
        </div>
    );
}
