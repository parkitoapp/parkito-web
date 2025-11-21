import ParkingDetail from "@/components/ParkingDetail";

interface Params {
    slug: string;
    address: string;
}

// Server component
export default async function ParkingDetailPage({ params }: { params: Promise<Params> }) {
    const { slug, address } = await params; // <- unwrap the promise

    return <ParkingDetail citySlug={slug} parkingAddress={address} />;
}
