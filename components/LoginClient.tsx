/**
 * LoginClient component for user authentication.
 * Allows users to sign in with their company account.
 * Redirects to admin page upon successful login.
 * Displays error messages for invalid accounts or login failures.
 * 
 * @returns {JSX.Element} The LoginClient component.
 */

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Error from "./Error";

const GENERIC_LOGIN_ERROR = "Login failed. Please try again.";

export default function LoginClient() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleLogin = async () => {
        if (submitting) return;
        setSubmitting(true);
        setError("");

        try {
            // dynamically import firebase only on the client
            const { signInWithPopup, signOut } = await import("firebase/auth");
            const { auth, provider } = await import("@/lib/firebase");

            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();

            // Verify with server (server-side validation is the source of truth)
            const verifyRes = await fetch("/api/auth/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ idToken }),
            });

            const verifyData = await verifyRes.json().catch(() => ({}));

            if (!verifyRes.ok || !verifyData.valid) {
                await signOut(auth).catch(() => {});
                // Only the domain-restriction error is safe/useful to show
                // verbatim — everything else collapses to a generic message.
                const safe =
                    typeof verifyData?.error === "string" &&
                    verifyData.error.startsWith("Access restricted")
                        ? verifyData.error
                        : GENERIC_LOGIN_ERROR;
                setError(safe);
                return;
            }

            // Exchange the verified token for the HttpOnly cookie.
            const cookieRes = await fetch("/api/auth/set-cookie", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ idToken }),
            });

            if (!cookieRes.ok) {
                await signOut(auth).catch(() => {});
                setError(GENERIC_LOGIN_ERROR);
                return;
            }

            router.push("/admin");
        } catch (err) {
            // Never forward Firebase error messages to the UI — they can
            // leak config, user existence, or network internals.
            console.error("Login error:", err);
            setError(GENERIC_LOGIN_ERROR);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 size-full m-auto h-[calc(100dvh-22em)]">
            <div className="bg-white w-[30%] border h-[40%] shadow-lg rounded justify-center items-center flex flex-col gap-6 p-8">
                <h1 className="text-2xl font-semibold">Login</h1>
                <Button
                    onClick={handleLogin}
                    variant="default"
                    className="px-4 py-2 rounded-md"
                    disabled={submitting}
                >
                    {submitting ? "Signing in..." : "Sign in with your company account"}
                </Button>
                {error && (
                    <Error title="Login Error" message={error} />
                )}
            </div>
        </div>
    );
}
