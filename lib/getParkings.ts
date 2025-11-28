import { supabase } from './supabaseClient';
import type { Parking } from '@/types';

export async function getParkingsFromBucket(bucket = 'parking_sheet_data', file = 'parkings_data.json', key?: string): Promise<Parking[]> {
    try {
        const { data: fileData, error } = await supabase.storage.from(bucket).download(file);
        if (error) {
            throw new Error(`Error downloading parkings JSON from bucket: ${error}`);
        }

        const text = await fileData.text();
        const json = JSON.parse(text);

        if (key) {
            return (json[key] || []) as Parking[];
        }

        if (Array.isArray(json)) return json as Parking[];
        if (Array.isArray(json.data)) return json.data as Parking[];

        return [];
    } catch (err) {
        throw new Error(`Error reading parkings JSON: ${err}`);
    }
}
