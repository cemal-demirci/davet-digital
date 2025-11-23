import { Link } from 'react-router-dom'
import { Check, Heart, Crown, Sparkles, Zap } from 'lucide-react'
import SEO from '../components/SEO'
import MarketingNavbar from '../components/MarketingNavbar'
import MarketingFooter from '../components/MarketingFooter'

const Pricing = () => {
  const plans = [
    {
      name: 'Temel',
      price: '₺999',
      period: 'tek seferlik',
      description: 'Küçük düğünler için mükemmel',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-pink-500 to-rose-500',
      features: [
        '3 Premium Tema',
        '50 Misafir',
        'Fotoğraf Galerisi (100 fotoğraf)',
        'RSVP Yönetimi',
        'Temel Timeline',
        'Mobil Uyumlu',
        'Email Destek',
        '30 Gün Erişim'
      ],
      popular: false
    },
    {
      name: 'Premium',
      price: '₺2.499',
      period: 'tek seferlik',
      description: 'En popüler paket',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      features: [
        '10 Premium Tema',
        '200 Misafir',
        'Sınırsız Fotoğraf',
        'QR Kod Misafir Yükleme',
        'Canlı Fotoğraf Duvarı (TV)',
        'Gelişmiş RSVP Sistemi',
        'Onaylı Misafir Galerisi',
        'Özel Timeline & Etkinlikler',
        'Şifre Koruması',
        'Analytics Dashboard',
        'Öncelikli Destek',
        '90 Gün Erişim',
        'Özel Domain Desteği'
      ],
      popular: true
    },
    {
      name: 'Platinum',
      price: '₺4.999',
      period: 'tek seferlik',
      description: 'Lüks düğünler için',
      icon: <Crown className="w-8 h-8" />,
      color: 'from-amber-500 to-yellow-500',
      features: [
        'Tüm Premium Özellikler',
        'Sınırsız Misafir',
        'Sınırsız Depolama',
        'Çoklu Dil Desteği',
        'Video Entegrasyonu',
        'Canlı Yayın Desteği',
        'Gelişmiş Analytics',
        'SEO Optimizasyonu',
        'White-Label Seçeneği',
        'Özel Hesap Yöneticisi',
        '7/24 Öncelikli Destek',
        'Ömür Boyu Erişim',
        'Özel Geliştirme (2 saat)'
      ],
      popular: false
    }
  ]

  const comparisonFeatures = [
    { name: 'Premium Temalar', temel: '3', premium: '10', platinum: 'Tümü' },
    { name: 'Misafir Sayısı', temel: '50', premium: '200', platinum: 'Sınırsız' },
    { name: 'Fotoğraf Depolama', temel: '100 adet', premium: 'Sınırsız', platinum: 'Sınırsız' },
    { name: 'QR Kod Sistemi', temel: '❌', premium: '✅', platinum: '✅' },
    { name: 'Canlı Fotoğraf Duvarı', temel: '❌', premium: '✅', platinum: '✅' },
    { name: 'Geri Sayım Sayacı', temel: '✅', premium: '✅', platinum: '✅' },
    { name: 'RSVP Yönetimi', temel: 'Temel', premium: 'Gelişmiş', platinum: 'Gelişmiş' },
    { name: 'Şifre Koruması', temel: '❌', premium: '✅', platinum: '✅' },
    { name: 'Analytics Dashboard', temel: '❌', premium: '✅', platinum: '✅' },
    { name: 'Özel Domain', temel: '❌', premium: '✅', platinum: '✅' },
    { name: 'Çoklu Dil', temel: '❌', premium: '❌', platinum: '✅' },
    { name: 'Destek', temel: 'Email', premium: 'Öncelikli', platinum: '7/24' },
    { name: 'Erişim Süresi', temel: '30 Gün', premium: '90 Gün', platinum: 'Ömür Boyu' }
  ]

  const faqs = [
    {
      question: 'Aylık ödeme yapmam gerekiyor mu?',
      answer: 'Hayır! Tüm paketlerimiz tek seferlik ödemedir. Bir kez ödersiniz ve paketinizde belirtilen süre boyunca siteniz aktif kalır.'
    },
    {
      question: 'Daha sonra paketimi yükseltebilir miyim?',
      answer: 'Evet! İstediğiniz zaman daha üst bir pakete geçebilir ve sadece farkı ödersiniz.'
    },
    {
      question: 'Erişim sürem bittiğinde ne olur?',
      answer: 'Siteniz görüntülenebilir kalır ancak değişiklik yapamazsınız. Küçük bir ücretle istediğiniz zaman erişimi uzatabilirsiniz.'
    },
    {
      question: 'Kendi domain\'imi kullanabilir miyim?',
      answer: 'Evet! Premium ve Platinum paketler özel domain desteği içerir. Kurulumda size yardımcı oluruz.'
    },
    {
      question: 'Para iade politikanız var mı?',
      answer: 'Evet! Hizmetimizden memnun kalmazsanız 14 günlük para iade garantisi sunuyoruz.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white">
      <SEO
        title="Fiyatlandırma - Davet Digital | Şeffaf ve Basit Paketler"
        description="Davet Digital düğün sitesi paketleri: Temel (₺999), Premium (₺2.499), Platinum (₺4.999). Tek seferlik ödeme, gizli ücret yok. 14 günlük para iade garantisi."
        keywords="düğün sitesi fiyat, düğün davetiyesi paketleri, online davetiye fiyat, düğün sitesi ücret"
        url="https://davet.digital/pricing"
      />
      <MarketingNavbar />

      <div className="pt-20 pb-24">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <div className="flex justify-center mb-6">
          <Zap className="w-16 h-16 text-purple-600 animate-bounce" />
        </div>
        <h1 className="text-6xl md:text-7xl font-script text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 mb-6">
          Basit, Şeffaf Fiyatlandırma
        </h1>
        <p className="text-2xl text-gray-600 max-w-3xl mx-auto mb-4">
          Tek seferlik ödeme. Gizli ücret yok. Aylık abonelik yok.
        </p>
        <p className="text-lg text-gray-500">
          Özel gününüz için mükemmel paketi seçin
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all hover:scale-105 ${
                plan.popular ? 'ring-4 ring-purple-500 ring-offset-4' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-bl-2xl font-semibold text-sm">
                  EN POPÜLER
                </div>
              )}

              <div className={`bg-gradient-to-r ${plan.color} p-8 text-white`}>
                <div className="flex items-center justify-center mb-4">
                  {plan.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2 text-center">{plan.name}</h3>
                <p className="text-white/90 text-center mb-6">{plan.description}</p>
                <div className="text-center">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-white/80 ml-2">/ {plan.period}</span>
                </div>
              </div>

              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signup"
                  className={`block w-full py-4 rounded-xl font-semibold text-center transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-2xl transform hover:scale-105'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Hemen Başla
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <h2 className="text-4xl font-script text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 text-center mb-12">
          Paket Karşılaştırması
        </h2>
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Özellikler</th>
                  <th className="px-6 py-4 text-center font-semibold">Temel</th>
                  <th className="px-6 py-4 text-center font-semibold">Premium</th>
                  <th className="px-6 py-4 text-center font-semibold">Platinum</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium text-gray-900">{feature.name}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{feature.temel}</td>
                    <td className="px-6 py-4 text-center text-gray-700 font-semibold">{feature.premium}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{feature.platinum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Money Back Guarantee */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-12 border border-green-200 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-12 h-12 text-white" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">14 Günlük Para İade Garantisi</h3>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Davet Digital'i risksiz deneyin. 14 gün içinde tamamen memnun kalmazsanız,
            paranızın tamamını iade ederiz. Soru sormadan.
          </p>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-script text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 text-center mb-12">
          Sıkça Sorulan Sorular
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-center">
        <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-3xl p-12 text-white">
          <h3 className="text-4xl font-script mb-4">Hala Sorularınız mı Var?</h3>
          <p className="text-xl mb-8 text-white/90">
            Ekibimiz size mükemmel paketi seçmenizde yardımcı olmak için burada
          </p>
          <a
            href="mailto:destek@davetdigital.com"
            className="inline-block px-10 py-4 bg-white text-purple-600 rounded-full font-semibold hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            Bize Ulaşın
          </a>
        </div>
      </div>
      </div>

      <MarketingFooter />
    </div>
  )
}

export default Pricing
