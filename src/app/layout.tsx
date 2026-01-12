import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "NCL Delivery Demo",
  description: "Simple shipment management prototype",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-50 antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}