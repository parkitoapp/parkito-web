import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/firebase-admin";
import { enforceRateLimit, RateLimitError } from "@/lib/rate-limit";
import { isSameOrigin } from "@/lib/request-origin";

/**
 * Exchange a verified Firebase ID token for an HttpOnly auth cookie.
 *
 * SECURITY:
 *  - Same-origin check (CSRF defense-in-depth on top of SameSite=Strict).
 *  - Rate limited per client IP.
 *  - Cookie is HttpOnly + Secure (prod) + SameSite=Strict + Path=/.
 *  - Cookie max-age matches Firebase token expiry (1h) so a stale token
 *    naturally forces re-verification.
 *  - Error messages returned to the client are generic; Firebase internals
 *    are logged server-side only.
 */
export async function POST(request: NextRequest) {
    if (!isSameOrigin(request)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        await enforceRateLimit("auth-set-cookie", { limit: 10, windowMs: 60_000 });
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

        // Verify the token server-side — we never trust the client's word.
        const result = await verifyAuthToken(idToken);

        if (!result.valid) {
            const safeError = result.error && result.error.startsWith("Access restricted")
                ? result.error
                : "Authentication failed";
            return NextResponse.json(
                { valid: false, error: safeError },
                { status: 403 }
            );
        }

        const response = NextResponse.json({
            valid: true,
            email: result.email,
        });

        // Clear any stale copy before re-setting.
        response.cookies.delete("firebase-auth-token");

        const isProduction = process.env.NODE_ENV === "production";
        response.cookies.set("firebase-auth-token", idToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: "strict",
            path: "/",
            maxAge: 3600,
        });

        return response;
    } catch (error) {
        console.error("Error setting auth cookie:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
