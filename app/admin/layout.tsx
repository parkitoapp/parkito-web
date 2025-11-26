export const metadata = {
    title: 'Parkito Admin',
    description: 'Sanity Studio',
}
import { ThemeProvider } from "@/hooks/theme-provider";
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import '../globals.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

                    <SidebarProvider>
                        <AppSidebar />
                        <main className="w-full min-h-screen">
                            <SidebarTrigger />
                            {children}
                        </main>
                    </SidebarProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}