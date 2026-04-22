// app/(site)/tos/page.tsx
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";
import BC from "@/components/BC";
import { fetchLegalMarkdown } from "@/lib/legal-content";
import { legalMarkdownComponents } from "@/lib/legal-markdown";

export const metadata: Metadata = {
    title: "Termini e Condizioni",
    description: "Leggi i termini e condizioni di utilizzo dell'app Parkito.",
};

export const dynamic = "force-dynamic";

// Server component
export default async function TermsPage() {
    const content = await fetchLegalMarkdown("terms.md");

    return (
        <div className="max-w-3xl mx-auto px-4 py-32">
            <BC />
            <h1 className="text-6xl font-bold mb-6 text-center text-primary">Termini e Condizioni</h1>
            <ReactMarkdown components={legalMarkdownComponents}>
                {content}
            </ReactMarkdown>
        </div>
    );
}
