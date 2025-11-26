import { supabase } from "@/lib/supabaseClient";
import { Parking } from "@/types";
import { slugify } from "@/lib/slugify";
import fs from "fs";
import path from "path";

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

export interface CityType {
    id: number;
    name: string;
    url: string;
    image: string;
}

export async function getCities(): Promise<CityType[]> {
    const parkings = await getParkingData();
    const cityMap = new Map<string, Parking>();

    for (const p of parkings) {
        if (!cityMap.has(p.city)) {
            cityMap.set(p.city, p); // first parking per city
        }
    }

    // Check if image exists in public folder, otherwise use default
    const publicDir = path.join(process.cwd(), "public");

    return Array.from(cityMap.entries()).map(
        ([cityName, p]) => {
            const slug = slugify(cityName);
            const imagePath = path.join(publicDir, `${slug}.webp`);
            const hasImage = fs.existsSync(imagePath);

            return {
                id: p.id,
                name: cityName,
                url: `/citta/${slug}`,
                image: hasImage ? `/${slug}.webp` : '/homePic.webp',
            };
        }
    );
}
