'use client'
import Link from 'next/link';
import useSupabaseJson from '@/hooks/useSupabase';
import { Parking } from '@/types';

export default function FooterList() {

    const { data: cities } = useSupabaseJson<Parking>(
        "parking_sheet_data",
        "parkings_data.json"
    );

    return (
        <ul className='flex flex-col mt-4 text-white gap-2 text-sm'>
            {cities?.map((city) => (
                <li key={city.id}>
                    <Link href={`/citta/${city.name}`} title={city.name}>
                        {city.city}
                    </Link>
                </li>
            ))}
        </ul>
    )
}