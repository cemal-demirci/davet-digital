import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Calendar, Users, Camera, QrCode, Eye, ArrowRight, CheckCircle, Star } from 'lucide-react'
import SEO from '../components/SEO'
import MarketingNavbar from '../components/MarketingNavbar'
import MarketingFooter from '../components/MarketingFooter'

const Demo = () => {
  const [activeTab, setActiveTab] = useState('home')

  const demoSections = [
    {
      id: 'home',
      name: 'Ana Sayfa',
      icon: <Heart className="w-5 h-5" />,
      preview: '/demo-preview-home.jpg'
    },
    {
      id: 'gallery',
      name: 'Galeri',
      icon: <Camera className="w-5 h-5" />,
      preview: '/demo-preview-gallery.jpg'
    },
    {
      id: 'timeline',
      name: 'Zaman Çizelgesi',
      icon: <Calendar className="w-5 h-5" />,
      preview: '/demo-preview-timeline.jpg'
    },
    {
      id: 'rsvp',
      name: 'RSVP',
      icon: <Users className="w-5 h-5" />,
      preview: '/demo-preview-rsvp.jpg'
    },
    {
      id: 'qr',
      name: 'QR Kod Yükleme',
      icon: <QrCode className="w-5 h-5" />,
      preview: '/demo-preview-qr.jpg'
    }
  ]

  const features = [
    {
      title: '10 Premium Tema',
      description: 'Romantik, Klasik, Modern ve daha fazla tema seçeneği',
      icon: <Heart className="w-6 h-6" />
    },
    {
      title: 'Canlı Fotoğraf Duvarı',
      description: 'Misafirlerinizin yüklediği fotoğraflar gerçek zamanlı görüntülenir',
      icon: <Camera className="w-6 h-6" />
    },
    {
      title: 'QR Kod ile Yükleme',
      description: 'Her masa için özel QR kod, anında fotoğraf paylaşımı',
      icon: <QrCode className="w-6 h-6" />
    },
    {
      title: 'RSVP Yönetimi',
      description: 'Misafir katılımı, diyet tercihleri ve özel istekler',
      icon: <Users className="w-6 h-6" />
    },
    {
      title: 'Geri Sayım Sayacı',
      description: 'Büyük güne kalan süreyi gün, saat, dakika olarak göster',
      icon: <Calendar className="w-6 h-6" />
    },
    {
      title: 'Mobil Uyumlu',
      description: 'Tüm cihazlarda mükemmel görünüm',
      icon: <Eye className="w-6 h-6" />
    }
  ]

  const testimonials = [
    {
      name: 'Ayşe & Mehmet',
      text: 'QR kod sistemi muhteşemdi! Misafirlerimiz çok kolay fotoğraf yüklediler.',
      rating: 5,
      image: '👰'
    },
    {
      name: 'Elif & Can',
      text: 'Canlı fotoğraf duvarı düğünün en çok beğenilen özelliği oldu!',
      rating: 5,
      image: '🤵'
    },
    {
      name: 'Zeynep & Burak',
      text: 'Çok profesyonel ve kullanımı kolay. Herkese tavsiye ediyorum!',
      rating: 5,
      image: '💑'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white">
      <SEO
        title="Canlı Demo - Davet Digital | Tüm Özellikleri Keşfedin"
        description="Davet Digital'in tüm özelliklerini canlı demo ile keşfedin: 10 premium tema, QR kod sistemi, canlı fotoğraf duvarı, RSVP yönetimi ve daha fazlası."
        keywords="düğün sitesi demo, online davetiye demo, düğün fotoğraf galerisi demo, RSVP demo"
        url="https://davet.digital/demo"
      />
      <MarketingNavbar />

      {/* Hero Section */}
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Eye className="w-20 h-20 text-purple-500 animate-pulse" />
              <Star className="w-8 h-8 text-pink-500 absolute -top-2 -right-2 animate-bounce" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-script text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 mb-6">
            Canlı Demo
          </h1>
          <p className="text-2xl text-gray-700 mb-4">
            Tüm Özellikleri Keşfedin
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Davet Digital ile neler yapabileceğinizi görün. Interaktif demo ile tüm özellikleri deneyimleyin.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/signup"
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all flex items-center space-x-2"
            >
              <span>Hemen Başla</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Demo Preview Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-script text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
              İnteraktif Demo
            </h2>
            <p className="text-xl text-gray-600">
              Düğün sitenizin nasıl görüneceğini görün
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {demoSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === section.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {section.icon}
                <span>{section.name}</span>
              </button>
            ))}
          </div>

          {/* Demo Preview */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-2xl border border-purple-200">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Browser chrome */}
              <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2 border-b">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 bg-white rounded px-4 py-1 text-sm text-gray-600 font-mono">
                  ayse-mehmet.davet.digital/{activeTab}
                </div>
              </div>

              {/* Demo Content */}
              <div className="aspect-video bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
                {activeTab === 'home' && (
                  <div className="h-full p-8 space-y-6">
                    <div className="text-center mb-6">
                      <h1 className="text-4xl font-script text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2">
                        Ayşe & Mehmet
                      </h1>
                      <p className="text-gray-600">15 Haziran 2024</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                      <div className="bg-white rounded-lg p-4 text-center shadow-md">
                        <Calendar className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                        <p className="text-sm font-semibold">Geri Sayım</p>
                        <p className="text-xs text-gray-600">45 Gün</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-md">
                        <Camera className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                        <p className="text-sm font-semibold">Galeri</p>
                        <p className="text-xs text-gray-600">120 Fotoğraf</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-md">
                        <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-sm font-semibold">Misafirler</p>
                        <p className="text-xs text-gray-600">150 Kişi</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'gallery' && (
                  <div className="h-full p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Fotoğraf Galerisi</h2>
                    <div className="grid grid-cols-4 gap-2">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg flex items-center justify-center">
                          <Camera className="w-8 h-8 text-white" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'timeline' && (
                  <div className="h-full p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Düğün Programı</h2>
                    <div className="space-y-4 max-w-xl mx-auto">
                      {[
                        { time: '14:00', event: 'Misafir Karşılama' },
                        { time: '15:00', event: 'Nikah Töreni' },
                        { time: '16:00', event: 'Kokteyil' },
                        { time: '18:00', event: 'Akşam Yemeği' },
                        { time: '20:00', event: 'İlk Dans' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center space-x-4 bg-white rounded-lg p-3 shadow-sm">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            {item.time}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{item.event}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'rsvp' && (
                  <div className="h-full p-8 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Katılım Bildirimi</h2>
                      <div className="space-y-4">
                        <input type="text" placeholder="Adınız Soyadınız" className="w-full px-4 py-3 rounded-lg border border-gray-300" />
                        <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg border border-gray-300" />
                        <select className="w-full px-4 py-3 rounded-lg border border-gray-300">
                          <option>Katılacağım</option>
                          <option>Katılamayacağım</option>
                        </select>
                        <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold">
                          Gönder
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'qr' && (
                  <div className="h-full p-8 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                    <div className="text-center">
                      <div className="w-48 h-48 bg-white rounded-2xl shadow-2xl mx-auto mb-6 flex items-center justify-center">
                        <QrCode className="w-32 h-32 text-gray-800" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Masa 12</h3>
                      <p className="text-gray-600 mb-4">QR kodu tarayın ve fotoğraflarınızı yükleyin</p>
                      <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold shadow-lg">
                        <Camera className="w-5 h-5 inline mr-2" />
                        Fotoğraf Yükle
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                💡 <span className="font-semibold">İpucu:</span> Üstteki butonları tıklayarak farklı sayfaları görüntüleyin
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-script text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
              Tüm Özellikler
            </h2>
            <p className="text-xl text-gray-600">
              Modern düğünler için ihtiyacınız olan her şey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-script text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
              Mutlu Çiftler
            </h2>
            <p className="text-xl text-gray-600">
              Binlerce çiftin tercihi
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
      <div className="py-24 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-script mb-6">
            Hazır mısınız?
          </h2>
          <p className="text-2xl mb-8 text-white/90">
            14 günlük ücretsiz deneme ile başlayın
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/signup"
              className="px-10 py-5 bg-white text-purple-600 rounded-full text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Ücretsiz Başla
            </Link>
            <Link
              to="/pricing"
              className="px-10 py-5 bg-purple-500/20 backdrop-blur text-white rounded-full text-xl font-semibold hover:bg-purple-500/30 transition-all border-2 border-white/30"
            >
              Fiyatları İncele
            </Link>
          </div>

          <p className="mt-8 text-sm text-white/80">
            Kredi kartı gerektirmez • İstediğiniz zaman iptal edin
          </p>
        </div>
      </div>

      <MarketingFooter />
    </div>
  )
}

export default Demo
