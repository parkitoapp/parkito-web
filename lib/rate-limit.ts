import "server-only";

import { headers } from "next/headers";

/**
 * Simple in-memory sliding-window rate limiter.
 *
 * SECURITY: This limiter is per server instance. On multi-instance deploys
 * (Vercel serverless, horizontal scaling, etc.) each instance keeps its own
 * counters, so the effective limit is (limit * instances). For strict,
 * globally-consistent limits swap in @upstash/ratelimit with Upstash Redis.
 */

type Entry = { timestamps: number[] };
const store = new Map<string, Entry>();

export type RateLimitOptions = {
    /** Max requests allowed within the window. */
    limit: number;
    /** Window size in milliseconds. */
    windowMs: number;
};

export type RateLimitResult =
    | { success: true; remaining: number }
    | { success: false; retryAfter: number };

/**
 * Record a hit for `key` and return whether it's allowed.
 * Caller is responsible for choosing a good key (e.g. `services:<ip>`).
 */
export function checkRateLimit(
    key: string,
    { limit, windowMs }: RateLimitOptions
): RateLimitResult {
    const now = Date.now();
    const entry = store.get(key) ?? { timestamps: [] };

    // Drop timestamps outside the window.
    entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);

    if (entry.timestamps.length >= limit) {
        const oldest = entry.timestamps[0];
        const retryAfter = Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000));
        store.set(key, entry);
        return { success: false, retryAfter };
    }

    entry.timestamps.push(now);
    store.set(key, entry);
    return { success: true, remaining: limit - entry.timestamps.length };
}

export class RateLimitError extends Error {
    readonly retryAfter: number;
    constructor(retryAfter: number) {
        super(`Rate limit exceeded. Retry after ${retryAfter}s.`);
        this.name = "RateLimitError";
        this.retryAfter = retryAfter;
    }
}

/**
 * Resolve the client IP from request headers. Falls back to "unknown" when
 * headers aren't available (e.g. build-time prerender). Using "unknown" as a
 * shared key means prerender calls share one bucket, which is fine because
 * they're not user-driven.
 */
export async function getClientIp(): Promise<string> {
    try {
        const h = await headers();
        const fwd = h.get("x-forwarded-for");
        if (fwd) return fwd.split(",")[0].trim();
        const real = h.get("x-real-ip");
        if (real) return real.trim();
        return "unknown";
    } catch {
        return "unknown";
    }
}

/**
 * Convenience: enforce a rate limit scoped to the current request IP.
 * Throws RateLimitError on breach so callers can bubble it up.
 */
export async function enforceRateLimit(
    scope: string,
    options: RateLimitOptions
): Promise<void> {
    const ip = await getClientIp();
    const result = checkRateLimit(`${scope}:${ip}`, options);
    if (!result.success) {
        throw new RateLimitError(result.retryAfter);
    }
}
