"use client";;
import useSupabaseJson from "@/hooks/useSupabase";
import { Parking } from "@/types";
import { slugify } from "@/lib/slugify";
import Link from "next/link";
import Loading from "./Loading";
import Error from "./Error";
import ReactMarkdown from "react-markdown";


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
            <div className="px-10 py-10">
                <h1 className="text-2xl font-bold mb-4">Parcheggio non trovato</h1>
                <Link href="/citta" className="text-blue-600 underline">
                    Torna alle città
                </Link>
            </div>
        );

    return (
        <div className="px-10 py-10 max-w-3xl">
            <h1 className="text-3xl font-bold mb-4">{parking.name}</h1>
            <p className="mb-2">
                <strong>Indirizzo:</strong> {parking.address}
            </p>
            <p className="mb-2">
                <strong>Città:</strong> {parking.city}
            </p>
            <p className="mb-2">
                <strong>Tipo di veicolo:</strong> {parking.vehicle_type}
            </p>
            <p className="mb-2">
                <strong>Tipo di parcheggio:</strong> {parking.parking_type}
            </p>
            {parking.driver_name && (
                <p className="mb-2">
                    <strong>Gestore:</strong> {parking.driver_name}
                </p>
            )}

            <ReactMarkdown
                components={{
                    section: ({ children }) => (
                        <p className="mb-4 text-gray-800 text-base leading-relaxed">{children}</p>
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
                    li: ({ children }) => <li className="ml-6 mb-2 list-disc">{children}</li>,
                }}
            >
                {parking.description}
            </ReactMarkdown>

            <Link href={`/citta/${citySlug}`} className="text-blue-600 underline">
                Torna ai parcheggi di {parking.city}
            </Link>
        </div>
    );
}
