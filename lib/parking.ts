import { supabase } from "@/lib/supabaseClient";
import { Parking } from "@/types";
import { slugify } from "@/lib/slugify";

export async function getParkingData(): Promise<Parking[]> {
    try {
        const { data: fileBlob, error } = await supabase.storage
            .from("parking_sheet_data")
            .download("parkings_data.json");

        if (error) {
            console.error("Error downloading parking data:", error);
            return [];
        }

        const text = await fileBlob.text();
        const json = JSON.parse(text);

        // The structure from useSupabaseJson suggests the data might be directly the array or inside a key.
        // Based on useSupabaseJson: setData(key ? parsed.data[key] || [] : parsed.data);
        // And usage: useSupabaseJson<Parking>("parking_sheet_data", "parkings_data.json") -> no key.
        // So it should be the root object or array.
        // However, useSupabaseJson also does: setData(json[key]) if key is present, else setData(json).
        // Let's assume it's the root json for now, but we should be careful.
        // The hook usage was: useSupabaseJson<Parking>("parking_sheet_data", "parkings_data.json")

        return json as Parking[];
    } catch (error) {
        console.error("Error fetching parking data:", error);
        return [];
    }
}

export async function getAllParkings(): Promise<{ slug: string; address: string }[]> {
    const parkings = await getParkingData();
    return parkings.map((p) => ({
        slug: slugify(p.city),
        address: slugify(p.address),
    }));
}

export async function getParking(citySlug: string, parkingAddress: string): Promise<Parking | null> {
    const parkings = await getParkingData();
    return parkings.find(
        (p) => slugify(p.city) === citySlug && slugify(p.address) === parkingAddress
    ) || null;
}
