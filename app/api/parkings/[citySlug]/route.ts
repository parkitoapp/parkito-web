import { NextResponse } from "next/server";
import { getParkingData } from "@/lib/parking";
import { slugify } from "@/lib/slugify";

import { Parking } from "@/types";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ citySlug: string }> }
) {
  try {
    const { citySlug } = await params;
    const parkings = await getParkingData();

    // Filter parkings by city slug
    const filtered = parkings.filter((p) => {
      const pSlug = slugify(p.city);
      return pSlug === citySlug;
    });

    // Deduplicate parkings with same driver_name and address
    const uniqueParkings = new Map<string, Parking>();
    for (const p of filtered) {
      const key = `${p.driver_name}|${p.address}`;
      if (!uniqueParkings.has(key)) {
        uniqueParkings.set(key, p);
      }
    }

    const deduplicated = Array.from(uniqueParkings.values());
    return NextResponse.json(deduplicated);
  } catch (error) {
    console.error("Error fetching parkings for city:", error);
    return NextResponse.json(
      { error: "Failed to fetch parkings" },
      { status: 500 }
    );
  }
}
