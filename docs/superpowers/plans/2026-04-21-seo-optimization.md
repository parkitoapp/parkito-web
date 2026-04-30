# SEO Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement full SEO infrastructure for parkito.app — robots.txt, dynamic sitemap, JSON-LD structured data, OG images, Twitter cards, correct language tag, and ISR for blog pages.

**Architecture:** All changes use Next.js App Router built-ins (`MetadataRoute`, `metadata` export, `revalidate`). A single `JsonLd` component renders `<script type="application/ld+json">` tags with HTML-escaped output. The dynamic sitemap fetches live data from Sanity and Supabase at request time.

**Tech Stack:** Next.js 16 App Router, TypeScript, Sanity (blog CMS), Supabase (parking data), `@sanity/image-url`

---

### Task 1: Create `components/JsonLd.tsx`

**Files:**
- Create: `components/JsonLd.tsx`

- [ ] **Step 1: Create the component**

The component accepts a `data` object, serializes it with `JSON.stringify`, then escapes `<`, `>`, and `&` as unicode sequences (`<`, `>`, `&`) so CMS content containing `</script>` cannot break out of the script tag. It renders a `<script type="application/ld+json">` element using React's inner HTML prop.

```tsx
// components/JsonLd.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
  return (
    <script
      type="application/ld+json"
      // safe: data is always internally constructed, never user input;
      // html special chars are escaped above via unicode sequences
      {...{ dangerouslySetInnerHTML: { __html: json } }}
    />
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/JsonLd.tsx
git commit -m "feat(seo): add JsonLd component for structured data"
```

---

### Task 2: Fix root layout — lang, metadataBase, OG image, Twitter, Organization JSON-LD

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update `app/layout.tsx`**

Add import at the top:
```tsx
import { JsonLd } from "@/components/JsonLd";
```

Replace the existing `metadata` export with:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://parkito.app'),
  title: {
    default: "Parkito",
    template: "%s | Parkito",
  },
  description: "Trova parcheggio sicuro con un click!",
  keywords: [
    "parkito", "parcheggio", "parking", "park sharing",
    "condivisione parcheggio", "app parcheggio", "prenotazione parcheggio",
    "parcheggi sicuri", "parcheggi economici", "parcheggi privati",
    "parcheggi riservati", "gestione parcheggi", "affitto parcheggio",
    "posti auto", "mobilità urbana", "soluzioni parcheggio",
    "risparmio parcheggio", "parcheggio facile", "parcheggio veloce",
    "app mobilità", "parcheggi milano", "parcheggi firenze",
    "parcheggi bologna", "parcheggi centro milano", "parcheggi centro firenze",
    "parcheggi centro bologna", "parcheggi torino", "parcheggi roma",
    "parcheggi napoli"
  ],
  authors: [{ name: 'Parkito Team', url: 'https://parkito.app' }],
  openGraph: {
    title: 'Parkito - Parcheggi in Viaggio',
    description: 'Trova parcheggio sicuro con un click!',
    url: 'https://parkito.app',
    siteName: 'Parkito.app',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/logo.webp', width: 512, height: 512, alt: 'Parkito logo' }],
  },
  twitter: {
    card: 'summary',
    site: '@parkitoapp',
    images: ['/logo.webp'],
  },
};
```

Change `<html lang="en"` → `<html lang="it"` in the `RootLayout` return.

Add a schema constant above the return statement and render it inside `<body>` right after `<Tracking />`:

```tsx
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Parkito',
  alternateName: 'Parkito - Parcheggi in Viaggio',
  description: 'Il primo servizio di Park Sharing in Italia. Prenota parcheggi privati verificati nelle principali città italiane.',
  url: 'https://parkito.app',
  logo: 'https://parkito.app/logo.webp',
  foundingLocation: 'Italia',
}
```

Inside `<body>`, after `<Tracking />`, add: `<JsonLd data={organizationSchema} />`

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`
Open http://localhost:3000 and view page source. Confirm:
- `<html lang="it">`
- `<meta property="og:image"` with value containing `logo.webp`
- `<meta name="twitter:card" content="summary" />`
- `<script type="application/ld+json">` containing `"@type":"Organization"`

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(seo): fix lang tag, add metadataBase, OG image, Twitter cards, Organization schema"
```

---

### Task 3: Add metadata to `/servizi`

**Files:**
- Modify: `app/(site)/servizi/page.tsx`

- [ ] **Step 1: Add the import and metadata export**

Add at the top of `app/(site)/servizi/page.tsx`, before the `export default function page()`:

```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'I nostri servizi',
  description: 'Scopri i servizi di Parkito: parcheggi privati verificati, navette shuttle e automazione degli accessi nelle principali città italiane.',
};
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add app/(site)/servizi/page.tsx
git commit -m "feat(seo): add metadata to /servizi page"
```

---

### Task 4: Create `app/robots.ts`

**Files:**
- Create: `app/robots.ts`

- [ ] **Step 1: Create the file**

```ts
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/login', '/api/', '/admin/studio/'],
    },
    sitemap: 'https://parkito.app/sitemap.xml',
  }
}
```

- [ ] **Step 2: Verify in dev**

Run: `npm run dev`
Visit: http://localhost:3000/robots.txt
Expected output:
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /login
Disallow: /api/
Disallow: /admin/studio/

Sitemap: https://parkito.app/sitemap.xml
```

- [ ] **Step 3: Commit**

```bash
git add app/robots.ts
git commit -m "feat(seo): add dynamic robots.txt"
```

---

### Task 5: Add `_updatedAt` to `BlogPost` type and `getPost` query

**Files:**
- Modify: `types.d.ts`
- Modify: `lib/fetchPosts.ts`

- [ ] **Step 1: Add `_updatedAt` to `BlogPost` in `types.d.ts`**

Find the `BlogPost` type and add `_updatedAt` after `_id`:

```ts
export type BlogPost = {
  _id: string;
  _updatedAt: string;
  title: string;
  metatitle: string;
  metadescription: string;
  slug: { current: string };
  publishedAt: string;
  coverImage: SanityImage;
  author: {
    name: string;
    role: string;
    image: SanityImage;
  };
  tags: string[];
  recap: Block[];
  coverAlt: string;
  intro: Block[];
  content: ContentSection[];
};
```

- [ ] **Step 2: Add `_updatedAt` to the `getPost` GROQ query in `lib/fetchPosts.ts`**

In the `getPost` function, add `_updatedAt,` to the GROQ projection right after `_id,`:

```
*[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    _updatedAt,
    title,
    slug,
    ...
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add types.d.ts lib/fetchPosts.ts
git commit -m "feat(seo): add _updatedAt to BlogPost type and getPost query"
```

---

### Task 6: Create `app/sitemap.ts`

**Files:**
- Create: `app/sitemap.ts`

- [ ] **Step 1: Create the file**

```ts
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'
import { getCities, getAllParkings } from '@/lib/parking'

const BASE = 'https://parkito.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: 'weekly', lastModified: now },
    { url: `${BASE}/blog`, priority: 0.8, changeFrequency: 'daily', lastModified: now },
    { url: `${BASE}/chi-siamo`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE}/citta`, priority: 0.8, changeFrequency: 'weekly', lastModified: now },
    { url: `${BASE}/servizi`, priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE}/devices`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE}/diventare-host`, priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { url: `${BASE}/privacy-policy`, priority: 0.3, changeFrequency: 'yearly', lastModified: now },
    { url: `${BASE}/terminiecondizioni`, priority: 0.3, changeFrequency: 'yearly', lastModified: now },
  ]

  const posts = await client.fetch<{ slug: string; _updatedAt: string }[]>(
    `*[_type == "blogPost"]{ "slug": slug.current, _updatedAt }`,
    {},
    { next: { revalidate: 3600 } }
  )
  const blogPages: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    priority: 0.6,
    changeFrequency: 'weekly',
    lastModified: new Date(post._updatedAt),
  }))

  const cities = await getCities()
  const cityPages: MetadataRoute.Sitemap = cities.map(city => ({
    url: `${BASE}${city.url}`,
    priority: 0.7,
    changeFrequency: 'weekly',
    lastModified: now,
  }))

  const parkings = await getAllParkings()
  const parkingPages: MetadataRoute.Sitemap = parkings.map(p => ({
    url: `${BASE}/citta/${p.slug}/${p.address}`,
    priority: 0.6,
    changeFrequency: 'weekly',
    lastModified: now,
  }))

  return [...staticPages, ...blogPages, ...cityPages, ...parkingPages]
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Verify in dev**

Run: `npm run dev`
Visit: http://localhost:3000/sitemap.xml
Expected: valid XML with `<urlset>` containing entries for `/`, `/blog`, dynamic blog slugs, city slugs, and parking detail pages.

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat(seo): add dynamic sitemap with Sanity and Supabase data"
```

---

### Task 7: Add LocalBusiness JSON-LD to homepage

**Files:**
- Modify: `app/(site)/page.tsx`

- [ ] **Step 1: Add import to `app/(site)/page.tsx`**

```tsx
import { JsonLd } from "@/components/JsonLd";
```

- [ ] **Step 2: Add schema**

Define the schema constant inside the `Home` function, above the return:

```tsx
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ParkingFacility',
  name: 'Parkito - Parcheggi in Viaggio',
  description: 'Il primo servizio di Park Sharing in Italia. Prenota parcheggi privati verificati nelle principali città italiane.',
  url: 'https://parkito.app',
  logo: 'https://parkito.app/logo.webp',
  image: 'https://parkito.app/logo.webp',
  areaServed: ['Milano', 'Firenze', 'Bologna', 'Torino', 'Roma', 'Napoli'],
  serviceType: 'Park Sharing',
  priceRange: '€',
}
```

Add `<JsonLd data={localBusinessSchema} />` as the first element inside the returned `<>` fragment.

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Verify in dev**

Run: `npm run dev`
Open http://localhost:3000, view page source.
Confirm a `<script type="application/ld+json">` block with `"@type":"ParkingFacility"`.

- [ ] **Step 5: Commit**

```bash
git add app/(site)/page.tsx
git commit -m "feat(seo): add LocalBusiness JSON-LD to homepage"
```

---

### Task 8: Add Article JSON-LD to blog post pages

**Files:**
- Modify: `app/(site)/blog/[slug]/page.tsx`

- [ ] **Step 1: Add import**

```tsx
import { JsonLd } from "@/components/JsonLd";
```

- [ ] **Step 2: Add schema inside `BlogPostPage`**

After `const post = await getPost(slug)` and after the null check, add:

```tsx
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.metatitle,
  description: post.metadescription,
  image: urlFor(post.coverImage),
  datePublished: post.publishedAt,
  dateModified: post._updatedAt,
  author: {
    '@type': 'Person',
    name: post.author?.name ?? 'Parkito Team',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Parkito',
    logo: {
      '@type': 'ImageObject',
      url: 'https://parkito.app/logo.webp',
    },
  },
}
```

Add `<JsonLd data={articleSchema} />` as the first element inside the returned `<>` fragment, before the `<div className="mx-auto py-32 ...">`.

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Verify in dev**

Run: `npm run dev`
Open any blog post (e.g., http://localhost:3000/blog), click a post, view source.
Confirm `<script type="application/ld+json">` with `"@type":"Article"`, correct `headline`, and `datePublished`.

- [ ] **Step 5: Commit**

```bash
git add app/(site)/blog/[slug]/page.tsx
git commit -m "feat(seo): add Article JSON-LD to blog post pages"
```

---

### Task 9: Add BreadcrumbList JSON-LD to city pages

**Files:**
- Modify: `app/(site)/citta/[slug]/page.tsx`

- [ ] **Step 1: Add import**

```tsx
import { JsonLd } from "@/components/JsonLd";
```

- [ ] **Step 2: Add schema inside `CityPage`**

After `const citySlug = await params`, add:

```tsx
const cityName = titleizeSlug(citySlug.slug)
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://parkito.app' },
    { '@type': 'ListItem', position: 2, name: 'Città', item: 'https://parkito.app/citta' },
    { '@type': 'ListItem', position: 3, name: cityName, item: `https://parkito.app/citta/${citySlug.slug}` },
  ],
}
```

Add `<JsonLd data={breadcrumbSchema} />` as the first child inside the returned `<div>`.

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Verify in dev**

Run: `npm run dev`
Open any city page, view source.
Confirm `<script type="application/ld+json">` with `"@type":"BreadcrumbList"` and 3 `ListItem` entries.

- [ ] **Step 5: Commit**

```bash
git add app/(site)/citta/[slug]/page.tsx
git commit -m "feat(seo): add BreadcrumbList JSON-LD to city pages"
```

---

### Task 10: Add BreadcrumbList JSON-LD to parking detail pages

**Files:**
- Modify: `app/(site)/citta/[slug]/[address]/page.tsx`

- [ ] **Step 1: Add import**

```tsx
import { JsonLd } from "@/components/JsonLd";
```

- [ ] **Step 2: Add schema inside `ParkingDetailPage`**

Add a local helper above the component (or inside the module scope):

```tsx
function titleizeSlug(s: string) {
  return s.split('-').map(w => w ? w[0].toUpperCase() + w.slice(1) : '').join(' ')
}
```

Inside `ParkingDetailPage`, after `const parking = await getParking(slug, address)`, add:

```tsx
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://parkito.app' },
    { '@type': 'ListItem', position: 2, name: 'Città', item: 'https://parkito.app/citta' },
    { '@type': 'ListItem', position: 3, name: titleizeSlug(slug), item: `https://parkito.app/citta/${slug}` },
    { '@type': 'ListItem', position: 4, name: parking?.name ?? titleizeSlug(address), item: `https://parkito.app/citta/${slug}/${address}` },
  ],
}
```

Change the return statement from:
```tsx
return <ParkingDetail citySlug={slug} parking={parking} imageUrl={imageUrl} />;
```
to:
```tsx
return (
  <>
    <JsonLd data={breadcrumbSchema} />
    <ParkingDetail citySlug={slug} parking={parking} imageUrl={imageUrl} />
  </>
)
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Verify in dev**

Run: `npm run dev`
Open any parking detail page, view source.
Confirm `<script type="application/ld+json">` with `"@type":"BreadcrumbList"` and 4 `ListItem` entries.

- [ ] **Step 5: Commit**

```bash
git add app/(site)/citta/[slug]/[address]/page.tsx
git commit -m "feat(seo): add BreadcrumbList JSON-LD to parking detail pages"
```

---

### Task 11: Switch blog pages from force-dynamic to ISR

**Files:**
- Modify: `app/(site)/blog/page.tsx`
- Modify: `app/(site)/blog/[slug]/page.tsx`
- Modify: `lib/fetchPosts.ts`

- [ ] **Step 1: Update `app/(site)/blog/page.tsx`**

Remove:
```ts
// Force dynamic rendering to avoid caching issues with deleted posts
export const dynamic = 'force-dynamic';
export const revalidate = 0;
```

Add:
```ts
export const revalidate = 3600;
```

- [ ] **Step 2: Update `app/(site)/blog/[slug]/page.tsx`**

Remove:
```ts
export const dynamic = "force-dynamic";
```

Add:
```ts
export const revalidate = 3600;
```

- [ ] **Step 3: Update `lib/fetchPosts.ts`**

In `getPosts()`, `getPost()`, and `checkPostExists()`, change all three instances of:
```ts
{ next: { revalidate: 0 } }
```
to:
```ts
{ next: { revalidate: 3600 } }
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: build completes without errors. Blog routes should no longer appear as `(dynamic)` / `force-dynamic` in the build output.

- [ ] **Step 6: Commit**

```bash
git add app/(site)/blog/page.tsx app/(site)/blog/[slug]/page.tsx lib/fetchPosts.ts
git commit -m "feat(seo): switch blog pages from force-dynamic to 1h ISR"
```

---

## Final Verification

After all tasks are complete, run `npm run build && npm run start` and verify:

- [ ] `curl http://localhost:3000/robots.txt` returns disallow rules for `/admin`, `/login`, `/api/`, `/admin/studio/` and the sitemap URL
- [ ] `curl http://localhost:3000/sitemap.xml` returns valid XML with all static pages, blog posts, city pages, and parking detail pages
- [ ] http://localhost:3000 page source contains `<html lang="it">`, `og:image` with `logo.webp`, `twitter:card`, Organization JSON-LD, and LocalBusiness JSON-LD
- [ ] Any blog post page source contains Article JSON-LD with correct `headline` and `datePublished`
- [ ] Any city page source contains BreadcrumbList JSON-LD with 3 items
- [ ] Any parking detail page source contains BreadcrumbList JSON-LD with 4 items
- [ ] Build output shows blog pages as ISR (not force-dynamic)
