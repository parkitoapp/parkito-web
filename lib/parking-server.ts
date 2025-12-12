import { supabaseServer } from "./supabaseServer";

/**
 * Server-side function to fetch parking photo
 * Uses service role key for elevated permissions
 */
export async function fetchParkingPhotoServer(parkingId: number): Promise<string | null> {
    try {
        const folderPath = `parking_media/parking_${parkingId}/images`;
        const { data, error } = await supabaseServer.storage
            .from("uploads")
            .list(folderPath, {
                limit: 10,
                sortBy: { column: "name", order: "asc" },
            });

        if (error) {
            console.error("Error listing images:", error);
            return null;
        }

        if (data && data.length > 0) {
            const file = data.find(f => f.name !== '.emptyFolderPlaceholder');

            if (file) {
                const { data: publicUrlData } = supabaseServer.storage
                    .from("uploads")
                    .getPublicUrl(`${folderPath}/${file.name}`);

                return publicUrlData.publicUrl;
            }
        }

        return null;
    } catch (err) {
        console.error("Unexpected error fetching parking photo:", err);
        return null;
    }
}
