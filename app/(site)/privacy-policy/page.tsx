// app/(site)/tos/page.tsx
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Metadata } from "next";
import BC from "@/components/BC";
import { slugify } from "@/lib/slugify";

export const metadata: Metadata = {
    title: "Informativa sulla privacy",
    description: "Leggi l'informativa sulla privacy dell'app Parkito.",
};

import React, { ReactNode } from "react";

// Helper function to extract text from children
function extractText(children: ReactNode): string {
    if (typeof children === "string") return children;
    if (Array.isArray(children)) {
        return children
            .map(child => extractText(child))
            .join("");
    }
    if (children && typeof children === "object" && "props" in children) {
        return extractText((children as { props: { children: ReactNode } }).props.children);
    }
    return "";
}

// Server component
export default async function TermsPage() {
    // Read markdown file at build time
    const filePath = path.join(process.cwd(), "public/privacy.md");
    const content = fs.readFileSync(filePath, "utf-8");
    return (
        <div className="max-w-3xl mx-auto px-4 py-32">
            <BC />
            <ReactMarkdown
                components={{
                    section: ({ children }) => (
                        <p className="mb-4 text-gray-800 text-base leading-relaxed">{children}</p>
                    ),
                    a: ({ href, children }) => (
                        <Link
                            href={href || "#"}
                            className="text-chart-1 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {children}
                        </Link>
                    ),
                    h1: ({ children }) => {
                        const id = slugify(extractText(children));
                        return (
                            <h1
                                id={id}
                                className="text-5xl font-bold mt-10 mb-6 text-chart-2"
                            >
                                {children}
                            </h1>
                        );
                    },
                    h2: ({ children }) => {
                        const id = slugify(extractText(children));
                        return (
                            <h2
                                id={id}
                                className="text-3xl font-semibold mt-8 mb-4 text-chart-2"
                            >
                                {children}
                            </h2>
                        );
                    },
                    h3: ({ children }) => {
                        const id = slugify(extractText(children));
                        return (
                            <h3
                                id={id}
                                className="text-xl font-semibold mt-6 mb-3 text-chart-2"
                            >
                                {children}
                            </h3>
                        );
                    },
                    li: ({ children }) => <li className="ml-6 mb-2 list-disc">{children}</li>,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
