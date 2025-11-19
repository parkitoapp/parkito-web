"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config"; // Imports the config from Step 3
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth"; // Your custom auth hook

const COMPANY_DOMAIN = "parkito.app"; // Change this to your actual domain

export default function AdminPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    // 1. Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);


    if (user && user.email?.endsWith(`@${COMPANY_DOMAIN}`)) {
        return <NextStudio config={config} />;
    }

    return null;
}