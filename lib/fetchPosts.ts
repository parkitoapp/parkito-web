import { client } from "./sanity";
import { BlogPost } from "@/types";
import { enforceRateLimit } from "@/lib/rate-limit";

export async function getPosts(): Promise<BlogPost[]> {
    // SECURITY: rate-limit per IP to protect the public /blog listing.
    await enforceRateLimit("posts", { limit: 60, windowMs: 60_000 });
    return client.fetch(
        `
        *[_type == "blogPost"] | order(publishedAt desc){
            _id,
            _updatedAt,
            title,
            slug,
            publishedAt,
            metatitle,
            metadescription,
            coverImage,
            altCoverImage,
            tags,
            author {
                name,
                role,
                image
            }
        }
        `,
        {},
        {
            next: { revalidate: 3600 } // ISR revalidate every hour
        }
    );
}

export async function getPost(slug: string): Promise<BlogPost | null> {
    // SECURITY: rate-limit per IP to protect individual /blog/[slug] pages.
    await enforceRateLimit("post", { limit: 120, windowMs: 60_000 });
    return client.fetch(
        `
        *[_type == "blogPost" && slug.current == $slug][0]{
            _id,
            _updatedAt,
            title,
            slug,
            publishedAt,
            metatitle,
            metadescription,
            coverImage,
            coverAlt,
            tags,
            author {
                name,
                role,
                image
            },
            intro,
            recap,
            content[]{
                id,
                title,
                image,
                body,
                sectionAlt
            }
        }
        `,
        { slug },
        {
            next: { revalidate: 3600 } // ISR revalidate every hour
        }
    );
}

// Helper function to check if a post exists (including deleted ones via Sanity Studio URL)
// Note: Deleted posts can't be queried via GROQ, but you can check Sanity Studio history
export async function checkPostExists(slug: string): Promise<{ exists: boolean; _id?: string }> {
    try {
        const post = await client.fetch(
            `*[_type == "blogPost" && slug.current == $slug][0]{_id}`,
            { slug },
            { next: { revalidate: 3600 } }
        );
        return { exists: !!post, _id: post?._id };
    } catch {
        return { exists: false };
    }
}
