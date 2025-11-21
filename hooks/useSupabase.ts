"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";

type Options = {
    enabled?: boolean; // If false, skip fetch
    ttlMs?: number;    // Cache TTL override
};

const DEFAULT_TTL = 7 * 24 * 60 * 60 * 1000; // 1 week

export default function useSupabaseJson<T>(
    bucket: string,
    file: string,
    key?: string,
    options?: Options
) {
    const { enabled = true, ttlMs = DEFAULT_TTL } = options || {};
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        if (!enabled) return;

        setLoading(true);
        setError(null);

        try {
            const cacheKey = `supabase-cache-${bucket}-${file}`;
            const cached = localStorage.getItem(cacheKey);

            if (cached) {
                const parsed = JSON.parse(cached);
                const now = Date.now();
                if (now - parsed.timestamp < ttlMs) {
                    setData(key ? parsed.data[key] || [] : parsed.data || []);
                    setLoading(false);
                    return;
                }
            }

            const { data: fileData, error } = await supabase.storage.from(bucket).download(file);
            if (error) throw error;

            const text = await fileData.text();
            const json = JSON.parse(text);

            localStorage.setItem(cacheKey, JSON.stringify({ data: json, timestamp: Date.now() }));

            setData(key ? json[key] || [] : json || []);
        } catch (err: unknown) {
            console.error(`Error fetching ${file} from bucket:`, err);
            setError(err instanceof Error ? err : new Error(String(err)));
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [bucket, file, key, enabled, ttlMs]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}
