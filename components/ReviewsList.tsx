/**
 * ReviewsList component to display a list of user reviews.
 * Fetches reviews from a Supabase JSON source and displays them in a scrolling logo loop.
 * Handles loading and error states appropriately.
 * 
 * @returns {JSX.Element} The ReviewsList component.
 */

"use client";


import { formatDate } from "@/lib/formatDate";
import { Spinner } from "@/components/ui/spinner";
import { AppleReview } from "@/types";
import ReviewCard from "./ReviewCard";
import LogoLoop from "./LogoLoop";
import useSupabaseJson from "@/hooks/useSupabase";
import { Alert, AlertTitle } from "./ui/alert";
import { InfoIcon } from "lucide-react";

export default function ReviewsList() {

    const { data: reviews, loading, error } = useSupabaseJson<AppleReview>(
        "reviews",
        "reviews.json",
        "ios"
    );

    const filteredReviews = reviews.filter(r => r.attributes.rating! >= 5);

    const reviewItems = filteredReviews.map((r) => ({
        node: <ReviewCard key={r.id} name={r.attributes.authorName || "Utente"} rating={r.attributes.rating!} title={r.attributes.title || ""} body={r.attributes.body || ""} date={r.attributes.date ? formatDate(r.attributes.date) : ""} />
    }
    ))
    if (error)
        return (
            <Alert variant="default" className="w-[50%] mx-auto my-8 border-primary/50">
                <AlertTitle className="flex items-center justify-center text-xl">
                    <InfoIcon className="mr-2" /> Reviews are not available at the moment.
                </AlertTitle>
            </Alert>
        );

    if (loading)
        return (
            <div className="flex flex-row gap-4 items-center justify-center text-muted-foreground font-bold text-2xl">
                <Spinner className="w-6 h-6 inline" /> Loading reviews...
            </div>
        );


    // const reviewItems = [
    //     {
    //         node: <ReviewCard key={"r.id"} name={"Utente"} rating={5} title={"Titolo"} body={"Body"} date={formatDate("2025-03-12T02:41:55-07:00")} />,
    //     },
    //     {
    //         node: <ReviewCard key={"r.id2"} name={"Utente2"} rating={4} title={"Titolo2"} body={"Body2"} date={formatDate("2025-04-15T10:20:30-07:00")} />
    //     },
    // ]




    return (
        <div className="relative w-full overflow-hidden" aria-hidden="true">
            <LogoLoop
                logos={reviewItems}
                speed={60}
                direction="left"
                gap={40}
                hoverSpeed={0}
                scaleOnHover
                ariaLabel="Dicono di noi"
            />
        </div>

    );
}
