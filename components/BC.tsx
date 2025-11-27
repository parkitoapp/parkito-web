"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation";
import { Fragment } from "react";

type BCProps = {
    title?: string; // Optional title for the current page (e.g., blog post title)
};

export default function BC({ title }: BCProps) {
    const pathname = usePathname();

    // Split the pathname into segments and filter out empty strings
    const segments = pathname.split('/').filter(Boolean);

    // Create breadcrumb items from path segments
    const breadcrumbs = segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/');
        const isLast = index === segments.length - 1;

        // Capitalize and format the segment name
        let label = segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        // If it's the last segment and we have a title prop, use that instead
        if (isLast && title) {
            label = title;
        }

        return {
            label,
            href,
            isLast
        };
    });

    return (
        <Breadcrumb className="w-full p-4">
            <BreadcrumbList>
                {/* Home link */}
                <BreadcrumbItem className="text-xl">
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                {/* Dynamic breadcrumb items */}
                {breadcrumbs.map((crumb) => (
                    <Fragment key={crumb.href}>
                        <BreadcrumbSeparator className="text-xl" />
                        <BreadcrumbItem className="text-xl">
                            {crumb.isLast ? (
                                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href={crumb.href} className="underline">
                                    {crumb.label}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}