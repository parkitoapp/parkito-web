/**
 * BlogRender component to display and filter blog posts.
 * Includes search functionality and city-based filtering.
 *
 * @param {Props} props - The properties including blog posts.
 * @returns {JSX.Element} The rendered BlogRender component.
 */

'use client'

import BlogCard from "@/components/BlogCard";
import { BlogPost } from "@/types";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from 'next/navigation';
import Filter from "./Filter";

type Props = {
    posts: BlogPost[],
}

export default function BlogRender({ posts }: Props) {

    const searchParams = useSearchParams();
    const [query, setQuery] = useState("");

    const [selectedCity, setSelectedCity] = useState<string | null>(() => {
        try {
            return searchParams?.get('city') || null;
        } catch {
            return null;
        }
    });

    // Extract cities from blog post tags
    const postCities = Array.from(
        new Set(
            posts
                .flatMap((post) => post.tags)
                .filter((tag) => tag && tag.length > 0)
        )
    );

    const result = posts.filter((post) => {
        const matchesQuery =
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.tags.some((tag) =>
                tag.toLowerCase().includes(query.toLowerCase())
            );

        const matchesCity = selectedCity
            ? post.tags.includes(selectedCity)
            : true;

        return matchesQuery && matchesCity;
    });

    return (
        <div className="">
            <div id="blog">
                <Filter
                    filterOptions={postCities}
                    searchQuery={query}
                    selectedFilter={selectedCity}
                    onSearchChange={setQuery}
                    onFilterChange={setSelectedCity}
                    searchPlaceholder="Cerca un post"
                    searchLabel="Cerca un post"
                    allItemsLabel="Tutte le città"
                />
            </div>

            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 gap-16 justify-center items-center mb-10">
                {result.map((post, idx) => (
                    <Link key={idx} href={`/blog/${post.slug.current}`}>
                        <BlogCard
                            title={post.title}
                            publishedAt={post.publishedAt}
                            coverImage={post.coverImage}
                            _id={post._id}
                            tags={post.tags}
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}
