import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAuthToken } from "@/lib/firebase-admin";
import AdminShell from "./AdminShell";
import "../globals.css";

/**
 * Server-side admin guard.
 *
 * Previously this layout was a "use client" component and the auth check
 * happened in a `useEffect` after hydration — which meant the admin JSX
 * was always shipped and `proxy.ts` only checked cookie *presence*, not
 * validity. That left `/admin/*` reachable to anyone who could forge a
 * non-empty cookie value.
 *
 * Now the layout is a Server Component that:
 *  1. Reads the HttpOnly `firebase-auth-token` cookie.
 *  2. Verifies it with the Firebase Admin SDK (falls back to REST lookup
 *     if the service account isn't configured).
 *  3. Redirects to `/login` on any failure — nothing below this point
 *     renders without a valid, domain-matching, email-verified token.
 *
 * Note: `/api/*` admin endpoints still need their own per-request guard.
 * The layout check protects page renders, not direct API hits.
 */
export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("firebase-auth-token")?.value;

    if (!token) {
        redirect("/login");
    }

    const result = await verifyAuthToken(token);
    if (!result.valid) {
        redirect("/login");
    }

    return <AdminShell>{children}</AdminShell>;
}
