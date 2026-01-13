// src/app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',                           // allow public root & everything not disallowed
        disallow: [
          '/dashboard',                       // ← block now, even if page doesn't exist yet
          '/dashboard/',                      // covers all subpaths like /dashboard/shipments/...
          '/api/',                            // typical for API routes
          '/signin',                          // common auth paths
          '/signup',
          '/profile',
          '/admin',                           // just in case
          '/private',
          // Add more later as you build
        ],
      },
    ],
    sitemap: 'https://qahwi.com/sitemap.xml',
  }
}