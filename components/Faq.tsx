/**
 * Faq component to display a list of frequently asked questions.
 * 
 * @param {FaqProps} props - The properties including an array of FAQ items.
 * @returns {JSX.Element} The rendered Faq component.
 */

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export type FAQ = {
    question: string;
    answer: string;
};

interface FaqProps {
    items: FAQ[];
}

export default function Faq({ items }: FaqProps) {
    if (!items?.length) return null;

    return (
        <div className="w-full bg-background rounded-lg">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center text-primary pt-10">FAQ</h2>

            <Accordion
                type="single"
                collapsible
                className="flex flex-col items-center justify-center mt-10 pb-20 gap-4 px-4 md:px-10"
            >
                {items.map((item, index) => (
                    <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="flex flex-col border-none bg-white dark:bg-accent rounded-2xl px-8 w-full  py-2 hover:cursor-pointer"
                    >
                        <AccordionTrigger className="text-lg font-semibold text-primary dark:text-white flex flex-row items-center hover:cursor-pointer w-full">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                            <span dangerouslySetInnerHTML={{ __html: item.answer }} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
