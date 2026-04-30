import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'
import { getCities, getAllParkings } from '@/lib/parking'

export const revalidate = 3600

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

  const [posts, cities, parkings] = await Promise.all([
    client.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
      {},
      { next: { revalidate: 3600 } }
    ).catch((): { slug: string; _updatedAt: string }[] => []),
    getCities().catch((): Awaited<ReturnType<typeof getCities>> => []),
    getAllParkings().catch((): Awaited<ReturnType<typeof getAllParkings>> => []),
  ])

  const blogPages: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    priority: 0.6,
    changeFrequency: 'weekly',
    lastModified: new Date(post._updatedAt),
  }))

  const cityPages: MetadataRoute.Sitemap = cities.map(city => ({
    url: `${BASE}${city.url}`,
    priority: 0.7,
    changeFrequency: 'weekly',
    lastModified: now,
  }))

  const parkingPages: MetadataRoute.Sitemap = parkings.map(p => ({
    url: `${BASE}/citta/${p.slug}/${p.address}`,
    priority: 0.6,
    changeFrequency: 'weekly',
    lastModified: now,
  }))

  return [...staticPages, ...blogPages, ...cityPages, ...parkingPages]
}
