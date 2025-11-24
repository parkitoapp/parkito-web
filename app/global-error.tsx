'use client' // Error boundaries must be Client Components
import Error from '@/components/Error';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        // global-error must include html and body tags
        <html>
            <body>
                <Error title={error.name} message={error.message} onClick={reset} />
            </body>
        </html>
    )
}