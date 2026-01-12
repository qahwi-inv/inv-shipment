// app/dashboard/shipments/import/page.tsx
'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

type ShipmentRow = {
  waybill: string
  receiver_name: string
  receiver_phone: string
  city: string
  address: string
  cod_amount: string  // keep as string during editing
}

const defaultRow: ShipmentRow = {
  waybill: '',
  receiver_name: '',
  receiver_phone: '',
  city: '',
  address: '',
  cod_amount: '0',
}

export default function ImportShipmentsPage() {
  const [rows, setRows] = useState<ShipmentRow[]>([{ ...defaultRow }])
  const [nclNumber, setNclNumber] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Add new empty row
  const addRow = () => {
    setRows([...rows, { ...defaultRow }])
  }

  // Remove row
  const removeRow = (index: number) => {
    if (rows.length === 1) return
    setRows(rows.filter((_, i) => i !== index))
  }

  // Update cell value
  const updateCell = (index: number, field: keyof ShipmentRow, value: string) => {
    const newRows = [...rows]
    newRows[index] = { ...newRows[index], [field]: value }
    setRows(newRows)
  }

  // Paste from clipboard (Excel style)
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('Text')
    if (!pasteData) return

    const lines = pasteData.split(/\r?\n/).filter(line => line.trim())
    const newRows = lines.map(line => {
      const cells = line.split('\t')
      return {
        waybill: cells[0]?.trim() || '',
        receiver_name: cells[1]?.trim() || '',
        receiver_phone: cells[2]?.trim() || '',
        city: cells[3]?.trim() || '',
        address: cells[4]?.trim() || '',
        cod_amount: cells[5]?.trim() || '0',
      }
    })

    setRows(newRows.length > 0 ? newRows : [{ ...defaultRow }])
  }

  const handleImport = async () => {
    const validRows = rows.filter(r => r.waybill.trim() !== '')

    if (validRows.length === 0) {
      setMessage('لا توجد شحنات صالحة للاستيراد')
      setStatus('error')
      return
    }

    setStatus('loading')
    setMessage('جاري الاستيراد...')

    try {
      const res = await fetch('/api/shipments/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nclNumber: nclNumber.trim() || 'غير محدد',
          rows: validRows.map(r => [
            r.waybill,
            r.receiver_name,
            r.receiver_phone,
            r.city,
            r.address,
            r.cod_amount,
          ]),
        }),
      })

      const result = await res.json()

      if (!res.ok) throw new Error(result.error || 'فشل الاستيراد')

      setStatus('success')
      setMessage(`تم استيراد ${result.count || validRows.length} شحنة بنجاح`)
      
      setTimeout(() => {
        router.push('/dashboard/shipments')
      }, 1800)
    } catch (err: any) {
      setStatus('error')
      setMessage(err.message || 'حدث خطأ أثناء الاستيراد')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
<div className="max-w-6xl mx-auto mb-6 flex items-center gap-4 flex-row-reverse justify-between">
  <button
    onClick={() => router.back()}
    className="
      flex items-center justify-center 
      w-10 h-10 
      bg-black 
      rounded-full 
      hover:bg-gray-800 
      transition-colors
    "
    aria-label="العودة"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-6 w-6 text-white" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M15 19l-7-7 7-7"   // ← this arrow points left (correct for back in RTL)
      />
    </svg>
  </button>

  <h1 className="text-2xl sm:text-3xl font-bold">
    استيراد قائمة شحنات NCL
  </h1>
</div>
        <div className="mb-6 bg-white p-5 rounded-lg shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            رقم قائمة NCL (اختياري)
          </label>
          <input
            type="text"
            value={nclNumber}
            onChange={e => setNclNumber(e.target.value)}
            placeholder="مثال: NCL-2026-01234"
            className="w-full sm:w-96 border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="text-sm text-gray-600">
            الصق من Excel أو أدخل الشحنات يدوياً
          </div>
          <div className="flex gap-3">
            <button
              onClick={addRow}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              + إضافة سطر
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
            >
              استيراد من ملف (قريباً)
            </button>
            <input type="file" ref={fileInputRef} className="hidden" />
          </div>
        </div>

        <div 
          className="bg-white rounded-lg shadow overflow-hidden border border-gray-200"
          onPaste={handlePaste}
          tabIndex={0}
        >
          <div className="overflow-x-auto">
            <div className="overflow-x-auto">
  <table className="min-w-[1000px] divide-y divide-gray-200">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 w-56">
          رقم الشحنة *
        </th>
        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 w-48">
          اسم المستلم
        </th>
        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 w-40">
          رقم الجوال
        </th>
        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 w-48">
          المدينة
        </th>
        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 w-72">
          العنوان
        </th>
        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 w-32">
          المبلغ
        </th>
        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 w-20">
          حذف
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {rows.map((row, index) => (
        <tr key={index} className="hover:bg-gray-50">
          <td className="px-4 py-2">
            <input
              value={row.waybill}
              onChange={e => updateCell(index, 'waybill', e.target.value)}
              placeholder="مطلوب"
              className="w-full border rounded px-2 py-1 focus:border-blue-500 focus:outline-none"
            />
          </td>
          <td className="px-4 py-2">
            <input
              value={row.receiver_name}
              onChange={e => updateCell(index, 'receiver_name', e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </td>
          <td className="px-4 py-2">
            <input
              value={row.receiver_phone}
              onChange={e => updateCell(index, 'receiver_phone', e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </td>
          <td className="px-4 py-2">
            <input
              value={row.city}
              onChange={e => updateCell(index, 'city', e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </td>
          <td className="px-4 py-2">
            <input
              value={row.address}
              onChange={e => updateCell(index, 'address', e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </td>
          <td className="px-4 py-2">
            <input
              type="text"
              value={row.cod_amount}
              onChange={e => updateCell(index, 'cod_amount', e.target.value)}
              className="w-full border rounded px-2 py-1 text-right"
            />
          </td>
          <td className="px-4 py-2 text-center">
            <button
              onClick={() => removeRow(index)}
              className="text-red-600 hover:text-red-800 text-sm"
              disabled={rows.length === 1}
            >
              ×
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleImport}
            disabled={status === 'loading'}
            className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium"
          >
            {status === 'loading' ? 'جاري الاستيراد...' : 'استيراد جميع الشحنات'}
          </button>
          
          <button
            onClick={() => router.back()}
            className="flex-1 bg-gray-300 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-400 font-medium"
          >
            إلغاء
          </button>
        </div>

        {message && (
          <div className={`mt-6 p-4 rounded-lg text-center ${
            status === 'success' ? 'bg-green-100 text-green-800' : 
            status === 'error' ? 'bg-red-100 text-red-800' : 
            'bg-blue-100 text-blue-800'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}