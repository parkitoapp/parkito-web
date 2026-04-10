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
import { motion } from "motion/react"
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
import { DropdownProps } from "@/types"


export default function HostDropdown({
  navDropDown,
  label = "Host",
  onLinkClick
}: {
  navDropDown: DropdownProps[];
  label?: string;
  onLinkClick?: () => void;
}) {
  const pathname: string = usePathname()
  const width = useWidth()
  const isMobile = width <= 1024
  const [open, setOpen] = useState(false)
  const isActive = (path: string) => pathname === path

  const isAnyChildActive = navDropDown.some((item) => isActive(item.link))

  // Mobile: Use Collapsible (accordion behavior)
  if (isMobile) {
    return (
      <Collapsible className="w-full">
        <CollapsibleTrigger className="flex w-full flex-row items-center justify-between text-primary dark:text-accent font-bold  py-2">
          <span className="dark:text-accent">{label}</span>
          <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-2 pt-2 pl-4">
          {navDropDown.map((page, idx) => (
            <Link
              key={idx}
              href={page.link}
              onClick={onLinkClick}
              className={`text-primary dark:text-accent font-bold  ${isActive(page.link) ? "text-chart-2" : ""}`}
            >
              {page.name}
              {idx < navDropDown.length - 1 && <DropdownMenuSeparator className="mt-2" />}
            </Link>
          ))}
        </CollapsibleContent>
      </Collapsible>
    )
  }

  // Desktop: Use DropdownMenu (popup behavior)
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          size={"sm"}
          className={`relative hover:bg-transparent hover:cursor-pointer font-bold md:text-xl text-md hover:text-chart-2 flex flex-row justify-center items-center md:py-2 transition-colors ${isAnyChildActive
            ? "text-white dark:text-white"
            : "text-primary dark:text-accent"
            }`}
        >
          {isAnyChildActive && (
            <motion.div
              layoutId="hovered-host"
              className="absolute inset-0 h-full w-full px-2 rounded-full bg-chart-1/40"
            />
          )}
          <span className="relative z-20">{label}</span>
          <ChevronDown className={`flex items-center justify-center mx-auto ml-1 transition-transform duration-200 relative z-20 ${open ? 'rotate-180' : ''}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-[240px] bg-white/50 dark:bg-neutral-950/50 backdrop-blur-lg border border-primary/20 shadow-2xl rounded-2xl py-2 px-2"
        align="center"
        sideOffset={10}
        side="bottom"
        style={{ zIndex: 9999 }}
      >
        {navDropDown.map((pages, idx) => (
          <DropdownMenuItem
            key={idx}
            onClick={() => {
              setOpen(false)
              onLinkClick?.()
            }}
            className={`px-4 py-3 transition-all rounded-none duration-200 hover:bg-accent/60  focus:bg-accent/60 active:scale-[0.98] cursor-pointer ${idx < navDropDown.length - 1 ? "border-b border-primary/20" : ""}`}
          >
            <Link
              className={`w-full text-primary dark:text-white text-lg font-semibold transition-colors ${isActive(pages.link) ? "text-chart-2 dark:text-chart-2" : "hover:text-chart-2 dark:hover:text-primary"
                }`}
              href={pages.link}
              target={pages.link.includes("https://") ? "_blank" : "_self"}
            >
              {pages.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu >
  )
}