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
import { getCities } from "@/lib/parking"
import BC from "@/components/BC"

export const metadata: Metadata = {
    title: 'Dove siamo',
    keywords: ['città parkito', 'dove siamo parkito', 'location parkito', 'aree servite parkito', 'parcheggi per città parkito'],
    description: 'Scopri le città in cui Parkito è disponibile e trova il parcheggio perfetto per te.'
}

export default async function City() {
    const cities = await getCities();
    return (
        <>
            <Banner title="Dove siamo" subtitle="Scopri le città in cui Parkito è disponibile" src="/cities.webp" icon={true} social={true} dwbtn={true} />
            <div className="px-16 pt-8">
                <BC />
            </div>
            <CityList cities={cities} />
        </>
    )
}