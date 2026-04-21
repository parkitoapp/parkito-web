import Banner from "@/components/Banner";
import ParkingList from "@/components/ParkingList";
import BC from "@/components/BC";
import { getCities } from "@/lib/parking";
import { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
interface Props {
    params: Promise<{ slug: string }>;
}

// console.log("Rendering CityPage for:", citySlug);
function titleizeSlug(slug?: string) {
    if (!slug) return "";
    return slug
        .split('-')
        .map(w => w ? w[0].toUpperCase() + w.slice(1) : "")
        .join(' ');
}

// Generate dynamic metadata for each blog post (title from post)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    return {
        title: `Parcheggi a ${titleizeSlug(slug)}`,
        description: `Scopri i migliori parcheggi a ${titleizeSlug(slug)} con Parkito`,
    };
}

export default async function CityPage({ params }: Props) {
    const citySlug = await params;

    const cityName = titleizeSlug(citySlug.slug);
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://parkito.app' },
            { '@type': 'ListItem', position: 2, name: 'Città', item: 'https://parkito.app/citta' },
            { '@type': 'ListItem', position: 3, name: cityName, item: `https://parkito.app/citta/${citySlug.slug}` },
        ],
    };

    // Fetch city data to get image from Supabase bucket (with fallback to placeholder)
    const cities = await getCities();
    const cityData = cities.find(c => c.url === `/citta/${citySlug.slug}`);

    // Use city image from Supabase/placeholder, or fallback to local path
    const bannerImage = cityData?.image || `/${citySlug.slug}.webp`;

    return (
        <div>
            <JsonLd data={breadcrumbSchema} />
            <Banner
                title={`Parcheggi a ${titleizeSlug(citySlug.slug)}`}
                subtitle={`Scopri i migliori parcheggi a ${titleizeSlug(citySlug.slug)} con Parkito`}
                src={bannerImage}
                src2={true}
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
