import { NextResponse } from "next/server";
import { getParkingData } from "@/lib/parking";

export async function GET() {
    try {
        const parkings = await getParkingData();
        return NextResponse.json(parkings);
    } catch (error) {
        console.error("Error fetching parkings:", error);
        return NextResponse.json(
            { error: "Failed to fetch parkings" },
            { status: 500 }
        );
    }
}
