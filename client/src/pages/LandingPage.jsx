import { Link } from 'react-router-dom'
import { Heart, Calendar, Users, Camera, QrCode, Palette, Globe, Sparkles, Check, ArrowRight, Star, Zap, Shield, ClipboardList, LogIn } from 'lucide-react'
import SEO from '../components/SEO'
import MarketingNavbar from '../components/MarketingNavbar'
import MarketingFooter from '../components/MarketingFooter'
import FloatingDecor from '../components/FloatingDecor'

const LandingPage = () => {
  const features = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: '10 Premium Tema',
      description: 'Romantik pembe\'den şık siyaha kadar özelleştirilebilir güzel temalar',
      color: 'from-pink-500 to-purple-500'
    },
    {
      icon: <QrCode className="w-8 h-8" />,
      title: 'QR Kod ile Fotoğraf Yükleme',
      description: 'Misafirleriniz her masa için benzersiz QR kodlarla anında fotoğraf yükleyebilir',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: 'Canlı Fotoğraf Duvarı',
      description: 'Düğün salonunuzdaki TV ekranlar için gerçek zamanlı fotoğraf gösterisi',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Geri Sayım Sayacı',
      description: 'Büyük güne kalan gün, saat, dakika ve saniye ile heyecanı yaşatın',
      color: 'from-rose-500 to-pink-500'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'RSVP Yönetimi',
      description: 'Misafir katılımını, diyet kısıtlamalarını ve özel istekleri takip edin',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Misafir Galerisi',
      description: 'Onay sistemi ile şifre korumalı galeriler',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Çoklu Dil Desteği',
      description: 'Türkçe, İngilizce ve daha fazla dil desteği',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: <ClipboardList className="w-8 h-8" />,
      title: 'Online Düğün Planlayıcı',
      description: 'Bütçe takibi, görev listesi, misafir yönetimi ve daha fazlası ile düğününüzü profesyonelce planlayın',
      color: 'from-teal-500 to-cyan-500'
    }
  ]

  const stats = [
    { number: '500+', label: 'Mutlu Çift' },
    { number: '50K+', label: 'Paylaşılan Fotoğraf' },
    { number: '10K+', label: 'Katılımcı Misafir' },
    { number: '4.9/5', label: 'Ortalama Puan' }
  ]

  const testimonials = [
    {
      name: 'Ayşe & Mehmet',
      text: 'QR kod özelliği harikaydı! Misafirlerimiz anında fotoğraf yükleyebildiler, çok beğendiler.',
      rating: 5,
      image: '👰'
    },
    {
      name: 'Elif & Can',
      text: 'Çok profesyonel ve kullanımı kolay. Düğünümüz için mükemmel bir çözüm oldu!',
      rating: 5,
      image: '🤵'
    },
    {
      name: 'Zeynep & Burak',
      text: 'Canlı fotoğraf duvarı muhteşemdi! Düğündeki herkes hayran kaldı.',
      rating: 5,
      image: '💑'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <FloatingDecor />
      <SEO
        title="Davet Digital - Mükemmel Düğün Sitenizi Dakikalar İçinde Oluşturun"
        description="QR kodlu fotoğraf paylaşımı, canlı ekran gösterileri, RSVP yönetimi ve 10 premium tema ile muhteşem düğün sitenizi oluşturun. Kod yazmaya gerek yok. 14 günlük ücretsiz deneme."
        keywords="düğün sitesi, düğün davetiyesi, online davetiye, QR kod düğün, düğün fotoğraf paylaşımı, RSVP, düğün organizasyon, davet.digital"
        url="https://davet.digital/"
      />
      <MarketingNavbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pt-20 pb-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlYzQ4OTkiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItMnptMCAwdi0yIDJ6bS0yIDB2LTIgMnptLTIgMGgtMiAyem0wIDBoMi0yem0wLTJoLTIgMnptMiAwaDItMnptMC0yaDItMnptMCAyaC0yIDJ6bTAgMGgyLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Heart className="w-24 h-24 text-pink-500 animate-pulse" />
                <Sparkles className="w-10 h-10 text-purple-500 absolute -top-2 -right-2 animate-bounce" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 mb-6 leading-tight">
              Davet Digital
            </h1>

            <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-serif">
              Dakikalar İçinde Mükemmel Düğün Siteniz
            </p>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              QR kodlu fotoğraf paylaşımı, canlı ekran gösterileri, RSVP yönetimi ve premium
              temalarla muhteşem, interaktif bir düğün sitesi oluşturun. Kod yazmaya gerek yok.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/signup"
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all flex items-center space-x-2"
              >
                <span>Ücretsiz Deneyin</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/demo"
                className="px-8 py-4 bg-white text-purple-600 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all border-2 border-purple-200"
              >
                Canlı Demo'yu İncele
              </Link>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              ✨ Kredi kartı gerektirmez • 14 günlük ücretsiz deneme • İstediğiniz zaman iptal edin
            </p>
          </div>
        </div>
      </div>

      {/* Login Section for Existing Customers */}
      <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 py-12 border-y-4 border-purple-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Zaten Üye Misiniz?</h3>
                <p className="text-gray-700">Düğün sitenize giriş yapın ve yönetmeye devam edin</p>
              </div>
            </div>
            <Link
              to="/login"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all flex items-center space-x-2 whitespace-nowrap"
            >
              <LogIn className="w-5 h-5" />
              <span>Giriş Yap</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-script text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
              İhtiyacınız Olan Her Şey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Modern düğünler için özel olarak tasarlanmış profesyonel özellikler
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-script text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
              Nasıl Çalışır?
            </h2>
            <p className="text-xl text-gray-600">
              3 basit adımda düğün siteniz hazır
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Kayıt Olun</h3>
              <p className="text-gray-600 leading-relaxed">
                Birkaç basit form ile düğün bilgilerinizi girin ve özel alt alan adınızı alın. Kredi kartı gerektirmez.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Özelleştirin</h3>
              <p className="text-gray-600 leading-relaxed">
                10 premium temadan birini seçin, fotoğraflarınızı yükleyin ve etkinlik detaylarınızı ekleyin.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Paylaşın</h3>
              <p className="text-gray-600 leading-relaxed">
                Benzersiz linkinizi misafirlerinizle paylaşın ve canlı fotoğraf akışını gerçek zamanlı izleyin.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-script text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
              Neden Davet Digital?
            </h2>
            <p className="text-xl text-gray-600">
              Modern çiftler için tasarlandı
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Kod Yazmaya Gerek Yok</h3>
                  <p className="text-gray-600">
                    Teknik bilgi gerektirmeyen sürükle-bırak arayüzü ile dakikalar içinde sitenizi oluşturun.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Anında Kurulum</h3>
                  <p className="text-gray-600">
                    5 dakikada canlı. Tema seçin, bilgilerinizi girin ve hemen başlayın. Hiçbir bekleme yok.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Mobil Öncelikli</h3>
                  <p className="text-gray-600">
                    Tüm misafirleriniz telefonlarından mükemmel bir deneyim yaşar. Responsive tasarım.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Güvenli & Özel</h3>
                  <p className="text-gray-600">
                    Şifre koruması, onay sistemi ve güvenli fotoğraf yükleme ile anılarınız güvende.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-script text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
              Çiftlerin Tercihi
            </h2>
            <p className="text-xl text-gray-600">
              Binlerce çiftin güvendiği platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <span className="text-4xl mr-3">{testimonial.image}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">Onaylı Müşteri</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2Mi0yem0wIDB2LTIgMnptLTIgMHYtMiAyem0tMiAwaC0yIDJ6bTAgMGgyLTJ6bTAtMmgtMiAyem0yIDBoMi0yem0wLTJoMi0yem0wIDJoLTIgMnptMCAwaDItMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-script mb-6">
            Hemen Başlayın
          </h2>
          <p className="text-2xl mb-8 text-white/90">
            Davet Digital'i seçen binlerce çifte katılın
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/signup"
              className="px-10 py-5 bg-white text-purple-600 rounded-full text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Ücretsiz Başla
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Güvenli & Özel</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Anında Kurulum</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5" />
              <span>Kod Yazmaya Gerek Yok</span>
            </div>
          </div>
        </div>
      </div>

      <MarketingFooter />
    </div>
  )
}

export default LandingPage
