// app/citta/[slug]/page.tsx
import ParkingList from "@/components/ParkingList";

export default async function Page({ params }: { params: { slug: string } }) {

    return (
        <>
            <ParkingList city={params.slug} />
        </>
    );
}
