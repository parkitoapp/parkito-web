import { NextResponse } from "next/server";
import { getParking } from "@/lib/parking";
import { fetchParkingPhotoServer } from "@/lib/parking-server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ citySlug: string; address: string }> }
) {
    try {
        const { citySlug, address } = await params;
        const parking = await getParking(citySlug, address);

        if (!parking) {
            return NextResponse.json(
                { error: "Parking not found" },
                { status: 404 }
            );
        }

        // Fetch parking photo
        const imageUrl = await fetchParkingPhotoServer(parking.id) ?? "/parkitoplaceholder.webp";

        return NextResponse.json({
            ...parking,
            imageUrl,
        });
    } catch (error) {
        console.error("Error fetching parking details:", error);
        return NextResponse.json(
            { error: "Failed to fetch parking details" },
            { status: 500 }
        );
    }
}
