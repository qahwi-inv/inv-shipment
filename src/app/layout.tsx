// 1. Root layout - app/layout.tsx
// This is the MOST important file for global SEO

import type { Metadata, Viewport } from 'next'
import { Noto_Sans_Arabic } from 'next/font/google'
import './globals.css'

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-arabic',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://Qahwi.com'),
  
  title: {
    default: 'COD قهوي |إدارة وتصفية تحصيلات الدفع عند الاستلام | نظام ادراة الشحنات والتحصيل',
    
    template: ' قهوي | نظام متكامل لإدارة الشحنات'
  },
  
  description: 'نظام احترافي لإدارة الشحنات، توزيع المندوبين، متابعة التحصيل وادارة المبيعات COD، تقليل الإرجاع RTO، متوافق مع ناقل وشركات الشحن السعودية ',
  
  keywords: [
    'إدارة وتصفية تحصيلات الدفع عند الاستلام', 'مطابقة مبالغ الدفع عند الاستلام','تسوية مبالغ الدفع عند الاستلام',
    'برنامج شحنات', 'إدارة توصيل', 'نظام COD', 'تحصيل كاش عند الاستلام',
    'إدارة مندوبين توصيل', 'برنامج لوجستيات السعودية', 'RTO', 'Naqel', 'ادارة مبيعات'
  ],
  
  authors: [{ name: 'Qahwi', url: 'https://Qahwi.com' }],
  
  openGraph: {
    title: 'COD قهوي - لإدارة الشحنات والمبيعات والتحصيل',
    description: 'حل متكامل لمتابعة الشحنات، توزيع المندوبين وتحصيل المدفوعات',
    url: 'https://qahwi.com',
    siteName: 'قهوي',
    images: [
      {
        url: '/og-image-1200x630-ar.png',
        width: 1200,
        height: 630,
        alt: 'قهوي - برنامج إدارة الشحنات والمبيعات',
      },
    ],
    locale: 'ar_SA',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'COD قهوي | برنامج إدارة الشحنات والمبيعات والتحصيل',
    description: 'نظام متكامل لإدارة التوصيل والتحصيل في السعودية',
    images: ['/og-image-1200x630-ar.png'],
  },
  
  alternates: {
    canonical: '/',
    languages: {
      'ar-SA': '/',
      'en-SA': '/en',
      // add more languages later
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={notoArabic.variable}>
      <head>
        {/* Important for Arabic SEO */}
        <meta name="language" content="ar" />
        <meta httpEquiv="content-language" content="ar-SA" />
        
        {/* Favicon & PWA */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-gray-50 antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}