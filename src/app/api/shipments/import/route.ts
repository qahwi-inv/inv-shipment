import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { nclNumber, rows } = await request.json()

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'يجب تسجيل الدخول أو بدء تجربة' }, { status: 401 })
    }

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'لا توجد بيانات للاستيراد' }, { status: 400 })
    }

    const records = rows
      .map(row => ({
        waybill: (row[0] || '').trim(),
        receiver_name: (row[1] || '').trim() || null,
        receiver_phone: (row[2] || '').trim() || null,
        city: (row[3] || '').trim() || null,
        address: (row[4] || '').trim() || null,
        cod_amount: Number((row[5] || '0').replace(/[^0-9.]/g, '')) || 0,
        ncl_number: nclNumber,
        status: 'new' as const,
        user_id: user.id  // ← THIS LINE WAS MISSING → ADD IT HERE
      }))
      .filter(r => r.waybill !== '')

    if (records.length === 0) {
      return NextResponse.json({ error: 'لا توجد أرقام شحنات صالحة' }, { status: 400 })
    }

    const { error } = await supabase.from('shipments').insert(records)

    if (error) throw error

    return NextResponse.json({ count: records.length })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { error: error.message || 'حدث خطأ أثناء الاستيراد' },
      { status: 500 }
    )
  }
}