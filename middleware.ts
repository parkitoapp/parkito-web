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

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip if it's a file request (has extension)
    if (pathname.includes('.')) {
        return NextResponse.next();
    }

    // Parse the path segments
    const segments = pathname.split('/').filter(Boolean);

    // Skip if no segments or starts with excluded route
    if (segments.length === 0) {
        return NextResponse.next();
    }

    const firstSegment = segments[0];

    // Skip excluded routes
    if (excludedRoutes.has(firstSegment)) {
        return NextResponse.next();
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
            return NextResponse.redirect(url, { status: 301 });
        } else if (segments.length === 2) {
            // /milano/via-roma -> /citta/milano/via-roma
            const url = request.nextUrl.clone();
            url.pathname = `/citta/${firstSegment}/${segments[1]}`;
            return NextResponse.redirect(url, { status: 301 });
        }
    }

    // Not a valid city - let Next.js handle it (will show 404)
    return NextResponse.next();
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

