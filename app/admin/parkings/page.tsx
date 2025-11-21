"use client"

import React from 'react'
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Parking } from "@/types";
import ParkingsList from '@/app/admin/components/ParkingsList';
import Loading from '@/components/Loading';

export default function AdminPage() {
    const [parkings, setParkings] = useState<Parking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReviewsFromBucket() {
            try {
                const { data, error } = await supabase.storage
                    .from("parking_sheet_data")
                    .download("parkings_data.json");

                if (error) throw error;

                const text = await data.text();
                const json = JSON.parse(text);
                console.log("Fetched reviews JSON:", json);

                setParkings(json || []);
            } catch (err) {
                console.error("Error fetching reviews from bucket:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchReviewsFromBucket();
    }, []);


    if (loading) {
        return <Loading />
    };


    return (
        <div>
            <ParkingsList items={parkings} />
        </div>
    )
}