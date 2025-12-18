import { client } from "./sanity";
import { BlogPost } from "@/types";

export async function getPosts(): Promise<BlogPost[]> {
    return client.fetch(
        `
        *[_type == "blogPost"] | order(publishedAt desc){
            _id,
            title,
            slug,
            publishedAt,
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
            next: { revalidate: 0 } // Disable caching for fresh data
        }
    );
}

export async function getPost(slug: string): Promise<BlogPost | null> {
    return client.fetch(
        `
        *[_type == "blogPost" && slug.current == $slug][0]{
            _id,
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
            next: { revalidate: 0 } // Disable caching for fresh data
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
            { next: { revalidate: 0 } }
        );
        return { exists: !!post, _id: post?._id };
    } catch {
        return { exists: false };
    }
}
