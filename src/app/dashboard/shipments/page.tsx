'use client'

import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import MobileShipmentList from '@/components/MobileShipmentList'
import StatusBadge from '@/components/StatusBadge'

export const dynamic = 'force-dynamic';

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadShipments = async () => {
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200)

      if (error) {
        setError('حدث خطأ في جلب البيانات')
        return
      }

      setShipments(data ?? [])
    }

    loadShipments()
  }, [])

  if (error) {
    return <div className="p-8 text-red-600 text-center">{error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">جميع الشحنات</h1>
          <Link
            href="/dashboard/shipments/import"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition w-full sm:w-auto text-center"
          >
            + استيراد قائمة NCL جديدة
          </Link>
        </div>

        {shipments.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-10 text-center">
            <p className="text-lg text-yellow-800">
              لا توجد شحنات بعد<br />
              ابدأ باستيراد قائمة من NCL
            </p>
          </div>
        ) : (
          <MobileShipmentList shipments={shipments} />
        )}
      </div>
    </div>
  )
}
