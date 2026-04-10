'use client'

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import BorderGlow from "./BorderGlow"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import Image from "next/image"
import { HomeCardType } from "@/types"

export default function HomeCards({ cards }: { cards: HomeCardType[] }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Optimized colors for theme visibility
  const isDark = resolvedTheme === 'dark'
  const glowColor = isDark ? "260 80 80" : "260 80 50"
  const glowColors = isDark
    ? ['#c084fc', '#f472b6', '#38bdf8']
    : ['#7c3aed', '#db2777', '#0284c7']

  // Pre-render state to avoid flashes, but keep structure for stable layout
  const activeGlowColor = mounted ? glowColor : "260 80 80"
  const activeColors = mounted ? glowColors : ['#c084fc', '#f472b6', '#38bdf8']

  return (
    cards.map((card, index) => {
      const Content = (
        <Card className={`flex flex-col h-full p-4 rounded-[10px] border-none bg-transparent shadow-lg`}>
          <CardHeader className="flex justify-center items-center h-48 p-0">
            <div className="relative w-40 h-40">
              <Image
                src={card.imgSrc}
                alt={card.alt}
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col flex-1 justify-center p-4">
            <CardTitle className="text-xl font-bold text-primary dark:text-chart-3 leading-tight">
              {card.title}
            </CardTitle>
            {card.description && <CardDescription className="text-lg">{card.description}</CardDescription>}
          </CardContent>
        </Card>
      );

      return (
        <BorderGlow
          key={index}
          edgeSensitivity={30}
          glowColor={activeGlowColor}
          backgroundColor="var(--card)"
          borderRadius={28}
          glowRadius={40}
          glowIntensity={1}
          coneSpread={25}
          animated
          colors={activeColors}
          className="h-full"
        >
          {Content}
        </BorderGlow>
      );
    })
  )
}