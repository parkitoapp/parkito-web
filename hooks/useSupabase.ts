"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";

type Options = {
    enabled?: boolean;
    ttlMs?: number;
};

const DEFAULT_TTL = 7 * 24 * 60 * 60 * 1000;

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
                if (Date.now() - parsed.timestamp < ttlMs) {
                    console.log("Using cached:", parsed.data);
                    setData(key ? parsed.data[key] || [] : parsed.data);
                    setLoading(false);
                    return;
                }
            }

            const { data: fileBlob, error } = await supabase.storage.from(bucket).download(file);
            if (error) throw error;

            const text = await fileBlob.text();
            const json = JSON.parse(text);

            console.log("SUPABASE JSON FRESH:", json);

            localStorage.setItem(cacheKey, JSON.stringify({ data: json, timestamp: Date.now() }));

            if (key) {
                if (!json[key]) {
                    console.error(`Key "${key}" missing in JSON`, json);
                    setData([]);
                } else {
                    setData(json[key]);
                }
            } else {
                setData(json);
            }

        } catch (err: unknown) {
            console.error(`Error fetching ${file}`, err);
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
