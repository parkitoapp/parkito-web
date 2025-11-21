/**
 * Page displaying the list of cities where Parkito is available.
 * Metadata includes title, keywords, and description for SEO.
 * Uses CityList component to render the list of cities.
 * @returns JSX.Element
 * 
 * app/citta/page.tsx
 */

import { Metadata } from "next"
import CityList from "@/components/CityList"
import Banner from "@/components/Banner"

export const metadata: Metadata = {
    title: 'Dove siamo',
    keywords: ['città parkito', 'dove siamo parkito', 'location parkito', 'aree servite parkito', 'parcheggi per città parkito'],
    description: 'Scopri le città in cui Parkito è disponibile e trova il parcheggio perfetto per te.'
}

export default function City() {
    return (
        <>
            <Banner title="Dove siamo" subtitle="Scopri le città in cui Parkito è disponibile" src="/homePill.webp" src2="/homePill.webp" />
            <CityList />
        </>
    )
}