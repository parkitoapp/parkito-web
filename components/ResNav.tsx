/**
 * ResNav component for responsive navigation bar.
 * 
 * @returns {JSX.Element} The ResNav component.
 */

"use client";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
    NavbarButton,
} from "@/components/ui/resizable-navbar";
import { useState, useEffect } from "react";
import ThemeSwitch from "./Switch";
import Link from "next/link";
import CityDropdown from "@/components/CityDropdown";
import HostDropdown from "@/components/HostDropdown";
import { useTheme } from "next-themes";
import { useWidth } from "@/hooks/useWidth";
import { useSnow } from "@/hooks/useSnow";
import { Snowflake } from "lucide-react";
import isChristmas from "@/hooks/isChristmas";
import { Button } from "./ui/button";
import Image from "next/image";

export default function ResNav() {
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Always call hooks unconditionally (React requirement)
    const theme = useTheme();
    const width = useWidth();
    const snow = useSnow();

    // Safely extract values with fallbacks
    const resolvedTheme = theme?.resolvedTheme || "light";
    const displayWidth = width > 0 ? width : (typeof window !== 'undefined' ? window.innerWidth : 1920);
    const isSnowActive = snow?.isSnowActive || false;
    const toggleSnow = snow?.toggleSnow || (() => { });

    // Ensure this only runs on the client to prevent hydration mismatches
    useEffect(() => {
        // Use requestAnimationFrame to defer state update
        const rafId = requestAnimationFrame(() => {
            setMounted(true);
        });
        return () => cancelAnimationFrame(rafId);
    }, []);

    const xmasSrc = resolvedTheme === "dark" ? "/logo-xmas-dark.webp" : "/logo-xmas-light.webp";
    const normalSrc = resolvedTheme === "dark" ? "/logo-dark.webp" : "/logo.webp";

    const finalSrc = isChristmas() ? xmasSrc : normalSrc;

    const navItems = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "Dove Siamo",
            link: "/citta",
        },
        // {
        //     name: "Diventa Host",
        //     link: "/diventare-host",
        // },
        {
            name: "Host",
            link: "",
        },
        // {
        //     name: "Cos'è Parkito",
        //     link: "/about",
        // },
        {
            name: "Blog",
            link: "/blog"
        },
    ];

    const isDesktop = displayWidth > 1024;

    // Render simple fallback navbar if not mounted yet (SSR or initial load)
    // This ensures navbar always shows on Hostinger even if motion library fails
    if (!mounted) {
        return (
            <nav className="fixed inset-x-0 top-0 z-50 w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link href="/" className="flex items-center">
                            <Image
                                width={100}
                                height={100}
                                src={finalSrc}
                                alt="Parkito"
                                className="h-12 w-auto"
                            />
                        </Link>
                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-primary font-medium">Home</Link>
                            <Link href="/citta" className="text-primary font-medium">Dove Siamo</Link>
                            <Link href="/blog" className="text-primary font-medium">Blog</Link>
                            <Link href="/diventare-host" className="text-primary font-medium">Diventa Host</Link>
                            <Link href="/devices" className="text-primary font-medium">Automatizza l&apos;accesso</Link>
                            <ThemeSwitch />
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    // Render full navbar with motion animations once mounted
    return (
        <div className="relative w-full z-99">
            <Navbar>
                {isDesktop ? (
                    <NavBody className="dark:border">
                        <NavbarLogo source={finalSrc} />
                        <NavItems items={navItems} />
                        <div className="flex items-center gap-4">
                            {isChristmas() &&
                                <Button
                                    variant="default"
                                    size="icon"
                                    onClick={() => toggleSnow()}
                                    className={`p-2 rounded-full transition-colors z-1000 ${isSnowActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}
                                    aria-label="Bottone neve"
                                    title={isSnowActive ? "Disattiva neve" : "Attiva neve"}
                                >
                                    <Snowflake size={20} />
                                </Button>}
                            <div className="z-1000">
                                <ThemeSwitch />
                            </div>
                            {/* <NavbarButton variant="primary">Book a call</NavbarButton> */}
                        </div>
                    </NavBody>)
                    :

                    (<MobileNav isMenuOpen={isMobileMenuOpen}>
                        <MobileNavHeader>
                            <NavbarLogo source={finalSrc} />
                            <MobileNavToggle
                                isOpen={isMobileMenuOpen}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            />
                        </MobileNavHeader>

                        <MobileNavMenu
                            isOpen={isMobileMenuOpen}
                            onClose={() => setIsMobileMenuOpen(false)}
                        >
                            {navItems.map((item, idx) => (
                                item.name === "Città" ?
                                    (
                                        <div className="relative text-primary dark:text-neutral-300"
                                            key={`mobile-link-${idx}`}>
                                            <CityDropdown />
                                        </div>
                                    )
                                    : item.name === "Host" ? (
                                        <div key={`mobile-link-${idx}`} className="w-full">
                                            <HostDropdown onLinkClick={() => setIsMobileMenuOpen(false)} />
                                        </div>
                                    ) : (
                                        <Link
                                            key={`mobile-link-${idx}`}
                                            href={item.link}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="relative text-primary font-bold dark:text-neutral-300"
                                        >
                                            <span className="block">{item.name}</span>
                                        </Link>
                                    )
                            ))}
                            <div className="flex w-full flex-col gap-4 mt-auto pt-8">
                                <div className="flex flex-row items-center justify-end gap-4 z-1000">
                                    <NavbarButton
                                        onClick={toggleSnow}
                                        className={`p-2 rounded-full transition-colors z-1000 ${isSnowActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}
                                        aria-label={isSnowActive ? "Disattiva neve" : "Attiva neve"}
                                        title={isSnowActive ? "Disattiva neve" : "Attiva neve"}
                                    >
                                        <Snowflake size={20} />
                                    </NavbarButton>
                                    <ThemeSwitch />
                                </div>
                                {/* <NavbarButton
                            onClick={() => setIsMobileMenuOpen(false)}
                            variant="primary"
                            className="w-full"
                        >
                            Book a call
                        </NavbarButton> */}
                            </div>
                        </MobileNavMenu>
                    </MobileNav>
                    )
                }
            </Navbar>
        </div>
    );
}