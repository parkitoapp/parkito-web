import ParkingDetail from "@/components/ParkingDetail";
import { getAllParkings, getParking } from "@/lib/parking";
import { fetchParkingPhotoServer } from "@/lib/parking-server";

interface Params {
    slug: string;
    address: string;
}

export async function generateStaticParams() {
    return await getAllParkings();
}

// Server component
export default async function ParkingDetailPage({ params }: { params: Promise<Params> }) {
    const { slug, address } = await params; // <- unwrap the promise
    const parking = await getParking(slug, address);
    const imageUrl = await fetchParkingPhotoServer(parking!.id);

    return <ParkingDetail citySlug={slug} parking={parking} imageUrl={imageUrl} />;
}
