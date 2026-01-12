import StatusBadge from '@/components/StatusBadge'

type Shipment = {
  id: string
  waybill: string
  receiver_name: string | null
  city: string | null
  cod_amount: number | null
  status: string
  created_at: string
}

export default function MobileShipmentList({ shipments }: { shipments: Shipment[] }) {
  return (
    <div className="space-y-4">
      {shipments.map((shipment) => (
        <div
          key={shipment.id}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-blue-300 transition"
        >
          <div className="font-bold text-lg mb-2">{shipment.waybill}</div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div>
              <div className="text-gray-500 text-xs">العميل</div>
              <div>{shipment.receiver_name || '—'}</div>
            </div>
            
            <div>
              <div className="text-gray-500 text-xs">المدينة</div>
              <div>{shipment.city || '—'}</div>
            </div>

            <div>
              <div className="text-gray-500 text-xs">المبلغ</div>
              <div className="font-medium">
                {shipment.cod_amount ? shipment.cod_amount.toLocaleString() : '—'}
              </div>
            </div>

            <div>
              <div className="text-gray-500 text-xs">الحالة</div>
              <StatusBadge status={shipment.status} />
            </div>

            <div className="col-span-2">
              <div className="text-gray-500 text-xs">تاريخ الإضافة</div>
              <div className="text-gray-700">
                {new Date(shipment.created_at).toLocaleString('ar-SA', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}