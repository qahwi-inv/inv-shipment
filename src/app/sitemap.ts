// src/app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://qahwi.com'
  const now = new Date().toISOString()

  return [
    {
      url: base + '/',                    // ← your public home page (src/app/page.tsx)
      lastModified: now,
      changeFrequency: 'daily',           // home page → daily is fine for SaaS
      priority: 1.0,
    },
    // When you create these pages later, just add them here:
    // {
    //   url: base + '/المميزات',
    //   lastModified: now,
    //   changeFrequency: 'weekly',
    //   priority: 0.9,
    // },
    // ... pricing, blog, contact, etc.
  ]
}