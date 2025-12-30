import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/firebase-admin";

/**
 * API route to set authentication cookie securely (HttpOnly, Secure)
 * This endpoint verifies the token and sets it in an HttpOnly cookie
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { idToken } = body;

        if (!idToken || typeof idToken !== "string") {
            return NextResponse.json(
                { error: "Missing or invalid idToken" },
                { status: 400 }
            );
        }

        // Verify the token server-side
        const result = await verifyAuthToken(idToken);

        if (!result.valid) {
            return NextResponse.json(
                { 
                    valid: false,
                    error: result.error || "Authentication failed"
                },
                { status: 403 }
            );
        }

        // Set HttpOnly cookie (not accessible to JavaScript, prevents XSS)
        const response = NextResponse.json({
            valid: true,
            email: result.email,
        });

        // First, clear any old non-HttpOnly cookie by setting it to empty with immediate expiry
        response.cookies.delete("firebase-auth-token");
        
        // Set cookie with security flags
        const isProduction = process.env.NODE_ENV === "production";
        response.cookies.set("firebase-auth-token", idToken, {
            httpOnly: true, // Prevents JavaScript access (XSS protection)
            secure: isProduction, // HTTPS only in production
            sameSite: "strict", // CSRF protection
            path: "/",
            maxAge: 3600, // 1 hour (matches Firebase token expiry)
        });

        return response;
    } catch (error: any) {
        console.error("Error setting auth cookie:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

