import Banner from "@/components/Banner";
import ParkingList from "@/components/ParkingList";
import BC from "@/components/BC";
import { getCities } from "@/lib/parking";

interface Props {
    params: { slug: string };
}

export default async function CityPage({ params }: Props) {
    const citySlug = await params;

    // Fetch city data to get fallback image
    const cities = await getCities();
    const cityData = cities.find(c => c.url === `/citta/${citySlug.slug}`);

    // console.log("Rendering CityPage for:", citySlug);
    function titleizeSlug(slug?: string) {
        if (!slug) return "";
        return slug
            .split('-')
            .map(w => w ? w[0].toUpperCase() + w.slice(1) : "")
            .join(' ');
    }


    return (
        <div>
            <Banner
                title={`Parcheggi a ${titleizeSlug(citySlug.slug)}`}
                subtitle={`Scopri i migliori parcheggi a ${titleizeSlug(citySlug.slug)} con Parkito`}
                src={`/${citySlug.slug}.webp`}
                src2={cityData?.fallbackImage}
                icon={true}
                social={true}

            />
            <div className="bg-background">
                <div className="px-16 pt-8">
                    <BC title={titleizeSlug(citySlug.slug)} />
                </div>
                <ParkingList city={citySlug.slug} />
            </div>
        </div>
    );
}
