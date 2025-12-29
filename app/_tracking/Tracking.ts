'use client'

import { useEffect } from 'react'
import { initMixpanel } from '@/lib/mixpanel'

export default function Tracking() {
    useEffect(() => {
        initMixpanel()
    }, [])
    return null
}