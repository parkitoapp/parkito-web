'use client'

import { useEffect, useState } from 'react'
import Snow from '@/components/Snow'
import isChristmas from '@/hooks/isChristmas'

export default function ChristmasSnow() {
    const [mounted, setMounted] = useState(false)

    // Ensure this only runs on the client
    useEffect(() => {
        // defer the update to avoid synchronous setState inside the effect
        const id = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(id);
    }, [])

    // Don't render anything until mounted (client-side only)
    if (!mounted) return null

    // Check on client side only after mount
    if (!isChristmas()) return null

    return <Snow />
}

