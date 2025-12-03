'use client'

import { CityType } from "@/lib/parking";
import { Card, CardFooter, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import Filter from "./Filter";
import { useState } from "react";

export default function CityListClient({ cities }: { cities: CityType[] }) {
    const [query, setQuery] = useState("");
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

    if (cities.length === 0) return <div>No parkings available.</div>;

    // Extract unique regions/cities for filtering (using city names as filters)
    const cityNames = Array.from(new Set(cities.map(city => city.name)));

    // Filter cities based on search query and selected filter
    const filteredCities = cities.filter((city) => {
        const matchesQuery = city.name.toLowerCase().includes(query.toLowerCase());
        const matchesFilter = selectedRegion ? city.name === selectedRegion : true;
        return matchesQuery && matchesFilter;
    });

    return (
        <>
            <div className="col-span-full">
                <Filter
                    filterOptions={cityNames}
                    searchQuery={query}
                    selectedFilter={selectedRegion}
                    onSearchChange={setQuery}
                    onFilterChange={setSelectedRegion}
                    searchPlaceholder="Cerca una città"
                    searchLabel="Cerca una città"
                    allItemsLabel="Tutte le città"
                />
            </div>

            {filteredCities.map((city) => (
                <Card key={city.id} className="border shadow-md overflow-hidden bg-card hover:scale-[1.02] transition-transform duration-200 relative hover:shadow-lg rounded-3xl">
                    <CardFooter className="flex flex-col xl:flex-row gap-2 items-center px-6 py-4 w-full">
                        <CardTitle className="dark:text-chart-3 text-chart-4 text-xl items-center justify-start text-left w-full">{city.name}</CardTitle>

                        <Button variant="default" className="p-2 mt-2 rounded-2xl" asChild>
                            <Link href={city.url}>Scopri i migliori parcheggi a {city.name} &rarr;</Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </>
    );
}
