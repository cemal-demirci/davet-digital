import { useNavigate } from 'react-router-dom'
import { Heart, Building2, PartyPopper, Sparkles, Cake, GraduationCap, Baby } from 'lucide-react'
import SEO from '../components/SEO'
import MarketingNavbar from '../components/MarketingNavbar'
import MarketingFooter from '../components/MarketingFooter'
import FloatingDecor from '../components/FloatingDecor'

const EventSelection = () => {
  const navigate = useNavigate()

  const eventTypes = [
    {
      id: 'wedding',
      name: 'Düğün',
      description: 'Hayatınızın en özel gününü unutulmaz kılın',
      icon: <Heart className="w-16 h-16" />,
      color: 'from-pink-500 to-rose-500',
      features: ['Gelin & Damat Profili', 'RSVP Yönetimi', 'Fotoğraf Galerisi', 'Hediye Listesi'],
      popular: true
    },
    {
      id: 'corporate',
      name: 'Kurumsal Etkinlik',
      description: 'Şirket etkinliklerinizi profesyonelce yönetin',
      icon: <Building2 className="w-16 h-16" />,
      color: 'from-blue-500 to-cyan-500',
      features: ['Çoklu Etkinlik', 'White-Label', 'Analytics', 'API Entegrasyonu'],
      popular: false
    },
    {
      id: 'circumcision',
      name: 'Sünnet',
      description: 'Çocuğunuzun özel gününü neşeyle kutlayın',
      icon: <PartyPopper className="w-16 h-16" />,
      color: 'from-orange-500 to-amber-500',
      features: ['Çocuk Dostu Tema', 'Misafir Mesajları', 'Fotoğraf Galerisi', 'Hediye Takibi'],
      popular: false
    },
    {
      id: 'engagement',
      name: 'Nişan',
      description: 'Evlilik yolculuğunuzun ilk adımını paylaşın',
      icon: <Sparkles className="w-16 h-16" />,
      color: 'from-purple-500 to-pink-500',
      features: ['Çift Profili', 'RSVP', 'Fotoğraf Galerisi', 'Geri Sayım'],
      popular: false
    },
    {
      id: 'birthday',
      name: 'Doğum Günü',
      description: 'Özel yaş günlerinizi unutulmaz kılın',
      icon: <Cake className="w-16 h-16" />,
      color: 'from-red-500 to-pink-500',
      features: ['Tema Seçimi', 'Misafir Listesi', 'Fotoğraf Paylaşımı', 'Mesaj Panosu'],
      popular: false
    },
    {
      id: 'graduation',
      name: 'Mezuniyet',
      description: 'Başarı hikayenizi kutlayın',
      icon: <GraduationCap className="w-16 h-16" />,
      color: 'from-indigo-500 to-blue-500',
      features: ['Mezun Profili', 'Anı Galerisi', 'Mesaj Defteri', 'RSVP'],
      popular: false
    },
    {
      id: 'baby-shower',
      name: 'Baby Shower',
      description: 'Bebeğinizin gelişini sevinçle karşılayın',
      icon: <Baby className="w-16 h-16" />,
      color: 'from-cyan-500 to-blue-500',
      features: ['Bebek Temalı', 'Hediye Listesi', 'Fotoğraf Galerisi', 'Dilek Panosu'],
      popular: false
    }
  ]

  const handleEventSelect = (eventId) => {
    navigate(`/signup?type=${eventId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white">
      <FloatingDecor />
      <SEO
        title="Etkinlik Seçimi - Davet Digital | Dijital Davetiye Oluştur"
        description="Düğün, nişan, sünnet, doğum günü, mezuniyet veya kurumsal etkinliğiniz için profesyonel dijital davetiye oluşturun."
        keywords="dijital davetiye, düğün sitesi, nişan daveti, sünnet organizasyonu, doğum günü daveti"
        url="https://davet.digital/start"
      />
      <MarketingNavbar />

      <div className="pt-20 pb-24">
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-script text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 mb-6">
            Hangi Etkinlik İçin?
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            Özel gününüzü seçin, hemen oluşturmaya başlayalım
          </p>
        </div>

        {/* Event Type Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventTypes.map((event) => (
              <div
                key={event.id}
                onClick={() => handleEventSelect(event.id)}
                className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all hover:scale-105 cursor-pointer ${
                  event.popular ? 'ring-4 ring-purple-500 ring-offset-4' : ''
                }`}
              >
                {event.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-bl-2xl font-semibold text-sm z-10">
                    EN POPÜLER
                  </div>
                )}

                <div className={`bg-gradient-to-r ${event.color} p-8 text-white`}>
                  <div className="flex items-center justify-center mb-4">
                    {event.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-center">{event.name}</h3>
                  <p className="text-white/90 text-center">{event.description}</p>
                </div>

                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {event.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                    Başla
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-12 text-center border-2 border-purple-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              30 Günlük Ücretsiz Deneme
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Tüm özellikleri denemek için kredi kartı bilgisi gerekmez
            </p>
            <p className="text-gray-600">
              Paket seçiminizi daha sonra hesabınızdan yapabilirsiniz
            </p>
          </div>
        </div>
      </div>

      <MarketingFooter />
    </div>
  )
}

export default EventSelection
