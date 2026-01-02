'use client'

import { useEffect, useState } from 'react'
import Snow from '@/components/Snow'
import isChristmas from '@/hooks/isChristmas'

export default function ChristmasSnow() {
    const [shouldShowSnow, setShouldShowSnow] = useState(false)

    useEffect(() => {
        // Check on client side only
        setShouldShowSnow(isChristmas())
    }, [])

    if (!shouldShowSnow) return null

    return <Snow />
}

