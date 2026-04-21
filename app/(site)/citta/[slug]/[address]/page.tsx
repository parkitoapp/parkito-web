import ParkingDetail from "@/components/ParkingDetail";
import { getAllParkings, getParking } from "@/lib/parking";
import { fetchParkingPhotoServer } from "@/lib/parking-server";
import { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";

function titleizeSlug(s: string) {
    return s.split('-').map(w => w ? w[0].toUpperCase() + w.slice(1) : '').join(' ')
}

interface Params {
    slug: string;
    address: string;
}

type Props = {
    params: { slug: string; address: string } | Promise<{ slug: string; address: string }>;
};

// Generate dynamic metadata for each blog post (title from post)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, address } = await params;
    const parking = await getParking(slug, address);
    return {
        title: `Parcheggio ${parking?.name}`,
        description: `Il parcheggio privato in ${parking?.address} a ${parking?.city} è un ${parking?.parking_type} disponibile in Parkito. Scopri le sue caratteristiche e come prenotarlo!`
        ,
    };
}
export async function generateStaticParams() {
    return await getAllParkings();
}

// Server component
export default async function ParkingDetailPage({ params }: { params: Promise<Params> }) {
    const { slug, address } = await params; // <- unwrap the promise
    const parking = await getParking(slug, address);
    const imageUrl = await fetchParkingPhotoServer(parking!.id) ?? "/parkitoplaceholder.webp";

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://parkito.app' },
            { '@type': 'ListItem', position: 2, name: 'Città', item: 'https://parkito.app/citta' },
            { '@type': 'ListItem', position: 3, name: titleizeSlug(slug), item: `https://parkito.app/citta/${slug}` },
            { '@type': 'ListItem', position: 4, name: parking?.name ?? titleizeSlug(address), item: `https://parkito.app/citta/${slug}/${address}` },
        ],
    };

    return (
        <>
            <JsonLd data={breadcrumbSchema} />
            <ParkingDetail citySlug={slug} parking={parking} imageUrl={imageUrl} />
        </>
    );
}
