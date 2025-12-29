/**
 * HostDropdown component for selecting hosts.
 * Uses a dropdown menu to list pages dedicated to hosts on desktop.
 * Uses an accordion/collapsible on mobile.
 * Highlights the active host based on the current pathname.
 * 
 * @returns {JSX.Element} The HostDropdown component.
 */

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useWidth } from "@/hooks/useWidth"

interface HostDropdownProps {
    onLinkClick?: () => void
}

export default function HostDropdown({ onLinkClick }: HostDropdownProps) {
    const pathname: string = usePathname()
    const width = useWidth()
    const isMobile = width <= 1024
    const [open, setOpen] = useState(false)
    const isActive = (path: string) => pathname === path
    const hostPages = [
        { name: "Diventa Host", link: "/diventare-host" },
        { name: "Automatizza il tuo parcheggio", link: "/devices" },
    ]

    // Mobile: Use Collapsible (accordion behavior)
    if (isMobile) {
        return (
            <Collapsible className="w-full">
                <CollapsibleTrigger className="flex w-full flex-row items-center justify-between text-primary font-bold dark:text-neutral-300 py-2">
                    <span>Host</span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-col gap-2 pt-2 pl-4">
                    {hostPages.map((page, idx) => (
                        <>
                            <Link
                                key={idx}
                                href={page.link}
                                onClick={onLinkClick}
                                className={`text-primary font-bold dark:text-neutral-300 ${isActive(page.link) ? "text-chart-2" : ""}`}
                            >
                                {page.name}
                            </Link>
                            {idx < hostPages.length - 1 && <DropdownMenuSeparator />}
                        </>
                    ))}
                </CollapsibleContent>
            </Collapsible>
        )
    }

    // Desktop: Use DropdownMenu (popup behavior)
    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild className={`flex flex-row items-center justify-center ${isActive(hostPages[0].link) || isActive(hostPages[1].link) ? "inset-0 h-full w-full px-2 rounded-full bg-chart-1/40" : ""}`}>
                <Button variant={"ghost"} size={"sm"} className={`hover:bg-transparent hover:cursor-pointer font-bold md:text-xl text-md text-primary dark:text-white hover:text-chart-2 flex flex-row justify-center items-center md:py-2 ${isActive("/torino") || isActive("/milano") || isActive("/genova") || isActive("/laspezia") ? "text-chart-2" : ""}`}>
                    Host
                    <ChevronDown className="flex items-center justify-center mx-auto" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="size-full z-9999 bg-popover/95 backdrop-blur-sm relative top-6" align="center">
                {hostPages.map((pages, idx) => (
                    <>
                        <DropdownMenuItem key={idx} onClick={() => setOpen(false)}>
                            <Link
                                className={`text-primary dark:text-white font-2xl text-bold size-full ${isActive(pages.link) ? "text-chart-2" : ""
                                    }`}
                                href={pages.link}
                            >
                                {pages.name}
                            </Link>
                        </DropdownMenuItem>
                        {idx < hostPages.length - 1 && <DropdownMenuSeparator />}
                    </>
                ))}
            </DropdownMenuContent>
        </DropdownMenu >
    )
}