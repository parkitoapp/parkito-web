"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const COMPANY_DOMAIN = "parkito.app";

export default function LoginClient() {
    const router = useRouter();
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const email = result.user.email || "";

            if (!email.endsWith(`@${COMPANY_DOMAIN}`)) {
                await auth.signOut();
                setError("Access restricted to company accounts only.");
                return;
            }

            router.push("/admin");
        } catch {
            setError("Login failed. Please try again.");
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
                    <Alert variant="destructive" className="w-[50%]">
                        <AlertTitle>
                            <AlertCircle className="mr-2" /> Error
                        </AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    );
}
