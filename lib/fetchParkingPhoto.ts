import { supabase } from "./supabaseClient";

export async function fetchParkingPhoto(parkingId: number): Promise<string> {
    // Common image extensions to try
    const extensions = ['jpg', 'jpeg', 'png', 'webp'];

    // Try to find an image in the images subfolder first
    for (const ext of extensions) {
        const imagePath = `parking_media/parking_${parkingId}/images/host.${ext}`;
        const { data } = supabase.storage.from('uploads').getPublicUrl(imagePath);

        try {
            const response = await fetch(data.publicUrl, { method: 'HEAD' });
            if (response.ok) {
                return data.publicUrl;
            }
        } catch (error) {
            throw new Error(`Failed to fetch image: ${error}`);
        }
    }

    // Fallback: try the parent parking folder
    for (const ext of extensions) {
        const imagePath = `parking_media/parking_${parkingId}/host.${ext}`;
        const { data } = supabase.storage.from('uploads').getPublicUrl(imagePath);

        try {
            const response = await fetch(data.publicUrl, { method: 'HEAD' });
            if (response.ok) {
                return data.publicUrl;
            }
        } catch (error) {
            throw new Error(`Failed to fetch fallback image: ${error}`);
        }
    }

    // No images found, return a default placeholder
    console.warn('No parking photos found for parking ID:', parkingId);
    return '/device.webp';
}
