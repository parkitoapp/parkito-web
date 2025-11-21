/**
 * CityDropdown component for selecting cities.
 * Uses a dropdown menu to list cities and their sub-links.
 * Highlights the active city based on the current pathname.
 * 
 * @returns {JSX.Element} The CityDropdown component.
 */

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cities } from "@/data/cities";
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function CityDropdown() {
    const pathname: string = usePathname();
    const isActive = (path: string) => pathname === path;


    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild className={`flex flex-row items-center justify-center ${isActive("/torino") || isActive("/milano") || isActive("/genova") || isActive("/laspezia") ? "border-b rounded-none border-b-primary md:py-2" : ""}`}>
                <Button variant={"ghost"} size={"sm"} className={`hover:bg-transparent hover:cursor-pointer font-bold md:text-xl text-md text-primary dark:text-white hover:text-chart-2 flex flex-row justify-center items-center md:py-2 ${isActive("/torino") || isActive("/milano") || isActive("/genova") || isActive("/laspezia") ? "text-chart-2" : ""}`}>
                    Città
                    <ChevronDown className="flex items-center justify-center mx-auto" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="size-full" align="start">

                {cities.map((city, idx) =>

                    city.subLinks ?
                        (
                            <DropdownMenuSub key={idx}>
                                <DropdownMenuSubTrigger className="text-primary dark:text-white">
                                    {city.name}
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        {city.subLinks.map((sub) => (
                                            <DropdownMenuItem key={sub.name}>
                                                <Link
                                                    className={`size-full text-primary dark:text-white font-2xl text-bold ${isActive(sub.link) ? "text-chart-2" : ""
                                                        }`}
                                                    href={sub.link}
                                                >
                                                    {sub.name}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        )
                        : (
                            <DropdownMenuItem key={city.name}>
                                <Link
                                    className={`text-primary dark:text-white font-2xl text-bold size-full ${isActive(city.link) ? "text-chart-2" : ""
                                        }`}
                                    href={city.link}
                                >
                                    {city.name}
                                </Link>
                            </DropdownMenuItem>
                        ))}
            </DropdownMenuContent>
        </DropdownMenu >
    )
}
