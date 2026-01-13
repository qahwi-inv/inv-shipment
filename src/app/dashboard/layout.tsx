import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'لوحة التحكم',
  robots: {
    index: false,           // ← very important! Prevent indexing of dashboard
    follow: false,
  },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* sidebar, navbar... */}
      <main>{children}</main>
    </div>
  )
}