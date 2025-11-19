import { createClient } from "next-sanity";

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // from sanity.config.ts
    dataset: "production",
    apiVersion: "2025-11-01",
    useCdn: false, // false if you want fresh data
});
