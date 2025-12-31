"use client";

import { CityType } from "@/types";
import { useState } from "react";
import { Card, CardFooter, CardTitle } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function CityCard({ city }: { city: CityType }) {
    const [hasError, setHasError] = useState(false);

    return (
        <Card className="shadow-md overflow-hidden bg-card hover:scale-[1.02] transition-transform duration-200 relative hover:shadow-lg rounded-3xl">
            <Image
                src={hasError ? (city.fallbackImage || '/citta1.webp') : city.image}
                alt={`Immagine per ${city.name}`}
                width={400}
                height={200}
                loading="lazy"
                className="rounded-t-3xl w-full h-40 object-cover mb-3"
                onError={() => {
                    if (!hasError) {
                        setHasError(true);
                    }
                }}
            />

            <CardFooter className="flex flex-col xl:flex-row gap-2 items-center px-6 py-4 w-full">
                <CardTitle className="dark:text-chart-3 text-chart-4 text-xl items-center justify-start text-left w-full">{city.name}</CardTitle>

                <Button variant="default" className="p-2 mt-2 rounded-2xl items-center justify-center" asChild>
                    <Link href={city.url}>Scopri {city.name} <ArrowRightIcon /></Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
