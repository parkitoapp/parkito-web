/**
 * ThemeSwitch component to toggle between light and dark themes.
 * Utilizes next-themes for theme management and lucide-react for icons.
 * 
 * @returns {JSX.Element} The ThemeSwitch component.
 */

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function ThemeSwitch() {

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // When mounted on client, now we can show the UI
    useEffect(() => {
        const id = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(id);
    }, []);
    if (!mounted) return null;


    const twclass: string = theme === "light" ? "bg-amber-300 text-amber-600" : "bg-blue-900 text-slate-400";

    return (
        <Button
            size={"icon"}
            className={`${twclass} hover:none`}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle Theme"
        >
            {theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
    )
}