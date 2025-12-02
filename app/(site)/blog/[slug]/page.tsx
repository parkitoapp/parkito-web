/**
 * Dynamic blog post page.
 * Fetches and displays a blog post based on the slug parameter.
 * Generates dynamic metadata for each post.
 * Renders content sections with PortableText and images.
 * Includes author info, tags, and FAQs related to the post's city.
 * @param params - Object containing the slug of the blog post.
 * @returns JSX.Element
 */

import { getPost } from "@/lib/fetchPosts";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { SanityImage } from "@/types";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { blogFaqs } from "@/data/blogFaq";
import Faq from "@/components/Faq";
import { FAQ } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ChevronsLeft, Search } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { parkingFaqs } from "@/data/parkingFaq";
import BC from "@/components/BC";
import DownloadButtons from "@/components/DownloadButtons";

const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImage) => builder.image(source).url();

export const dynamic = "force-dynamic";

type Props = {
    params: { slug: string } | Promise<{ slug: string }>;
};

// Generate dynamic metadata for each blog post (title from post)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) {
        return {
            title: 'Post not found',
        };
    }

    return {
        title: post.metatitle,
        description: post.metadescription,
    };
}

// PortableText component mapping: ensure Sanity block headings get Tailwind styles
const portableComponents = {
    block: {
        h1: ({ children }: { children?: React.ReactNode }) => (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-chart-2 my-6">{children}</h1>
        ),
        h2: ({ children }: { children?: React.ReactNode }) => (
            <h2 className="text-3xl md:text-4xl font-bold text-chart-2 my-4">{children}</h2>
        ),
        h3: ({ children }: { children?: React.ReactNode }) => (
            <h3 className="text-2xl font-semibold my-3">{children}</h3>
        ),
        h4: ({ children }: { children?: React.ReactNode }) => (
            <h4 className="text-xl font-semibold my-3">{children}</h4>
        ),
        normal: ({ children }: { children?: React.ReactNode }) => (
            <p className="text-base leading-relaxed my-3">{children}</p>
        ),
    },
    list: {
        bullet: ({ children }: { children?: React.ReactNode }) => (
            <ul className="list-disc list-inside my-3 ml-4">{children}</ul>
        ),
        number: ({ children }: { children?: React.ReactNode }) => (
            <ol className="list-decimal list-inside my-3 ml-4">{children}</ol>
        ),
    },
    listItem: ({ children }: { children?: React.ReactNode }) => (
        <li className="my-1">{children}</li>
    ),
    marks: {
        link: ({ children, value }: { children?: React.ReactNode, value?: { href: string } }) => (
            <Link
                href={value?.href || "#"}
                className="text-chart-1 dark:text-ring underline hover:text-chart-2 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </Link>
        ),
    },
};

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return <div>Post not found</div>;
    const cityFaqs: FAQ[] | undefined = blogFaqs.find(f => post.tags.includes(f.city))?.faqs;

    return (
        <>
            <div className="mx-auto py-32 px-6 md:px-16">
                <BC title={post.title} />


                {/* TITLE */}
                <h1 className="text-5xl font-bold my-4">{post.title}</h1>
                {/* COVER IMAGE */}
                {post.coverImage && (
                    <Image
                        src={urlFor(post.coverImage)!}
                        alt={post.coverAlt}
                        className="w-[70%] mx-auto object-cover mb-8 rounded-lg"
                        width={500}
                        height={400}
                    // sizes="100vw"
                    />

                )}

                {/* META */}
                <div className="flex flex-col gap-4 mb-6 h-full">
                    <Badge className="p-2 bg-accent text-primary dark:text-white">
                        {new Date(post.publishedAt!).toLocaleDateString()}
                    </Badge>
                    <div className="flex items-center gap-4">
                        {post.author?.image && (
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={urlFor(post.author.image)!} alt={post.author.name} />
                                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        )}

                        <div>
                            <p className="font-medium">{post.author?.name}</p>
                            <p className="text-sm text-primary">{post.author?.role}</p>
                        </div>

                    </div>
                    {/* TAGS */}
                    <div className="flex items-center gap-2 mb-6">
                        {post.tags?.map(tag => (
                            <Badge
                                key={tag}
                                className="p-2 bg-accent text-primary dark:text-white"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>

                {post.intro && (
                    <div className="py-4 w-full">
                        <PortableText value={post.intro} components={portableComponents} />
                    </div>
                )}

                <Card className="mb-12 md:w-[30%] p-4 rounded-3xl">
                    <CardTitle>Indice dei contenuti</CardTitle>
                    <CardContent className="p-8 ">
                        <ul className="flex flex-col list-disc">
                            {post.content?.map(section => (
                                <li key={section.title.toLowerCase().replace(/\s/g, "-")}>
                                    <Link href={`#${section.title.toLowerCase().replace(/\s/g, "-")}`} className="text-primary underline">
                                        {section.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* RECAP SECTION */}
                {post.recap && (
                    <Card className="mb-12 p-6 rounded-3xl bg-muted max-w-4xl">
                        <CardTitle className="mb-4"><Search className="mr-2 inline" size={20} /> In Breve</CardTitle>
                        <CardContent className="prose">
                            <PortableText value={post.recap} components={portableComponents} />
                        </CardContent>
                    </Card>
                )}

                {/* CONTENT SECTIONS */}
                <div className="prose prose-img:max-w-none max-w-none">
                    {post.content?.map((section, idx) => (
                        console.log(idx),
                        <section
                            key={section.title.toLowerCase().replace(/\s/g, "-")}
                            id={section.title.toLowerCase().replace(/\s/g, "-")} // anchor for ToC
                            className="mb-16"
                        >
                            <h2 className="text-chart-2 font-bold text-5xl">{section.title}</h2>

                            {/* Section images */}
                            {section.image && (
                                <div className="flex flex-col gap-4 my-4 not-prose">
                                    <Image
                                        src={urlFor(section.image)!}
                                        alt={section.sectionAlt}
                                        width={500}
                                        height={400}
                                        className="w-[70%] h-auto rounded-lg"
                                    />
                                </div>
                            )}


                            {/* Body */}
                            <div className="py-4 w-full">
                                <PortableText value={section.body} components={portableComponents} />
                            </div>
                            {(idx === 0 || idx === post.content!.length - 1) && (
                                <div className="flex flex-row w-full mx-auto items-center justify-start gap-4 mt-16">
                                    <DownloadButtons />
                                </div>)}
                        </section>
                    ))}
                </div>
                {cityFaqs ?
                    <Faq items={cityFaqs} />
                    :
                    <Faq items={parkingFaqs} />
                }
                <Button asChild className="mt-16">
                    <Link href="/blog"><ChevronsLeft className="inline" /> Torna al Blog</Link>
                </Button>
            </div>
        </>
    );
}
