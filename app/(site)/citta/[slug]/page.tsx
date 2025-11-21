// app/citta/[slug]/page.tsx
import ParkingList from "@/components/ParkingList";
import { getParkingsFromBucket } from '@/lib/getParkings';
import { slugify } from '@/lib/slugify';

export default async function Page({ params }: { params: { slug: string } }) {
    const parkings = await getParkingsFromBucket();
    const safeParkings = Array.isArray(parkings) ? parkings : [];
    const filtered = safeParkings.filter((p) => slugify(p.city) === slugify(params.slug));

    return (
        <>
            <ParkingList city={params.slug} />
        </>
    );
}
