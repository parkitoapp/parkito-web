/**
 * BlogRender component to display and filter blog posts.
 * Includes search functionality and city-based filtering.
 *
 * @param {Props} props - The properties including blog posts.
 * @returns {JSX.Element} The rendered BlogRender component.
 */

'use client'

import { Input } from "@/components/ui/input";
import BlogCard from "@/components/BlogCard";
import { Label } from "@/components/ui/label";
import { BlogPost } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from 'next/navigation';

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

    const handleSearch = (value: string) => {
        setQuery(value);
    }

    const handleFilter = (city: string | null) => () => {
        if (selectedCity === city) {
            setSelectedCity(null);
        } else {
            setSelectedCity(city);
        }
    }

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
        <>
            <div id="blog">
                <Label htmlFor="search" hidden>
                    Cerca un post
                </Label>
                <div className="flex flex-row gap-2 items-center px-4">
                    <SearchIcon className="text-chart-2" />
                    <Input
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        type="search"
                        placeholder="Cerca un post"
                        className="w-full md:w-[40%] p-4 my-10 bg-white rounded-full placeholder:text-muted-foreground focus:border focus:border-chart-2 focus:ring-chart-2"
                        id="search"
                    />
                </div>
            </div>

            <div className="border-b border-b-gray-300 mx-4" />

            <div className="grid grid-cols-2 md:flex md:flex-row gap-4 my-10 px-4 overflow-x-auto w-[50%] mx-auto">
                <Button
                    onClick={handleFilter(null)}
                    className={`px-2 text-lg rounded-full hover:cursor-pointer ${selectedCity === null ? 'bg-chart-1 text-white' : ''
                        }`}
                >
                    Tutte le città
                </Button>

                {postCities.map((city, idx) => (
                    <Button
                        key={idx}
                        onClick={handleFilter(city)}
                        className={`px-2 text-lg rounded-full hover:cursor-pointer ${selectedCity === city ? 'bg-chart-1 text-white' : ''
                            }`}
                    >
                        {city}
                    </Button>
                ))}
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
        </>
    )
}
