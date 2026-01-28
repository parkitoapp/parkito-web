import { supabaseServer } from "@/lib/supabaseServer";
import { Parking } from "@/types";
import { slugify } from "@/lib/slugify";
import { CityType } from "@/types";
import { unstable_cache } from "next/cache";

const placeholderArray: string[] = [
  "/citta1.webp",
  "/citta2.webp",
  "/citta3.webp",
  "/citta4.webp",
  "/citta5.webp",
  "/citta6.webp",
];

// Cache duration in seconds (1 week = 7 days)
// Set CITY_CACHE_DURATION=0 in .env.local for testing (disables cache)
const CACHE_DURATION = process.env.CITY_CACHE_DURATION
  ? parseInt(process.env.CITY_CACHE_DURATION, 10)
  : 604800;

// Generate consistent placeholder index from string
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
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
  ["parking-data"],
  { revalidate: CACHE_DURATION, tags: ["parkings"] }
);

export async function getAllParkings(): Promise<
  { slug: string; address: string }[]
> {
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

export async function getParking(
  citySlug: string,
  parkingAddress: string
): Promise<Parking | null> {
  const parkings = await getParkingData();
  return (
    parkings.find(
      (p) =>
        slugify(p.city) === citySlug && slugify(p.address) === parkingAddress
    ) || null
  );
}

/**
 * Internal function to fetch city image URL from Supabase bucket
 * Uses service role key for elevated permissions
 * Note: This is called within getCities which is already cached for 1 week
 */
async function fetchCityImageFromSupabase(
  citySlug: string
): Promise<string | null> {
  try {
    const imagePath = `${citySlug}.webp`;
    const bucketName = "website"; // Supabase bucket name for city images

    // Check if the file exists by listing files in the bucket root
    const { data: listData, error: listError } = await supabaseServer.storage
      .from(bucketName)
      .list("", {
        limit: 1000,
      });

    if (listError) {
      console.error(`Error listing city images for ${citySlug}:`, listError);
      return null;
    }

    // Check if the file exists in the list
    const fileExists = listData?.some(
      (file) => file.name === `${citySlug}.webp`
    );

    if (!fileExists) {
      return null;
    }

    // Get the public URL for the image
    const { data: publicUrlData } = supabaseServer.storage
      .from(bucketName)
      .getPublicUrl(imagePath);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error(`Unexpected error fetching city image for ${citySlug}:`, err);
    return null;
  }
}

// Cached version of getCities - revalidates once per week (or based on CACHE_DURATION)
// This caches both the city data and their Supabase image URLs
// For testing: Set CITY_CACHE_DURATION=0 in .env.local to disable caching
const getCitiesCached =
  CACHE_DURATION === 0
    ? async () => {
        // No cache - directly call the function
        const parkings = await getParkingData();
        const cityMap = new Map<string, Parking>();

        for (const p of parkings) {
          const cityName = p.city?.trim();
          if (!cityName) continue;
          const cityKey = slugify(cityName);
          if (!cityMap.has(cityKey))
            cityMap.set(cityKey, { ...p, city: cityName });
        }

        // Fetch all city images from Supabase in parallel
        const cityEntries = Array.from(cityMap.entries());
        const cityImagePromises = cityEntries.map(async ([cityKey]) => {
          const supabaseImageUrl = await fetchCityImageFromSupabase(cityKey);
          return { slug: cityKey, supabaseImageUrl };
        });
        const cityImages = await Promise.all(cityImagePromises);
        const imageMap = new Map(
          cityImages.map(({ slug, supabaseImageUrl }) => [
            slug,
            supabaseImageUrl,
          ])
        );

        return cityEntries
          .map(([cityKey, p]) => {
            const cityName = p.city;
            const slug = cityKey;

            // Generate consistent placeholder based on city name hash
            const placeholderIndex =
              hashString(cityName) % placeholderArray.length;
            const fallbackImage = placeholderArray[placeholderIndex]; // Local placeholder (citta1-6)

            // Try Supabase image first, if not found use placeholder directly
            // Skip the local public folder fallback since those images are deleted
            const supabaseImageUrl = imageMap.get(slug);
            const image = supabaseImageUrl || fallbackImage; // Use Supabase image or placeholder directly

            return {
              id: p.id,
              name: cityName,
              url: `/citta/${slug}`,
              image, // Supabase image URL or local image path
              fallbackImage, // Local placeholder (citta1-6) for final fallback
            };
          })
          .sort((a, b) => a.name.localeCompare(b.name));
      }
    : unstable_cache(
        async () => {
          const parkings = await getParkingData();
          const cityMap = new Map<string, Parking>();

          for (const p of parkings) {
            const cityName = p.city?.trim();
            if (!cityName) continue;
            const cityKey = slugify(cityName);
            if (!cityMap.has(cityKey))
              cityMap.set(cityKey, { ...p, city: cityName });
          }

          // Fetch all city images from Supabase in parallel
          const cityEntries = Array.from(cityMap.entries());
          const cityImagePromises = cityEntries.map(async ([cityKey]) => {
            const supabaseImageUrl = await fetchCityImageFromSupabase(cityKey);
            return { slug: cityKey, supabaseImageUrl };
          });
          const cityImages = await Promise.all(cityImagePromises);
          const imageMap = new Map(
            cityImages.map(({ slug, supabaseImageUrl }) => [
              slug,
              supabaseImageUrl,
            ])
          );

          return cityEntries
            .map(([cityKey, p]) => {
              const cityName = p.city;
              const slug = cityKey;

              // Generate consistent placeholder based on city name hash
              const placeholderIndex =
                hashString(cityName) % placeholderArray.length;
              const fallbackImage = placeholderArray[placeholderIndex]; // Local placeholder (citta1-6)

              // Try Supabase image first, if not found use placeholder directly
              const supabaseImageUrl = imageMap.get(slug);
              const image = supabaseImageUrl || fallbackImage; // Use Supabase image or placeholder directly

              return {
                id: p.id,
                name: cityName,
                url: `/citta/${slug}`,
                image, // Supabase image URL or local image path
                fallbackImage, // Local placeholder (citta1-6) for final fallback
              };
            })
            .sort((a, b) => a.name.localeCompare(b.name));
        },
        ["cities-with-images"],
        { revalidate: CACHE_DURATION, tags: ["cities", "city-images"] }
      );

export async function getCities(): Promise<CityType[]> {
  return getCitiesCached();
}
