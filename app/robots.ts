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
