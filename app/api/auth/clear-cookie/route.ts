import { NextResponse } from "next/server";

/**
 * API route to clear authentication cookie
 */
export async function POST() {
    const response = NextResponse.json({ success: true });
    
    // Clear the HttpOnly cookie
    response.cookies.set("firebase-auth-token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 0, // Immediately expire
    });

    return response;
}

