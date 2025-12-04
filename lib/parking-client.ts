import { supabase } from "@/lib/supabaseClient";

export async function fetchParkingPhoto(parkingId: number): Promise<string | null> {
    try {
        const folderPath = `parking_media/parking_${parkingId.toString()}/images/`;
        const { data, error } = await supabase.storage
            .from("uploads")
            .list(folderPath, {
                limit: 1,
                sortBy: { column: "name", order: "asc" },
            });


        if (error) {
            console.error("Error listing images:", error);
            return null;
        }

        if (data && data.length > 0) {
            // Filter out .emptyFolderPlaceholder or similar if necessary, 
            // but usually list returns files. 
            // We'll take the first actual file.
            const file = data.find(f => f.name !== '.emptyFolderPlaceholder');

            if (file) {
                const { data: publicUrlData } = supabase.storage
                    .from("uploads")
                    .getPublicUrl(`${folderPath}${file.name}`);

                return publicUrlData.publicUrl;
            }
        }

        return null;
    } catch (err) {
        console.error("Unexpected error fetching parking photo:", err);
        return null;
    }
}
