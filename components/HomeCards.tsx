'use client'

import BorderGlow from "./BorderGlow"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import Image from "next/image"
import { HomeCardType } from "@/types"



export default function HomeCards({ cards }: { cards: HomeCardType[] }) {
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
            <CardTitle className="text-lg font-bold text-primary dark:text-chart-3 leading-tight">
              {card.title}
            </CardTitle>
            {card.description && <CardDescription>{card.description}</CardDescription>}
          </CardContent>
        </Card>
      );

      return (
        <BorderGlow
          key={index}
          edgeSensitivity={30}
          glowColor="40 80 80"
          backgroundColor="var(--card)"
          borderRadius={28}
          glowRadius={40}
          glowIntensity={1}
          coneSpread={25}
          animated
          colors={['#c084fc', '#f472b6', '#38bdf8']}
          className="h-full"
        >
          {Content}
        </BorderGlow>
      );

    })

  )
}