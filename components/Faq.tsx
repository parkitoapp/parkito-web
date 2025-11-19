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
        <div className="w-full bg-background">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center text-primary pt-10">FAQ</h1>

            <Accordion
                type="single"
                collapsible
                className="flex flex-col items-center justify-center mt-10 pb-20 gap-4 px-4 md:px-10"
            >
                {items.map((item, index) => (
                    <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="flex flex-col border-none bg-white dark:bg-ring rounded-2xl px-8 w-full  py-2 hover:cursor-pointer"
                    >
                        <AccordionTrigger className="text-lg font-semibold text-primary dark:text-blue-200 flex flex-row items-center hover:cursor-pointer w-full">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
