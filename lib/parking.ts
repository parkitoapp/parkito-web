import { supabaseServer } from "@/lib/supabaseServer";
import { Parking } from "@/types";
import { slugify } from "@/lib/slugify";
import { CityType } from "@/types";
import { unstable_cache } from "next/cache";

const placeholderArray: string[] = ['/citta1.webp', '/citta2.webp', '/citta3.webp', '/citta4.webp', '/citta5.webp', '/citta6.webp'];

// Cache duration in seconds (1 week = 7 days)
const CACHE_DURATION = 604800;

// Generate consistent placeholder index from string
const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

// Internal function to fetch parking data from Supabase
async function fetchParkingDataFromSupabase(): Promise<Parking[]> {
    try {
        const { data: fileBlob, error } = await supabaseServer.storage
            .from("parking_sheet_data")
            .download("parkings_data.json");

        if (error) throw new Error(`Error downloading parking data: ${error}`);

        const text = await fileBlob.text();
        const parkings = (JSON.parse(text) as Parking[]).map((p) => ({
            ...p,
            city: p.city?.trim() ?? "",
            address: p.address?.trim() ?? "",
        }));

        return parkings.filter((p) => p.city !== "");

    } catch (error) {
        throw new Error(`Error fetching parking data: ${error}`);
    }
}

// Cached version of getParkingData - revalidates every 5 minutes
export const getParkingData = unstable_cache(
    fetchParkingDataFromSupabase,
    ['parking-data'],
    { revalidate: CACHE_DURATION, tags: ['parkings'] }
);

export async function getAllParkings(): Promise<{ slug: string; address: string }[]> {
    const parkings = await getParkingData();

    // Deduplicate parkings with same driver_name and address
    const uniqueParkings = new Map<string, Parking>();

    for (const p of parkings) {
        const key = `${p.driver_name}|${p.address}`;
        if (!uniqueParkings.has(key)) {
            uniqueParkings.set(key, p);
        }
    }

    return Array.from(uniqueParkings.values()).map((p) => ({
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

export async function getCities(): Promise<CityType[]> {
    const parkings = await getParkingData();
    const cityMap = new Map<string, Parking>();

    for (const p of parkings) {
        const cityName = p.city?.trim();
        if (!cityName) continue;
        const cityKey = slugify(cityName);
        if (!cityMap.has(cityKey)) cityMap.set(cityKey, { ...p, city: cityName });
    }

    return Array.from(cityMap.entries())
        .map(([cityKey, p]) => {
            const cityName = p.city;
            const slug = cityKey;

            // Generate consistent placeholder based on city name hash
            const placeholderIndex = hashString(cityName) % placeholderArray.length;
            const fallbackImage = placeholderArray[placeholderIndex];

            return {
                id: p.id,
                name: cityName,
                url: `/citta/${slug}`,
                image: `/${slug}.webp`, // Try city-specific image first, fallback handled by Image component
                fallbackImage, // Consistent random placeholder for this city
            };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
}
