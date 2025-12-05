import Banner from "@/components/Banner";
import ParkingList from "@/components/ParkingList";
import BC from "@/components/BC";
import titleizeSlug from "@/lib/titleizeSlug";

interface Props {
    params: { slug: string };
}

export default async function CityPage({ params }: Props) {
    const citySlug = await params;

    return (
        <div>
            <Banner
                title={`Parcheggi a ${titleizeSlug(citySlug.slug)}`}
                subtitle={`Scopri i migliori parcheggi a ${titleizeSlug(citySlug.slug)} con Parkito`}
                src={`/${citySlug.slug}.webp`}
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
