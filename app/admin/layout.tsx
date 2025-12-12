"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Loading from '@/components/Loading';
import '../globals.css';

const COMPANY_DOMAIN = "parkito.app";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    // Show loading state while checking auth OR if user is not authenticated (to prevent flash)
    if (loading || !user) {
        return <Loading />;
    }

    // Check if user has company email
    if (!user.email?.endsWith(`@${COMPANY_DOMAIN}`)) {
        return <Loading />; // Show loading while redirecting
    }

    // User is authenticated, show the admin layout
    return (
        <div>
            <SidebarProvider>
                <AppSidebar />
                <main className="w-full min-h-screen">
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarProvider>
        </div>
    );
}