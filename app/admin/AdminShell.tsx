"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

/**
 * Client-side shell that lives *inside* the server-gated admin layout.
 *
 * The server layout has already verified the HttpOnly auth cookie before
 * this component ever renders. This component's only job is to:
 *  1. Render the sidebar chrome.
 *  2. Keep the HttpOnly cookie in sync with Firebase's rotating ID token
 *     (Firebase refreshes tokens ~every hour; we push the latest one to
 *     the server so the next request passes the server-side check).
 *  3. Kick the user back to /login if the client-side Firebase session
 *     disappears (signed out in another tab, token revoked, etc.).
 *
 * No auth decisions are made here — this is UX glue only. Treat it as
 * untrusted: the real guard is the parent server layout.
 */
export default function AdminShell({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    // Push the latest Firebase ID token into the HttpOnly cookie whenever
    // it rotates. Firebase fires `onIdTokenChanged` under the hood and
    // `getIdToken()` transparently refreshes; we just trigger a server
    // round-trip on mount + whenever the user object changes.
    useEffect(() => {
        if (loading) return;

        if (!user) {
            // Client lost its Firebase session — tell the server to clear
            // its cookie and bounce us to /login. The server layout would
            // catch this on the next navigation anyway, but doing it now
            // avoids a stale UI.
            (async () => {
                try {
                    await fetch("/api/auth/clear-cookie", {
                        method: "POST",
                        credentials: "include",
                    });
                } catch {
                    /* best-effort */
                }
                router.push("/login");
            })();
            return;
        }

        (async () => {
            try {
                const idToken = await user.getIdToken();
                const res = await fetch("/api/auth/set-cookie", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ idToken }),
                });
                if (!res.ok) {
                    // Server rejected the token — drop back to /login so
                    // the user can re-authenticate cleanly.
                    router.push("/login");
                }
            } catch {
                router.push("/login");
            }
        })();
    }, [user, loading, router]);

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
