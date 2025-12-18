import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { getCities } from "@/lib/parking"
import CityCard from "./CityCard"

export default async function CityCarousel() {
    const cities = await getCities();
    const safeCities = cities.filter(city => city.name === "Milano" || city.name === "Torino" || city.name === "Varazze" || city.name === "Camogli" || city.name === "Firenze");

    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full max-w-6xl mx-auto px-12 mt-10"
        >
            <CarouselContent className="-ml-2 md:-ml-4">
                {safeCities.map((city) => (
                    <CarouselItem key={city.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                        <CityCard city={city} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
        </Carousel>
    )
}