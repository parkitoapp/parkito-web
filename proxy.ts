import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of routes that should NOT be treated as city slugs
const excludedRoutes = new Set([
    'citta',
    'api',
    '_next',
    'admin',
    'blog',
    'chi-siamo',
    'contatti',
    'devices',
    'diventare-host',
    'login',
    'terminiecondizioni',
    'favicon.ico',
    'sitemap.xml',
    'robots.txt',
]);

// Cache for city slugs to avoid repeated API calls
let citySlugsCache: Set<string> | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 week cache (matches page revalidation)

async function getCitySlugs(baseUrl: string): Promise<Set<string>> {
    const now = Date.now();

    // Return cached data if still valid
    if (citySlugsCache && (now - cacheTimestamp) < CACHE_DURATION) {
        return citySlugsCache;
    }

    try {
        const response = await fetch(`${baseUrl}/api/cities`, {
            next: { revalidate: 60 }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cities');
        }

        const cities = await response.json();
        const slugs = new Set<string>(
            cities.map((city: { url: string }) => {
                // Extract slug from url like "/citta/milano" -> "milano"
                const parts = city.url.split('/');
                return parts[parts.length - 1];
            })
        );

        citySlugsCache = slugs;
        cacheTimestamp = now;
        return slugs;
    } catch (error) {
        console.error('Error fetching city slugs:', error);
        // Return empty set on error - will result in 404 for unknown paths
        return citySlugsCache || new Set();
    }
}

// Helper function to add security headers to any response
function addSecurityHeaders(response: NextResponse): NextResponse {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');
    return response;
}

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Protect /admin routes - check for authentication token
    if (pathname.startsWith("/admin")) {
        // Allow /admin/login if it exists (for redirects)
        if (pathname === "/admin/login" || pathname === "/login") {
            return addSecurityHeaders(NextResponse.next());
        }

        // Check for token in cookie or Authorization header
        const token =
            request.cookies.get("firebase-auth-token")?.value ||
            request.headers.get("authorization")?.replace("Bearer ", "");

        // If no token, redirect to login
        // The layout will handle the actual verification
        if (!token) {
            const redirectResponse = NextResponse.redirect(new URL("/login", request.url));
            return addSecurityHeaders(redirectResponse);
        }

        return addSecurityHeaders(NextResponse.next());
    }

    // Skip if it's a file request (has extension)
    if (pathname.includes('.')) {
        return addSecurityHeaders(NextResponse.next());
    }

    // Parse the path segments
    const segments = pathname.split('/').filter(Boolean);

    // Skip if no segments or starts with excluded route
    if (segments.length === 0) {
        return addSecurityHeaders(NextResponse.next());
    }

    const firstSegment = segments[0];

    // Skip excluded routes
    if (excludedRoutes.has(firstSegment)) {
        return addSecurityHeaders(NextResponse.next());
    }

    // Get valid city slugs
    const baseUrl = request.nextUrl.origin;
    const validCitySlugs = await getCitySlugs(baseUrl);

    // Check if this is a valid city route
    if (validCitySlugs.has(firstSegment)) {
        // This is a valid city - redirect to /citta/[slug] or /citta/[slug]/[address]
        if (segments.length === 1) {
            // /milano -> /citta/milano
            const url = request.nextUrl.clone();
            url.pathname = `/citta/${firstSegment}`;
            const redirectResponse = NextResponse.redirect(url, { status: 301 });
            return addSecurityHeaders(redirectResponse);
        } else if (segments.length === 2) {
            // /milano/via-roma -> /citta/milano/via-roma
            const url = request.nextUrl.clone();
            url.pathname = `/citta/${firstSegment}/${segments[1]}`;
            const redirectResponse = NextResponse.redirect(url, { status: 301 });
            return addSecurityHeaders(redirectResponse);
        }
    }

    // Not a valid city - let Next.js handle it (will show 404)
    return addSecurityHeaders(NextResponse.next());
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm)$).*)',
    ],
};

