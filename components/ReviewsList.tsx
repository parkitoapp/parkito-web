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
import Error from "./Error";

export default function ReviewsList() {

    const { data: reviews, loading, error, refetch } = useSupabaseJson<AppleReview>(
        "reviews",
        "reviews.json",
        "ios"
    );

    const reviewItems = reviews.map((r) => ({
        node: <ReviewCard key={r.id} name={r.attributes.authorName || "Utente"} rating={r.attributes.rating || 0} title={r.attributes.title || ""} body={r.attributes.body || ""} date={r.attributes.date ? formatDate(r.attributes.date) : ""} />
    }
    ))
    if (error)
        return (
            <Error onClick={refetch} message={error.message} title="Errore di fetch delle reviews" />
        );

    // const reviewItems = [
    //     {
    //         node: <ReviewCard key={"r.id"} name={"Utente"} rating={5} title={"Titolo"} body={"Body"} date={formatDate("2025-03-12T02:41:55-07:00")} />,
    //     },
    //     {
    //         node: <ReviewCard key={"r.id2"} name={"Utente2"} rating={4} title={"Titolo2"} body={"Body2"} date={formatDate("2025-04-15T10:20:30-07:00")} />
    //     },
    // ]



    console.log("reviewItems: ", reviewItems)
    console.log("reviews: ", reviews);


    if (loading)
        return (
            <div className="flex flex-row gap-4 items-center justify-center text-muted-foreground font-bold text-2xl">
                <Spinner className="w-6 h-6 inline" /> Loading reviews...
            </div>
        );

    if (reviews.length === 0)
        return (
            <div className="flex flex-row items-center justify-center font-bold text-xl text-gray-500">
                No reviews available.
            </div>
        );

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
