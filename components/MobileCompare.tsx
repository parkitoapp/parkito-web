
import { Row } from '@/types'
import Image from 'next/image'
import { Card, CardTitle, CardContent, CardFooter } from './ui/card'

export default function MobileCompare({ rows }: { rows: Row[] }) {
    return (
        <div className="space-y-4 px-2">
            {rows.map((row, idx) => (
                <Card
                    key={idx}
                    className="p-4 rounded-3xl border border-border bg-card shadow-sm"
                >
                    <CardTitle className="text-lg font-bold text-primary dark:text-ring text-center mb-2">
                        {row.feature}
                    </CardTitle>

                    <CardContent className="flex items-start justify-evenly py-1">
                        <span className="text-foreground">Affitti Tradizionali</span>
                        <span className="text-foreground flex items-center gap-2">
                            <Image
                                src="/logo-cropped.webp"
                                width={24}
                                height={24}
                                alt="parkito-logo"
                            />
                            Parkito
                        </span>
                    </CardContent>

                    <CardFooter className="flex items-start justify-evenly py-1">
                        <span className="text-foreground text-sm w-full text-center">{row.traditional}</span>
                        <span className="text-foreground text-sm w-full text-center">{row.parkito}</span>

                    </CardFooter>
                </Card>
            ))}
        </div>

    )
}