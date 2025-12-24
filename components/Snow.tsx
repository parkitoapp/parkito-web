'use client'

import { useTheme } from "next-themes";
import Snowfall from 'react-snowfall'
import { useSnow } from '@/hooks/useSnow'

export default function Snow() {
    const { theme } = useTheme();
    const { isSnowActive } = useSnow();
    // Use white for dark theme, slate gray for light theme to ensure visibility
    const snowColor = theme === "light" ? "#94a3b8" : "#fff";

    if (!isSnowActive) return null;

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
        <Snowfall
                color={snowColor}
        />
        </div>
    )
}