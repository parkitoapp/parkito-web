import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Row } from "@/types"
import Image from 'next/image'


export default function TableCompare({ rows }: { rows: Row[] }) {
    return (
        <Table className='w-[60%] mx-auto bg-card'>
            <TableCaption>Motivi per cui siamo i migliori😎.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead className='font-bold text-lg text-foreground'>Affitti Tradizionali</TableHead>
                    <TableHead className='p-2'>
                        <Image src="/logo-cropped.webp" width={50} height={50} className="object-contain mx-auto" alt="parkito-logo" />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows.map((row, idx) => (
                    <TableRow key={idx} className={idx % 2 !== 0 ? "" : "bg-primary/10"}>
                        <TableCell className="font-medium text-lg p-6 text-foreground">{row.feature}</TableCell>
                        <TableCell className='p-6 text-lg text-foreground'>{row.traditional}</TableCell>
                        <TableCell className='p-6 text-lg text-foreground'>{row.parkito}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}