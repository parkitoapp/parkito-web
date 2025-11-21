import { getPost } from "@/lib/fetchPosts";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { SanityImage } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { blogFaqs } from "@/data/blogFaq";
import Faq from "@/components/Faq";
import { FAQ } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ChevronsLeft } from "lucide-react";
import { Metadata } from "next";

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
        title: post.title,
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
};

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return <div>Post not found</div>;
    const cityFaqs: FAQ[] | undefined = blogFaqs.find(f => post.tags.includes(f.city))?.faqs;

    return (
        <>
            <div className="mx-auto py-32 px-16">

                {/* TITLE */}
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                {/* COVER IMAGE */}
                {post.coverImage && (
                    <Image
                        src={urlFor(post.coverImage)!}
                        alt={post.title}
                        className="w-full h-auto mb-8 rounded-lg"
                        width={1200}
                        height={1200}
                    />
                )}

                {/* META */}
                <div className="flex flex-col gap-4 mb-6">
                    <Badge className="text-sm p-2 bg-white text-primary">
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
                            <p className="text-sm text-gray-500">{post.author?.role}</p>
                        </div>
                    </div>
                </div>

                {/* TAGS */}
                <div className="flex items-center gap-2 mb-6">
                    {post.tags?.map(tag => (
                        <Badge
                            key={tag}
                            className="p-2"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>

                <Card className="mb-12 w-[30%] p-4">
                    <CardTitle>Indice dei contenuti</CardTitle>
                    <CardContent className="p-8 ">
                        <ul className="flex flex-col list-disc">
                            {post.content?.map(section => (
                                <li key={section.id}>
                                    <Link href={`#${section.id}`} className="text-blue-500 underline">
                                        {section.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* CONTENT SECTIONS */}
                <div className="prose">
                    {post.content?.map((section, idx) => (
                        <section
                            key={section.id}
                            id={section.id} // anchor for ToC
                            className="mb-16"
                        >
                            <h2 className="text-chart-2 font-bold text-5xl">{section.title}</h2>

                            {/* Section images */}
                            {section.images && (
                                <>
                                    <div className="flex flex-col gap-4 my-4">
                                        {section.images.map((img, i) => (
                                            <Image
                                                key={i}
                                                src={urlFor(img)!}
                                                alt={`Image for ${section.title}`}
                                                width={1200}
                                                height={600}
                                                className="rounded-lg"
                                            />
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Body */}
                            <div className="py-4 w-full">
                                <PortableText value={section.body} components={portableComponents} />
                            </div>
                            {idx % 2 === 0 &&
                                <div className="flex flex-row w-full mx-auto items-center justify-start gap-4 mt-16">
                                    <Link href="https://apps.apple.com/it/app/parkito-park-sharing/id6446240996" aria-label="apple download button">
                                        <Image src="/applebtn.png" alt="App Store" width={150} height={50} />
                                    </Link>
                                    <Link href="https://play.google.com/store/apps/details?id=it.autoindabox.mobile&hl=it" aria-label="android download button">
                                        <Image src="/googlebtn.png" alt="Google Play" width={150} height={50} />
                                    </Link>
                                </div>}
                        </section>
                    ))}
                </div>
                {cityFaqs && (
                    <Faq items={cityFaqs} />
                )}
                <Button asChild className="mt-16">
                    <Link href="/blog"><ChevronsLeft className="inline" /> Torna al Blog</Link>
                </Button>
            </div>
        </>
    );
}
