import { NextResponse } from "next/server";
import { fetchParkingPhotoServer } from "@/lib/parking-server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const parkingId = parseInt(id, 10);

        if (isNaN(parkingId)) {
            return NextResponse.json(
                { error: "Invalid parking ID" },
                { status: 400 }
            );
        }

        const imageUrl = await fetchParkingPhotoServer(parkingId);

        return NextResponse.json({
            imageUrl: imageUrl ?? "/parkitoplaceholder.webp",
        });
    } catch (error) {
        console.error("Error fetching parking photo:", error);
        return NextResponse.json(
            { error: "Failed to fetch parking photo" },
            { status: 500 }
        );
    }
}
