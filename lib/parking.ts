import { supabaseServer } from "@/lib/supabaseClient";
import { Parking } from "@/types";
import { slugify } from "@/lib/slugify";
import fs from "fs";
import path from "path";

const placeholderArray: string[] = ['/homePic.webp', '/1control.webp', '/access.webp', '/b4i-logo.webp'];

// Generate consistent placeholder index from string
const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

export async function getParkingData(): Promise<Parking[]> {
    try {
        const { data: fileBlob, error } = await supabaseServer.storage
            .from("parking_sheet_data")
            .download("parkings_data.json");

        if (error) throw new Error(`Error downloading parking data: ${error}`);

        const text = await fileBlob.text();
        return JSON.parse(text) as Parking[];
    } catch (error) {
        throw new Error(`Error fetching parking data: ${error}`);
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
        if (!cityMap.has(p.city)) cityMap.set(p.city, p);
    }

    const publicDir = path.join(process.cwd(), "public");

    return Array.from(cityMap.entries()).map(([cityName, p]) => {
        const slug = slugify(cityName);
        const imagePath = path.join(publicDir, `${slug}.webp`);
        const hasImage = fs.existsSync(imagePath);

        // fallback placeholder
        const placeholderIndex = hashString(cityName) % placeholderArray.length;

        return {
            id: p.id,
            name: cityName,
            url: `/citta/${slug}`,
            image: hasImage ? `/${slug}.webp` : placeholderArray[placeholderIndex],
        };
    });
}
