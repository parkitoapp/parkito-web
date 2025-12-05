"use client";

import { useEffect, useState } from "react";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/lib/slugify";

import { Parking } from "@/types";
import { fetchParkingPhotoServer } from "@/lib/parking-server";
import { ArrowRightIcon } from "lucide-react";

export default function ParkingCard({ parking }: { parking: Parking }) {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadImage() {
            setIsLoading(true);
            const url = await fetchParkingPhotoServer(parking.id);
            setImageUrl(url!);
            setIsLoading(false);
        }
        loadImage();
    }, [parking.id]);

    return (
        <Card className="border shadow-md rounded-3xl overflow-hidden bg-card hover:scale-[1.02] transition-transform duration-200 relative hover:shadow-lg min-w-[60%]">
            {isLoading ? (
                <div className="w-full h-40 bg-muted animate-pulse rounded-md mb-3" />
            ) : (
                <Image
                    src={imageUrl ?? "/parkitoplaceholder.webp"}
                    alt={parking.name}
                    width={400}
                    height={200}
                    loading="lazy"
                    className="rounded-md w-full h-40 object-cover mb-3"
                />
            )}

            <CardFooter className="flex flex-col md:flex-row gap-2 items-center justify-center py-4 w-full px-10">
                <CardTitle className="text-chart-2 text-xl items-center justify-start text-left w-full">
                    {parking.name}
                </CardTitle>

                <Button variant="default" className="p-6 rounded-3xl" asChild>
                    <Link href={`/citta/${slugify(parking.city)}/${slugify(parking.address)}`}>
                        Vai ai dettagli <ArrowRightIcon />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
