"use server";

import { fetchParkingPhotoServer } from "@/lib/parking-server";

/**
 * Server action to fetch parking photo
 * Can be called from client components
 */
export async function getParkingPhotoAction(parkingId: number): Promise<string | null> {
    return await fetchParkingPhotoServer(parkingId);
}
