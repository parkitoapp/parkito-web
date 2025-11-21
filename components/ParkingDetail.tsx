"use client";

import { useEffect, useState } from "react";
import useSupabaseJson from "@/hooks/useSupabase";
import { Parking } from "@/types";
import { slugify } from "@/lib/slugify";
import Link from "next/link";
import Loading from "./Loading";
import Error from "./Error";

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
            <p className="mb-4">{parking.description}</p>

            <Link href={`/citta/${citySlug}`} className="text-blue-600 underline">
                Torna ai parcheggi di {parking.city}
            </Link>
        </div>
    );
}
