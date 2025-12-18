import ParkingDetail from "@/components/ParkingDetail";
import { getAllParkings, getParking } from "@/lib/parking";
import { fetchParkingPhotoServer } from "@/lib/parking-server";
import { Metadata } from "next";

interface Params {
    slug: string;
    address: string;
}

export const dynamic = "force-dynamic";

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

    return <ParkingDetail citySlug={slug} parking={parking} imageUrl={imageUrl} />;
}
