//app/components/ParkingList.tsx

"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import useSupabaseJson from "@/hooks/useSupabase";
import { Parking } from "@/types";
import { useParams } from "next/navigation";
import { slugify } from '@/lib/slugify';
import ParkingCard from "@/components/ParkingCard";

export default function ParkingList({ city }: { city?: string }) {
    const params = useParams();
    // Prefer explicit prop, else fallback to route param (client-side navigation)
    const routeSlug = typeof params?.slug === 'string' ? params.slug : undefined;
    const citySlug = city ?? routeSlug;

    // console.log("City param (prop):", city, "routeSlug:", routeSlug, "using:", citySlug);

    const { data: parkings, loading, error } = useSupabaseJson<Parking>(
        "parking_sheet_data",
        "parkings_data.json"
    );

    if (loading) return <Loading />;
    if (error) return <Error message={error.message} title="Parcheggio non trovato, torna indietro" src={`/citta/${city}`} />

    // Safety: hook might return undefined for 1 render
    const safeParkings = Array.isArray(parkings) ? parkings : [];

    // If citySlug is a human name like 'torino' or 'la-spezi a', normalize and compare
    const filtered = safeParkings.filter((p) => {
        const pSlug = slugify(p?.city);
        return pSlug && citySlug ? pSlug === slugify(citySlug) : false;
    });

    return (
        <div className="min-h-screen w-full px-8 bg-background">
            <h1 className="text-7xl font-bold text-chart-2">I migliori parcheggi di {citySlug}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 h-full">
                {filtered.map((p) => (
                    <ParkingCard key={p.id} parking={p} />
                ))}
            </div>
        </div>
    );
}
