import { NextResponse } from "next/server";
import { getParkingData } from "@/lib/parking";
import { slugify } from "@/lib/slugify";

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

    return NextResponse.json(filtered);
  } catch (error) {
    console.error("Error fetching parkings for city:", error);
    return NextResponse.json(
      { error: "Failed to fetch parkings" },
      { status: 500 }
    );
  }
}
