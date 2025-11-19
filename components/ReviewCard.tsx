/**
 * A card component to display user reviews with star ratings.
 * 
 * @param {ReviewCardType} props - The properties of the review card.
 * @returns {JSX.Element} The rendered review card component.
 */

import { ReviewCardType } from "@/types";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FaStar, FaRegStar } from "react-icons/fa";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { useMemo } from "react";

function formatDate(value: string | number) {
    try {
        const d = typeof value === "number" ? new Date(value) : new Date(value);
        return new Intl.DateTimeFormat("it-IT", { year: "numeric", month: "short", day: "numeric" }).format(d);
    } catch {
        return String(value);
    }
}

// const colors = [
//     "bg-red-500",
//     "bg-green-500",
//     "bg-blue-500",
//     "bg-yellow-500",
//     "bg-purple-500",
//     "bg-pink-500",
//     "bg-indigo-500",
//     "bg-teal-500",
//     "bg-orange-500",
//     "bg-cyan-500",
//     "bg-lime-500",
//     "bg-emerald-500",
//     "bg-fuchsia-500",
//     "bg-violet-500",
//     "bg-rose-500",
//     "bg-sky-500",
//     "bg-amber-500",
//     "bg-gray-500",
//     "bg-zinc-500",
//     "bg-neutral-500",
//     "bg-stone-500",
//     "bg-slate-500",
//     "bg-black",
//     "bg-primary",
// ];

export default function ReviewCard({ name, title, rating, body, date }: ReviewCardType) {
    const numericRating = Number(rating) || 0;
    const stars = Array.from({ length: 5 }).map((_, i) => i < Math.round(numericRating));

    // const hash = name
    //     .split("")
    //     .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // const fallback = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

    // const bgColor = colors[hash % colors.length];




    return (
        <Card className="flex flex-col justify-between min-h-60 h-70 min-w-64 max-w-85 shrink-0 text-base border border-border bg-card p-6 rounded-lg shadow-sm">

            {/* Stars at the top */}
            <div className="flex items-center mb-2">
                <div className="flex items-center">
                    {stars.map((filled, i) =>
                        filled ? (
                            <FaStar key={i} className="text-yellow-400 w-6 h-6" />
                        ) : (
                            <FaRegStar key={i} className="text-yellow-300/60 w-6 h-6" />
                        ),
                    )}
                </div>
                <span className="text-sm text-muted-foreground ml-2">{numericRating.toFixed(1)}</span>
            </div>

            {/* Title and body in the middle */}
            <div className="flex flex-col grow justify-center text-center">
                <CardTitle className="text-base mb-1">{title}</CardTitle>
                <p className="whitespace-pre-line italic line-clamp-5">&quot;{body}&quot;</p>
            </div>

            {/* Author and date at the bottom */}
            <div className="text-sm text-chart-2 font-semibold italic mt-4 text-right">
                Da {name} · {formatDate(date)}
            </div>
        </Card>
    );
}