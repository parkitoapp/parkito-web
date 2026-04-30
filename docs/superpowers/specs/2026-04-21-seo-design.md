# SEO Optimization — Design Spec
Date: 2026-04-21
Approach: Next.js native (App Router built-ins, no new dependencies)

---

## Context

Parkito is an Italian Park Sharing platform (https://parkito.app). The site is built with Next.js App Router, uses Sanity as CMS for blog/content and Supabase for parking data. It targets Italian users searching for parking in cities like Milano, Firenze, Roma, etc.

Payoff: **Parkito - Parcheggi in Viaggio**

---

## Section 1: Foundational Fixes

### 1.1 Language Tag
- **File**: `app/layout.tsx`
- **Change**: `<html lang="en">` → `<html lang="it">`
- **Why**: The entire site is in Italian. Wrong language tag hurts search ranking in Italian results and confuses screen readers.

### 1.2 metadataBase
- **File**: `app/layout.tsx`
- **Change**: Add `metadataBase: new URL('https://parkito.app')` to the root `metadata` export.
- **Why**: Without this, relative URLs in OG/Twitter image tags don't resolve to absolute URLs, breaking social previews.

### 1.3 Open Graph Image
- **File**: `app/layout.tsx`
- **Change**: Add to root `metadata`:
  ```ts
  openGraph: {
    images: [{ url: '/logo.webp', width: 512, height: 512, alt: 'Parkito logo' }],
    locale: 'it_IT',
    type: 'website',
  }
  ```
- **Why**: Without `og:image`, link shares on WhatsApp/LinkedIn/X show no preview image.

### 1.4 Twitter Cards
- **File**: `app/layout.tsx`
- **Change**: Add to root `metadata`:
  ```ts
  twitter: {
    card: 'summary',
    site: '@parkitoapp',
    images: ['/logo.webp'],
  }
  ```

### 1.5 Missing Page Metadata — /servizi
- **File**: `app/(site)/servizi/page.tsx`
- **Change**: Add a `metadata` export:
  ```ts
  export const metadata: Metadata = {
    title: 'I nostri servizi',
    description: 'Scopri i servizi di Parkito: parcheggi privati verificati, shuttle e automazione degli accessi nelle principali città italiane.',
  }
  ```

---

## Section 2: Robots & Sitemap

### 2.1 robots.ts
- **File**: `app/robots.ts` (new file)
- **Output**: `/robots.txt` served dynamically
- **Rules**:
  - `User-agent: *` → `Allow: /`
  - `Disallow: /admin`, `/login`, `/api`, `/admin/studio`
  - `Sitemap: https://parkito.app/sitemap.xml`

### 2.2 sitemap.ts
- **File**: `app/sitemap.ts` (new file)
- **Output**: `/sitemap.xml` served dynamically
- **Static URLs** (priority, changeFrequency):
  | URL | Priority | changeFrequency |
  |-----|----------|-----------------|
  | `/` | 1.0 | weekly |
  | `/blog` | 0.8 | daily |
  | `/chi-siamo` | 0.7 | monthly |
  | `/citta` | 0.8 | weekly |
  | `/servizi` | 0.8 | monthly |
  | `/devices` | 0.7 | monthly |
  | `/diventare-host` | 0.8 | monthly |
  | `/privacy-policy` | 0.3 | yearly |
  | `/terminiecondizioni` | 0.3 | yearly |

- **Dynamic URLs** (fetched at request time):
  - Blog posts from Sanity: `/blog/[slug]` — priority 0.6, changeFrequency weekly, `lastModified` from post `_updatedAt`
  - Cities from Sanity: `/citta/[slug]` — priority 0.7, changeFrequency weekly
  - Parking details from Supabase: `/citta/[slug]/[address]` — priority 0.6, changeFrequency weekly

- **Excluded**: `/login`, `/admin`, `/thank-you`, `/api/*`

---

## Section 3: JSON-LD Structured Data

All schemas use a `JsonLd` React component that renders a `<script type="application/ld+json">` tag. The data is always internally constructed server-side (never user input), so `JSON.stringify` serialization is safe — no XSS risk.

### 3.1 JsonLd Component
- **File**: `components/JsonLd.tsx` (new file)
- Data is typed as `Record<string, unknown>` and serialized with `JSON.stringify`, which escapes all special characters.

### 3.2 Organization Schema — Root Layout
- **File**: `app/layout.tsx`
- **Schema**:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Parkito",
    "alternateName": "Parkito - Parcheggi in Viaggio",
    "description": "Il primo servizio di Park Sharing in Italia. Prenota parcheggi privati verificati nelle principali città italiane.",
    "url": "https://parkito.app",
    "logo": "https://parkito.app/logo.webp",
    "foundingLocation": "Italia"
  }
  ```

### 3.3 LocalBusiness Schema — Homepage
- **File**: `app/(site)/page.tsx`
- **Schema type**: `ParkingFacility` (subtype of `LocalBusiness`)
- **Fields**: name, description, url, logo, areaServed (list of Italian cities), serviceType
- **Why**: Triggers local rich results for queries like "parcheggio Milano"

### 3.4 Article Schema — Blog Posts
- **File**: `app/(site)/blog/[slug]/page.tsx`
- **Fields**: headline (post title), description (metadescription), datePublished, dateModified, author, image (cover), publisher (Parkito Organization)
- **Why**: Enables Article rich results in Google Search, improves CTR from search

### 3.5 BreadcrumbList Schema — City & Parking Pages
- **Files**: `app/(site)/citta/[slug]/page.tsx`, `app/(site)/citta/[slug]/[address]/page.tsx`
- **Why**: Deep URL hierarchy benefits from breadcrumb rich results; shows path in SERP snippet
- **Example for `/citta/milano/via-roma-5`**:
  ```
  Home > Città > Milano > Via Roma 5
  ```

---

## Section 4: Blog Rendering Strategy

### 4.1 Change from force-dynamic to ISR
- **Files**: `app/(site)/blog/page.tsx`, `app/(site)/blog/[slug]/page.tsx`
- **Change**: Remove `export const dynamic = 'force-dynamic'` and `revalidate = 0`. Replace with:
  ```ts
  export const revalidate = 3600 // 1 hour ISR
  ```
- **Why**: Static serving with background regeneration gives Googlebot fast, cacheable responses. Crawl budget is used more efficiently. Content stays fresh within 1 hour.
- **Future option**: Sanity webhook → `revalidatePath('/blog')` for on-demand revalidation on publish (out of scope for this spec).

---

## Out of Scope

- Security headers in `next.config.ts` (separate concern)
- Sanity on-demand revalidation webhook
- Multi-language / `hreflang` support
- noindex on admin routes (already protected by server-side auth)
- Custom 404 page metadata

---

## Success Criteria

After implementation, Google Search Console should show:
1. All public pages discovered via sitemap
2. No "page not indexed" errors for key routes
3. Rich results detected for blog articles and city/parking pages
4. No mobile usability issues
5. Core Web Vitals green (already good, ISR change helps further)
