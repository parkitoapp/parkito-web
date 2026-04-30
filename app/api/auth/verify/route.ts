import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/firebase-admin";
import { enforceRateLimit, RateLimitError } from "@/lib/rate-limit";
import { isSameOrigin } from "@/lib/request-origin";

/**
 * API route to verify a Firebase ID token and check the email domain.
 *
 * SECURITY:
 *  - Same-origin check (defense-in-depth CSRF protection on top of SameSite).
 *  - Rate limited per client IP — auth verification is brute-force sensitive.
 *  - Generic error responses: never echo Firebase / Admin SDK error messages
 *    to the client, since they can leak enumeration and config details.
 */
export async function POST(request: NextRequest) {
    if (!isSameOrigin(request)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        await enforceRateLimit("auth-verify", { limit: 10, windowMs: 60_000 });
    } catch (error) {
        if (error instanceof RateLimitError) {
            return NextResponse.json(
                { error: "Too many requests" },
                { status: 429, headers: { "Retry-After": String(error.retryAfter) } }
            );
        }
        throw error;
    }

    try {
        const body = await request.json();
        const { idToken } = body;

        if (!idToken || typeof idToken !== "string" || idToken.length > 4096) {
            return NextResponse.json(
                { valid: false, error: "Invalid request" },
                { status: 400 }
            );
        }

        const result = await verifyAuthToken(idToken);

        if (!result.valid) {
            // Only the domain-mismatch error is safe to surface verbatim —
            // it's already based on user-supplied input. Everything else
            // collapses to a generic message.
            const safeError = result.error && result.error.startsWith("Access restricted")
                ? result.error
                : "Authentication failed";
            return NextResponse.json(
                { valid: false, error: safeError },
                { status: 403 }
            );
        }

        return NextResponse.json({ valid: true, email: result.email });
    } catch (error) {
        console.error("Error verifying auth token:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
