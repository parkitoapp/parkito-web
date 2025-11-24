// components/CityList.tsx

"use client";

import useSupabaseJson from "@/hooks/useSupabase";
import { Parking } from "@/types";
import Loading from "./Loading";
import Error from "./Error";
import Image from "next/image";
import { Card, CardFooter, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

export interface CityType {
    id: number;
    name: string;
    url: string;
    image: string;
}

export default function CityList() {
    const { data: parkings, loading, error, refetch } = useSupabaseJson<Parking>(
        "parking_sheet_data",
        "parkings_data.json",
    );

    if (loading) return <Loading />;
    if (error)
        return (
            <Error
                onClick={refetch}
                message={error.message}
                title="Errore di fetch dei parkings"
            />
        );
    if (parkings.length === 0) return <div>No parkings available.</div>;

    // ---- UNIQUE CITY EXTRACTION ----
    const cityMap = new Map<string, Parking>();

    for (const p of parkings) {
        if (!cityMap.has(p.city)) {
            cityMap.set(p.city, p); // first parking per city
        }
    }

    const cities: CityType[] = Array.from(cityMap.entries()).map(
        ([cityName, p]) => ({
            id: p.id,
            name: cityName,
            url: `/citta/${cityName.toLowerCase()}`,
            image: `/${cityName.toLowerCase()}.webp`, // your choice
        })
    );

    // ---- RENDER ----
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 py-10 bg-background">
            {cities.map((city) => (
                <Card key={city.id} className="border shadow-md rounded-lg overflow-hidden bg-transparent hover:scale-[1.02] transition-transform duration-200 relative hover:shadow-lg">
                    <Image
                        src={city.image}
                        alt={city.name}
                        width={400}
                        height={200}
                        className="rounded-md w-full h-40 object-cover mb-3"
                    />


                    <CardFooter className="flex flex-row gap-2 items-center px-2 py-4 w-full">
                        <CardTitle className="text-chart-2 text-xl items-center justify-start text-left w-full">{city.name}</CardTitle>


                        <Button variant="default" className="p-0 mt-2" asChild>
                            <Link href={city.url}>Scopri i migliori parcheggi a {city.name} &rarr;</Link>
                        </Button>

                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}