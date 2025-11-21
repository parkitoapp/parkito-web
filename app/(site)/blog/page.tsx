/**
 * Blog page displaying posts and a banner.
 * Metadata includes title and description for SEO.
 * Fetches blog posts and city filters to render the BlogRender component.
 * @returns JSX.Element
 */

import { getPosts } from "@/lib/fetchPosts";
import { BlogPost } from "@/types";
import Banner from "@/components/Banner";
import { cities } from "@/data/cities";
import BlogRender from "@/components/BlogRender";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Blog",
    description: "Scopri il blog di Parkito dove puoi trovare risposta alle tue curiosità.",
};


export default async function BlogPage() {
    const posts: BlogPost[] = await getPosts();
    const cityFilter = cities.map((c) => c.subLinks ? c.subLinks.map((s) => s.name) : c.name).flat();


    return (
        <>
            <Banner title="Scopri il blog di Parkito dove puoi trovare risposta alle tue curiosità" subtitle="Dai nostri parcheggi, alle attrazioni nei loro dintorni" src="/homePic.png" src2={"/homePill.png"} icon={true} social={true} dwbtn={true} />
            <div className="min-h-screen md:px-20 md:mt-10 flex flex-col bg-background w-full">
                <h1 className="text-6xl font-bold mb-8 text-primary" id="icon-link">Blog</h1>
                <BlogRender posts={posts} cities={cityFilter} />
            </div>
        </>
    );
}
