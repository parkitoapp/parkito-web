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
} from "@/components/ui/resizable-navbar";
import { useState, useEffect } from "react";
import ThemeSwitch from "./Switch";
import Link from "next/link";
import CityDropdown from "@/components/CityDropdown";
import { useTheme } from "next-themes";
import { useWidth } from "@/hooks/useWidth";

export default function ResNav() {

    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const width = useWidth();


    // Ensure this only runs on the client
    useEffect(() => {
        // defer the update to avoid synchronous setState inside the effect
        const id = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(id);
    }, []);

    if (!mounted) return null; // or a placeholder

    const source = resolvedTheme === "dark" ? "/logo-dark.webp" : "/logo.webp";


    const navItems = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "Dove Siamo",
            link: "/citta",
        },
        {
            name: "Diventa Host",
            link: "/host",
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



    return (
        <div className="relative w-full">
            <Navbar>
                {width > 1024 ? (
                    <NavBody className="dark:border">
                        <NavbarLogo source={source} />
                        <NavItems items={navItems} />
                        <div className="flex items-center gap-4">
                            <div className="z-1000">
                                <ThemeSwitch />
                            </div>
                            {/* <NavbarButton variant="primary">Book a call</NavbarButton> */}
                        </div>
                    </NavBody>)
                    :

                    (<MobileNav>
                        <MobileNavHeader>
                            <NavbarLogo source={source} />
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
                                    : (<Link
                                        key={`mobile-link-${idx}`}
                                        href={item.link}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="relative text-primary font-bold dark:text-neutral-300"
                                    >
                                        <span className="block">{item.name}</span>
                                    </Link>)
                            ))}
                            <div className="flex w-full flex-col gap-4 border-t border-primary">
                                <div className="z-999 flex flex-col items-center justify-center mx-auto mt-2">
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
        </div >
    );
}