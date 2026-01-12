export default function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: 'bg-blue-100 text-blue-800',
    assigned: 'bg-indigo-100 text-indigo-800',
    out_for_delivery: 'bg-amber-100 text-amber-800',
    delivered: 'bg-green-100 text-green-800',
    rto: 'bg-red-100 text-red-800',
    postponed: 'bg-purple-100 text-purple-800',
    default: 'bg-gray-100 text-gray-700',
  }

  const labels: Record<string, string> = {
    new: 'جديدة',
    assigned: 'مسندة',
    out_for_delivery: 'في التوصيل',
    delivered: 'تم التسليم',
    rto: 'إرجاع',
    postponed: 'مؤجلة',
    default: status,
  }

  const style = styles[status] || styles.default
  const label = labels[status] || labels.default

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${style}`}>
      {label}
    </span>
  )
}