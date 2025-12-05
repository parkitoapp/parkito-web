// app/(site)/tos/page.tsx
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Metadata } from "next";
import BC from "@/components/BC";

export const metadata: Metadata = {
    title: "Termini e Condizioni",
    description: "Leggi i termini e condizioni di utilizzo dell'app Parkito.",
};

// Server component
export default async function TermsPage() {
    // Read markdown file at build time
    const filePath = path.join(process.cwd(), "public/terms.md");
    const content = fs.readFileSync(filePath, "utf-8");

    return (
        <div className="max-w-3xl mx-auto px-4 py-16 mt-20">
            <BC />
            <h1 className="text-6xl font-bold mb-6 text-center text-primary">Termini e Condizioni</h1>
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
                    h1: ({ children }) => <h1 className="text-5xl font-bold mt-10 mb-6 text-chart-2">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-3xl font-semibold mt-8 mb-4 text-chart-2">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-3 text-chart-2">{children}</h3>,
                    li: ({ children }) => <li className="ml-6 mb-2 list-disc">{children}</li>,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
