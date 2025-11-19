'use client'

import { Input } from "@/components/ui/input";
import BlogCard from "@/components/BlogCard";
import { Label } from "@/components/ui/label";
import { BlogPost } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SearchIcon } from "lucide-react";

type Props = {
    posts: BlogPost[],
    cities: string[],
}

export default function BlogRender({ posts, cities }: Props) {

    const [query, setQuery] = useState("");
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const handleSearch = (value: string) => {
        setQuery(value);
    }

    const handleFilter = (city: string) => () => {
        if (selectedCity === city) {
            setSelectedCity(null); // Deselect if the same city is clicked
        } else {
            setSelectedCity(city);
        }
    }

    const result = posts.filter(
        (post) => {
            const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
            const matchesCity = selectedCity ? post.tags.includes(selectedCity) : true;
            return matchesQuery && matchesCity;
        }
    );

    console.log("cities", cities);
    console.log("first post: ", posts[0]);
    console.log("first posts tag", posts[0].tags);

    return (
        <>
            <div className="border-b border-b-gray-300">
                <Label htmlFor="search" hidden aria-description="cerca un post">Cerca un post</Label>
                <div className="flex flex-row gap-2 items-center">
                    <SearchIcon className="text-chart-2" />
                    <Input
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        type="search"
                        placeholder="Cerca un post"
                        className="w-[40%] p-4 my-10 bg-white rounded-full placeholder:text-muted-foreground focus:border focus:border-chart-2 focus:ring-chart-2" id="search"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 md:flex md:flex-row gap-4 my-10">
                <Button onClick={handleFilter('')} className={`px-2 text-lg rounded-full hover:cursor-pointer ${selectedCity === null ? 'bg-chart-1 text-white' : ''}`}>
                    Tutte le città
                </Button>

                {cities.map((city, idx) => (
                    <Button key={idx} onClick={handleFilter(city)} className={`px-2 text-lg rounded-full hover:cursor-pointer ${selectedCity === city ? 'bg-chart-1 text-white' : ''}`}>
                        {city}
                    </Button>
                ))}

            </div >

            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 gap-16 justify-center items-center ">
                {result.map((post, idx) => (
                    <Link key={idx} href={`/blog/${post.slug.current}`}>
                        <BlogCard title={post.title} publishedAt={post.publishedAt} coverImage={post.coverImage} _id={post._id} tags={post.tags} />
                    </Link>
                ))}
            </div>
        </>
    )
}