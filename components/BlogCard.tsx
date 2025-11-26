/**
 * BlogCard component to display a blog post summary.
 * @param {Partial<BlogPost>} props - The properties of the blog post.
 * @returns {JSX.Element} The rendered BlogCard component.
 */

import { BlogPost } from "@/types";
import { Card, CardFooter, CardTitle } from "./ui/card";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity";
import { SanityImage } from "@/types";
import { Badge } from "./ui/badge";

const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImage) => builder.image(source).url();

export default function BlogCard({ title, coverImage, publishedAt, tags }: Partial<BlogPost>) {
    return (
        // make the card rounded with overflow-hidden so the image sits flush at the top
        <Card className="border-transparent shadow-none rounded-3xl overflow-hidden bg-card hover:scale-[1.02] transition-transform duration-200 relative hover:shadow-lg">
            {coverImage && (
                <>
                    <Image
                        src={urlFor(coverImage)!}
                        alt={title!}
                        className="w-full h-48 object-cover rounded-t-3xl"
                        width={400}
                        height={200}
                    />
                    <Badge className="text-sm absolute top-2 left-2 p-2 bg-accent text-primary dark:text-white">
                        {new Date(publishedAt!).toLocaleDateString()}
                    </Badge>
                </>
            )}

            <CardFooter className="flex flex-col gap-2 items-center justify-start py-4 w-full p-6">
                <CardTitle className="dark:text-chart-3 text-chart-4 text-xl items-center justify-start text-left w-full">{title}</CardTitle>


                <div className="flex gap-2 flex-wrap items-center justify-start w-full">
                    {tags?.map((t) => (
                        <Badge key={t} className="text-primary text-md bg-accent">
                            {t}
                        </Badge>
                    ))}
                </div>
            </CardFooter>
        </Card>
    );
}
