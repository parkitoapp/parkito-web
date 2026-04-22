// app/(site)/tos/page.tsx
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";
import BC from "@/components/BC";
import { fetchLegalMarkdown } from "@/lib/legal-content";
import { legalMarkdownComponents } from "@/lib/legal-markdown";

export const metadata: Metadata = {
    title: "Informativa sulla privacy",
    description: "Leggi l'informativa sulla privacy dell'app Parkito.",
};

export const dynamic = "force-dynamic";

// Server component
export default async function TermsPage() {
    const content = await fetchLegalMarkdown("privacy.md");

    return (
        <div className="max-w-3xl mx-auto px-4 py-32">
            <BC />
            <ReactMarkdown components={legalMarkdownComponents}>
                {content}
            </ReactMarkdown>
        </div>
    );
}
