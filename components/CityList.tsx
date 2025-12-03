import { CityType } from "@/lib/parking";
import Image from "next/image";
import { Card, CardFooter, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

export default function CityList({ cities }: { cities: CityType[] }) {
    if (cities.length === 0) return <div>No parkings available.</div>;

    // ---- RENDER ----
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 py-10 bg-background" id="icon-link">
            {cities.map((city) => (
                <Card key={city.id} className="border shadow-md overflow-hidden bg-card hover:scale-[1.02] transition-transform duration-200 relative hover:shadow-lg rounded-3xl">
                    <Image
                        src={city.image}
                        alt={`Immagine per ${city.name}`}
                        width={400}
                        height={200}
                        loading="lazy"
                        className="rounded-t-3xl w-full h-40 object-cover mb-3"
                    />


                    <CardFooter className="flex flex-col xl:flex-row gap-2 items-center px-6 py-4 w-full">
                        <CardTitle className="dark:text-chart-3 text-chart-4 text-xl items-center justify-start text-left w-full">{city.name}</CardTitle>


                        <Button variant="default" className="p-2 mt-2 rounded-2xl" asChild>
                            <Link href={city.url}>Scopri i migliori parcheggi a {city.name} &rarr;</Link>
                        </Button>

                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}