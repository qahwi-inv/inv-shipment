'use client'

import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import MobileShipmentList from '@/components/MobileShipmentList'

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200)

      if (!error) setShipments(data ?? [])
      setLoading(false)
    }

    load()
  }, [])

  if (loading) {
    return <div className="p-8 text-center">جاري التحميل...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mb-8">
          <h1 className="text-2xl font-bold">جميع الشحنات</h1>
          <Link href="/dashboard/shipments/import" className="btn-primary">
            + استيراد
          </Link>
        </div>

        {shipments.length === 0 ? (
          <div className="bg-yellow-50 p-10 text-center">
            لا توجد شحنات بعد
          </div>
        ) : (
          <MobileShipmentList shipments={shipments} />
        )}
      </div>
    </div>
  )
}
