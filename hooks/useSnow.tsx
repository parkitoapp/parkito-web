'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type SnowContextType = {
    isSnowActive: boolean;
    toggleSnow: () => void;
}

const SnowContext = createContext<SnowContextType | null>(null)

export function SnowProvider({ children }: { children: ReactNode }) {
    const [isSnowActive, setIsSnowActive] = useState(true)

    const toggleSnow = () => setIsSnowActive(prev => !prev)

    return (
        <SnowContext.Provider value={{ isSnowActive, toggleSnow }}>
            {children}
        </SnowContext.Provider>
    )
}

export function useSnow() {
    const context = useContext(SnowContext)
    if (!context) {
        throw new Error('useSnow must be used within a SnowProvider')
    }
    return context
}

