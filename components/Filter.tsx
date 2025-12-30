'use client'

import { Label } from "./ui/label"
import { SearchIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface FilterProps {
    filterOptions: string[];
    searchQuery: string;
    selectedFilter: string | null;
    onSearchChange: (value: string) => void;
    onFilterChange: (filter: string | null) => void;
    searchPlaceholder?: string;
    searchLabel?: string;
    allItemsLabel?: string;
}

export default function Filter({
    filterOptions,
    searchQuery,
    selectedFilter,
    onSearchChange,
    onFilterChange,
    searchPlaceholder = "Cerca",
    searchLabel = "Cerca",
    allItemsLabel = "Tutti",
}: FilterProps) {

    const handleScrollLeft = () => {
        const container = document.getElementById('filters');
        if (container) {
            container.scrollLeft -= 200;
        }
    }

    const handleScrollRight = () => {
        const container = document.getElementById('filters');
        if (container) {
            container.scrollLeft += 200;
        }
    }

    const handleFilter = (filter: string | null) => () => {
        if (selectedFilter === filter) {
            onFilterChange(null);
        } else {
            onFilterChange(filter);
        }
    }

    return (
        <>
            <div>
                <Label htmlFor="search" hidden>
                    {searchLabel}
                </Label>
                <div className="flex flex-row gap-2 items-center px-4">
                    <SearchIcon className="text-chart-2" />
                    <Input
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        type="search"
                        placeholder={searchPlaceholder}
                        className="w-full md:w-[40%] p-4 my-10 bg-white rounded-full placeholder:text-muted-foreground focus:border focus:border-chart-2 focus:ring-chart-2"
                        id="search"
                    />
                </div>
            </div>

            <div className="border-b border-b-gray-300 mx-4" />

            <div id="filters" className="flex flex-row gap-4 mt-10 mb-4 px-4 overflow-x-auto w-full md:w-[50%] mx-auto">
                <Button
                    onClick={handleFilter(null)}
                    className={`px-2 text-lg rounded-full hover:cursor-pointer ${selectedFilter === null ? 'dark:bg-accent bg-chart-1 text-white' : ''
                        }`}
                >
                    {allItemsLabel}
                </Button>

                {filterOptions.map((option, idx) => (
                    <Button
                        key={idx}
                        onClick={handleFilter(option)}
                        className={`px-2 text-lg rounded-full hover:cursor-pointer ${selectedFilter === option ? 'bg-chart-1 text-white' : ''
                            }`}
                    >
                        {option}
                    </Button>
                ))}

            </div>
            <div className="flex flex-row w-full mx-auto items-center justify-center gap-4 mb-10 [&_button]:rounded-3xl">
                <Button variant={"default"} size={"icon-lg"} onClick={handleScrollLeft} aria-label="scroll left">
                    <ChevronLeft className="dark:text-chart-2 text-white" />
                </Button>

                <Button variant={"default"} size={"icon-lg"} onClick={handleScrollRight} aria-label="scroll right">
                    <ChevronRight className="dark:text-chart-2 text-white" />
                </Button>
            </div>
        </>
    )
}