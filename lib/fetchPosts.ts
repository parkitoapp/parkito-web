import { client } from "./sanity";
import { BlogPost } from "@/types";

export async function getPosts(): Promise<BlogPost[]> {
    return client.fetch(`
        *[_type == "blogPost"] | order(publishedAt desc){
            _id,
            title,
            slug,
            publishedAt,
            coverImage,
            tags,
            author {
                name,
                role,
                image
            }
        }
    `);
}

export async function getPost(slug: string): Promise<BlogPost | null> {
    return client.fetch(
        `
        *[_type == "blogPost" && slug.current == $slug][0]{
            _id,
            title,
            slug,
            publishedAt,
            coverImage,
            tags,
            author {
                name,
                role,
                image
            },
            recap,
            content[]{
                id,
                title,
                images[],
                body
            }
        }
        `,
        { slug }
    );
}
