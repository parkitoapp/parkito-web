//useSupabase.ts

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function useSupabaseJson<T>(bucket: string, file: string, key?: string) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const { data: fileData, error } = await supabase.storage
                .from(bucket)
                .download(file);

            if (error) throw error;

            const text = await fileData.text();
            const json = JSON.parse(text);


            setData(key ? json[key] || [] : json || []);
        } catch (err: unknown) {
            console.error(`Error fetching ${file} from bucket:`, err);
            setError(err instanceof Error ? err : new Error(String(err)));
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [bucket, file, key]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}
