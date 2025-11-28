import Banner from "@/components/Banner";
import ParkingList from "@/components/ParkingList";
import BC from "@/components/BC";

interface Props {
    params: { slug: string };
}

export default async function CityPage({ params }: Props) {
    const citySlug = await params;

    // console.log("Rendering CityPage for:", citySlug);
    function titleizeSlug(slug?: string) {
        if (!slug) return "";
        return slug
            .split('-')
            .map(w => w ? w[0].toUpperCase() + w.slice(1) : "")
            .join(' ');
    }

    const display = titleizeSlug(citySlug.slug);

    return (
        <div>
            <Banner
                title={`Parcheggi a ${display}`}
                subtitle={`Scopri i migliori parcheggi a ${display} con Parkito`}
                src={`/${citySlug.slug}.webp`}
                src2={`/${citySlug.slug}.webp`}
                icon={true}
                social={true}

            />
            <div className="px-16 pt-8">
                <BC title={display} />
            </div>
            <ParkingList city={citySlug.slug} />
        </div>
    );
}
