import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Truck, PackageCheck, Wallet } from 'lucide-react'

export const metadata = {
  title: 'قهوي | نظام إدارة الشحنات والتوصيل في السعودية',
  description: 'نظام متكامل لإدارة الشحنات، توزيع المندوبين، متابعة التحصيل COD وتقليل الإرجاع RTO – مصمم خصيصاً للسوق السعودي',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50" dir="rtl">
      {/* Navbar */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              ق
            </div>
            <span className="font-bold text-xl">قهوي</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/المميزات" className="text-gray-700 hover:text-amber-700 transition-colors hidden md:block">
              المميزات
            </Link>
            <Link href="/الأسعار" className="text-gray-700 hover:text-amber-700 transition-colors hidden md:block">
              الأسعار
            </Link>
            <Button asChild variant="outline" size="sm" className="border-amber-600 text-amber-700 hover:bg-amber-50">
              <Link href="/اتصل-بنا">تواصل معنا</Link>
            </Button>
            <Button asChild className="bg-amber-700 hover:bg-amber-800 text-white">
              <Link href="/signin">تسجيل الدخول</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-24 md:pt-32 md:pb-40">
        <div className="container mx-auto px-6 text-center max-w-5xl">
          <div className="inline-block mb-6 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
            متوافق مع ناقل – أرامكس – SMSA – زاجل وغيرها
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            إدارة شحناتك بكفاءة واحترافية
            <br />
            <span className="text-amber-700">في السعودية</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto">
            نظام متكامل لتوزيع الشحنات على المندوبين، متابعة التحصيل COD، تقليل الإرجاع RTO، وإصدار قوائم التوصيل بضغطة زر واحدة.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            {/* ← THE NEW BUTTON YOU WANTED */}
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white text-lg px-10 py-7"
              asChild
            >
              <Link href="/dashboard">
                جرب لوحة التحكم الآن
                <ArrowRight className="mr-2 h-5 w-5" />
              </Link>
            </Button>

            <Button 
              size="lg" 
              variant="outline" 
              className="border-amber-600 text-amber-700 hover:bg-amber-50 text-lg px-10 py-7" 
              asChild
            >
              <Link href="/المميزات">
                تعرف على المميزات
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            مجاني لأول 14 يوم • بدون بطاقة ائتمان • دعم محلي سعودي
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            لماذا تختار قهوي؟
          </h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <FeatureCard
              icon={<Truck className="h-12 w-12 text-amber-700" />}
              title="توزيع ذكي على المندوبين"
              description="قسم الشحنات تلقائياً حسب المنطقة أو الحمولة – وفر وقتك ووقت مندوبيك"
            />

            <FeatureCard
              icon={<Wallet className="h-12 w-12 text-amber-700" />}
              title="متابعة التحصيل COD بسهولة"
              description="سجل المبالغ المحصلة، طرق الدفع، والشحنات المدفوعة – تقارير يومية واضحة"
            />

            <FeatureCard
              icon={<PackageCheck className="h-12 w-12 text-amber-700" />}
              title="تقليل الإرجاع RTO"
              description="حدد أسباب الإرجاع، الشحنات المعلقة، والتأجيل – تحكم كامل في أداء التوصيل"
            />
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            جاهز لتحسين عمليات التوصيل الخاصة بك؟
          </h2>
          <Button 
            size="lg" 
            className="bg-amber-700 hover:bg-amber-800 text-white text-xl px-12 py-8" 
            asChild
          >
            <Link href="/signin">
              سجل الآن وجرب مجاناً 14 يوم
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-700 rounded-xl flex items-center justify-center text-white font-bold">
              ق
            </div>
            <span className="text-xl font-bold text-white">قهوي</span>
          </div>
          <p className="mb-4">© {new Date().getFullYear()} قهوي – جميع الحقوق محفوظة</p>
          <div className="flex justify-center gap-8 text-sm">
            <Link href="/سياسة-الخصوصية" className="hover:text-white">سياسة الخصوصية</Link>
            <Link href="/الشروط" className="hover:text-white">الشروط والأحكام</Link>
            <Link href="/اتصل-بنا" className="hover:text-white">تواصل معنا</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}