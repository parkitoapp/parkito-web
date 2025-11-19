'use client'

import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    if (!isVisible) return null

    return (
        <Button
            onClick={scrollToTop}
            className="bg-white hover:bg-stone-300 fixed w-10 h-10 focus:outline-2-blue-500 right-4 z-50 rounded-full p-2 shadow-lg md:bottom-4 bottom-20"
            aria-label="Torna su"
            variant={"ghost"}
            size={"icon-lg"}
        >
            <ArrowUp className="h-8 w-8 text-chart-1" />
            <span className="sr-only">Torna su</span>
        </Button>
    )
} 