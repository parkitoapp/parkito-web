export const metadata = {
    title: 'Parkito Admin',
    description: 'Sanity Studio',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body style={{ margin: 0, padding: 0 }}>
                {children}
            </body>
        </html>
    )
}