'use client'

import { CityType } from "@/types";
import Filter from "./Filter";
import { useState } from "react";
import CityCard from "./CityCard";

// Component to handle individual city card with fallback image logic

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
                <CityCard key={city.id} city={city} />
            ))}
        </>
    );
}
