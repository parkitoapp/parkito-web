/**
 * Blog page displaying posts and a banner.
 * Metadata includes title and description for SEO.
 * Fetches blog posts and city filters to render the BlogRender component.
 * @returns JSX.Element
 */

import { getPosts } from "@/lib/fetchPosts";
import { BlogPost } from "@/types";
import Banner from "@/components/Banner";
import BlogRender from "@/components/BlogRender";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import BC from "@/components/BC";


export const metadata: Metadata = {
    title: "Blog",
    description: "Scopri il blog di Parkito dove puoi trovare risposta alle tue curiosità.",
};

// Force dynamic rendering to avoid caching issues with deleted posts
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogPage() {
    const posts: BlogPost[] = await getPosts();


    return (
        <>
            <Banner title="Scopri di più sul mondo dei parcheggi Parkito" subtitle="Dai nostri parcheggi, alle attrazioni nei loro dintorni" src="/blog.webp" src2={true} icon={true} social={true} dwbtn={true} />
            <div className="min-h-screen md:px-20 md:mt-10 flex flex-col bg-background w-full">
                <BC />
                <h1 className="text-6xl font-bold mb-4 text-primary px-4" id="icon-link">Blog</h1>
                <Suspense fallback={<Loading />}>
                    <BlogRender posts={posts} />
                </Suspense>
            </div>
        </>
    );
}
