"use client";

import { useState, useEffect } from 'react'

export function useWidth(): number {
    // Initialize lazily to be SSR-safe
    const [width, setWidth] = useState<number>(() => (typeof window !== 'undefined' ? window.innerWidth : 0));

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => setWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        // ensure we have the current width immediately
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return width;
}