"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Loading from '@/components/Loading';
import '../globals.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [serverVerified, setServerVerified] = useState<boolean | null>(null);
    const [verifying, setVerifying] = useState(false);

    // Verify token with server on mount and when user changes
    useEffect(() => {
        const verifyWithServer = async () => {
            if (loading || !user) {
                setServerVerified(null);
                return;
            }

            setVerifying(true);
            try {
                // Get the ID token from Firebase
                const idToken = await user.getIdToken();

                // Verify with server
                const response = await fetch("/api/auth/verify", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ idToken }),
                });

                const data = await response.json();

                if (data.valid) {
                    setServerVerified(true);
                    // Set secure HttpOnly cookie via API route (prevents XSS)
                    // Include credentials to ensure cookies are set
                    await fetch("/api/auth/set-cookie", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include", // Important: ensures cookies are set
                        body: JSON.stringify({ idToken }),
                    });
                } else {
                    setServerVerified(false);
                    // Sign out if server rejects
                    const { signOut } = await import("firebase/auth");
                    const { auth } = await import("@/lib/firebase");
                    await signOut(auth);
                    // Clear HttpOnly cookie via API route
                    await fetch("/api/auth/clear-cookie", {
                        method: "POST",
                        credentials: "include", // Important: ensures cookies are cleared
                    });
                    router.push("/login");
                }
            } catch (error) {
                console.error("Error verifying token:", error);
                setServerVerified(false);
                router.push("/login");
            } finally {
                setVerifying(false);
            }
        };

        verifyWithServer();
    }, [user, loading, router]);

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    // Show loading state while checking auth, verifying, or if verification failed
    if (loading || !user || verifying || serverVerified === false || serverVerified === null) {
        return <Loading />;
    }

    // User is authenticated and server-verified, show the admin layout
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