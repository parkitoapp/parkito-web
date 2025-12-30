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

export default function LoginClient() {
    const router = useRouter();
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            setError("");
            // dynamically import firebase only on the client
            const { signInWithPopup, signOut } = await import("firebase/auth");
            const { auth, provider } = await import("@/lib/firebase");

            const result = await signInWithPopup(auth, provider);
            
            // Get the ID token
            const idToken = await result.user.getIdToken();

            // Verify with server (server-side validation is the source of truth)
            const response = await fetch("/api/auth/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idToken }),
            });

            const data = await response.json();

            if (!data.valid) {
                await signOut(auth);
                setError(data.error || "Access restricted to company accounts only.");
                return;
            }

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
            
            // Redirect to admin
            router.push("/admin");
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.message || "Login failed. Please try again.");
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
                >
                    Sign in with your company account
                </Button>
                {error && (
                    <Error title="Login Error" message={error} />
                )}
            </div>
        </div>
    );
}
