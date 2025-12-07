//app/components/ParkingList.tsx

"use client";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { Parking } from "@/types";
import { useParams } from "next/navigation";
import ParkingCard from "@/components/ParkingCard";
import { useEffect, useState } from "react";

export default function ParkingList({ city }: { city?: string }) {
    const params = useParams();
    // Prefer explicit prop, else fallback to route param (client-side navigation)
    const routeSlug = typeof params?.slug === 'string' ? params.slug : undefined;
    const citySlug = city ?? routeSlug;

    const [parkings, setParkings] = useState<Parking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchParkings() {
            if (!citySlug) return;

            setLoading(true);
            try {
                const response = await fetch(`/api/parkings/${citySlug}`);
                if (!response.ok) {
                    setError("Failed to fetch parkings");
                    setLoading(false);
                    return;
                }
                const data = await response.json();
                setParkings(data);
                setError(null);
            } catch {
                setError("Failed to fetch parkings");
            } finally {
                setLoading(false);
            }
        }
        fetchParkings();
    }, [citySlug]);

    if (loading) return <Loading />;
    if (error) return <Error message={error} title="Parcheggio non trovato, torna indietro" src={`/citta/${city}`} />

    // Safety: parkings might be undefined for 1 render
    const safeParkings = Array.isArray(parkings) ? parkings : [];


    return (
        <div className="min-h-screen w-full px-8 bg-background">
            <h1 className="text-7xl font-bold text-chart-2">I migliori parcheggi di {citySlug}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 h-full">
                {safeParkings.map((p) => (
                    <ParkingCard key={p.id} parking={p} />
                ))}
            </div>
        </div>
    );
}
