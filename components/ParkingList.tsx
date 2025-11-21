//app/components/ParkingList.tsx

"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import useSupabaseJson from "@/hooks/useSupabase";
import { Parking } from "@/types";
import { useRouter, useParams } from "next/navigation";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { slugify } from '@/lib/slugify';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ParkingList({ city }: { city?: string }) {
    const router = useRouter();
    const params = useParams();

    // Prefer explicit prop, else fallback to route param (client-side navigation)
    const routeSlug = typeof params?.slug === 'string' ? params.slug : undefined;
    const citySlug = city ?? routeSlug;

    console.log("City param (prop):", city, "routeSlug:", routeSlug, "using:", citySlug);

    const { data: parkings, loading, error } = useSupabaseJson<Parking>(
        "parking_sheet_data",
        "parkings_data.json"
    );

    if (loading) return <Loading />;
    if (error) {
        return (
            <Error
                message={error.message}
                title="Parcheggio non trovato, torna indietro"
                onClick={() => router.push("/citta")}
            />
        );
    }

    // Safety: hook might return undefined for 1 render
    const safeParkings = Array.isArray(parkings) ? parkings : [];

    // If citySlug is a human name like 'torino' or 'la-spezi a', normalize and compare
    const filtered = safeParkings.filter((p) => {
        const pSlug = slugify(p?.city);
        return pSlug && citySlug ? pSlug === slugify(citySlug) : false;
    });

    return (
        <div>
            <h1>Parkings in {citySlug}</h1>
            {filtered.map((p) => (
                <Card key={p.id} className="border shadow-md rounded-lg overflow-hidden bg-transparent hover:scale-[1.02] transition-transform duration-200 relative hover:shadow-lg">
                    {/* <Image
                        src={p.address}
                        alt={p.name}
                        width={400}
                        height={200}
                        className="rounded-md w-full h-40 object-cover mb-3"
                    /> */}


                    <CardFooter className="flex flex-row gap-2 items-center px-2 py-4 w-full">
                        <CardTitle className="text-chart-2 text-xl items-center justify-start text-left w-full">{p.name}</CardTitle>


                        <Link href={`/citta/${slugify(p.city)}/${slugify(p.address)}`}>
                            Scopri i dettagli &rarr;
                        </Link>


                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
