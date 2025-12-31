import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/firebase-admin";

/**
 * API route to verify Firebase ID token and check email domain
 * This is called from the client after login to validate server-side
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

        return NextResponse.json({
            valid: true,
            email: result.email,
        });
    } catch (error: any) {
        console.error("Error verifying auth token:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

