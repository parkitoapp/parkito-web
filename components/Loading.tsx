import { Spinner } from "@/components/ui/spinner"
export default function Loading() {
    return (
        <div className="min-h-screen bg-background flex flex-row items-center justify-center">
            <Spinner className="w-12 h-12 text-primary" />
            <p className="ml-4 text-lg text-primary">Caricamento...</p>
        </div>
    )
}