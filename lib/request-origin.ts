import "server-only";

import type { NextRequest } from "next/server";

/**
 * Defense-in-depth CSRF check for state-changing auth endpoints.
 *
 * Browsers send an `Origin` header on every cross-origin POST (and on
 * same-origin POSTs in modern browsers). We require it to match the Host
 * the request was served from. If the header is absent we fall back to
 * the Referer. Anything else is rejected.
 *
 * This complements (does NOT replace) `SameSite=Strict` cookies — the
 * cookie attribute protects the cookie from being attached; this check
 * protects the endpoint itself from being invoked by a third party that
 * happens to have a valid token.
 */
export function isSameOrigin(request: NextRequest): boolean {
    const host = request.headers.get("host");
    if (!host) return false;

    const origin = request.headers.get("origin");
    if (origin) {
        try {
            return new URL(origin).host === host;
        } catch {
            return false;
        }
    }

    const referer = request.headers.get("referer");
    if (referer) {
        try {
            return new URL(referer).host === host;
        } catch {
            return false;
        }
    }

    // No Origin and no Referer on a POST is abnormal — reject.
    return false;
}
