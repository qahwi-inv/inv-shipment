import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">
          نظام إدارة الشحنات - نسخة تجريبية
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/dashboard/shipments"
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-8 text-center border border-gray-200"
          >
            <h2 className="text-2xl font-semibold mb-3">الشحنات</h2>
            <p className="text-gray-600">استيراد وعرض شحنات NCL</p>
          </Link>

          <div className="bg-white rounded-xl shadow p-8 text-center border border-gray-200 opacity-50 cursor-not-allowed">
            <h2 className="text-2xl font-semibold mb-3 text-gray-400">قوائم التوصيل</h2>
            <p className="text-gray-400">قريباً</p>
          </div>

          <div className="bg-white rounded-xl shadow p-8 text-center border border-gray-200 opacity-50 cursor-not-allowed">
            <h2 className="text-2xl font-semibold mb-3 text-gray-400">الشحنات المعلقة</h2>
            <p className="text-gray-400">قريباً</p>
          </div>
        </div>
      </div>
    </div>
  )
}