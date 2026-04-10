import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit, RateLimitError } from "@/lib/rate-limit";
import { isSameOrigin } from "@/lib/request-origin";

/**
 * Clear the admin auth cookie.
 *
 * SECURITY: requires a same-origin POST and an existing
 * `firebase-auth-token` cookie, so a third party cannot force-logout the
 * admin by hitting this endpoint blindly. Rate limited as well.
 */
export async function POST(request: NextRequest) {
    if (!isSameOrigin(request)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const existing = request.cookies.get("firebase-auth-token")?.value;
    if (!existing) {
        // Nothing to clear — treat as a no-op success so legitimate
        // post-logout cleanup calls still 200, without giving an attacker
        // a free endpoint to poke.
        return NextResponse.json({ success: true });
    }

    try {
        await enforceRateLimit("auth-clear-cookie", { limit: 10, windowMs: 60_000 });
    } catch (error) {
        if (error instanceof RateLimitError) {
            return NextResponse.json(
                { error: "Too many requests" },
                { status: 429, headers: { "Retry-After": String(error.retryAfter) } }
            );
        }
        throw error;
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set("firebase-auth-token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 0,
    });
    return response;
}
