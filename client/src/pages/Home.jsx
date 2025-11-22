import { useState, useEffect } from 'react'
import { Heart, MapPin, Calendar, Clock, Music, Palette, X } from 'lucide-react'
import axios from 'axios'
import { getThemeClasses, getGradientClass, getHeroGradient, themeColorMap } from '../utils/themeHelper'
import SEO from '../components/SEO'
import { API_URL } from '../config'

const Home = () => {
  const [settings, setSettings] = useState(null)
  const [events, setEvents] = useState([])
  const [photos, setPhotos] = useState([])
  const [timeline, setTimeline] = useState([])
  const [timeLeft, setTimeLeft] = useState({})
  const [password, setPassword] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [currentTheme, setCurrentTheme] = useState('romantic-rose')
  const [showThemeSelector, setShowThemeSelector] = useState(false)

  // Get theme classes dynamically
  const theme = getThemeClasses(currentTheme)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [settingsRes, eventsRes, photosRes, timelineRes] = await Promise.all([
        axios.get(`${API_URL}/api/settings`),
        axios.get(`${API_URL}/api/events`),
        axios.get(`${API_URL}/api/photos`),
        axios.get(`${API_URL}/api/timeline`)
      ])

      setSettings(settingsRes.data)
      setEvents(eventsRes.data)
      setPhotos(photosRes.data)
      setTimeline(timelineRes.data)

      if (!settingsRes.data.isPasswordProtected) {
        setIsUnlocked(true)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      // Demo için örnek veriler
      setIsUnlocked(true)
      setSettings({
        coupleNames: 'Ayşe & Mehmet',
        mainDate: new Date('2024-06-15'),
        storyTitle: 'Aşk Hikayemiz',
        storyText: 'Hayatımızın en güzel gününde sizleri yanımızda görmek istiyoruz. Birlikte yeni bir hayata başlarken, sevgili dostlarımızla bu özel anı paylaşmak bizim için çok değerli.',
        venueName: 'Grand Otel İstanbul',
        venueAddress: 'Nişantaşı, İstanbul',
        theme: 'romantic-rose'
      })

      setEvents([
        {
          _id: '1',
          name: 'Düğün Töreni',
          date: new Date('2024-06-15T14:00:00'),
          location: 'Grand Otel İstanbul',
          description: 'Nikah törenimiz saat 14:00\'da başlayacaktır.'
        },
        {
          _id: '2',
          name: 'Kokteyl',
          date: new Date('2024-06-15T16:00:00'),
          location: 'Bahçe Alanı',
          description: 'Tören sonrası bahçe alanında ikramlarımız olacaktır.'
        },
        {
          _id: '3',
          name: 'Düğün Yemeği',
          date: new Date('2024-06-15T19:00:00'),
          location: 'Balo Salonu',
          description: 'Akşam yemeği ve eğlence programı başlayacaktır.'
        }
      ])

      setPhotos([
        {
          _id: '1',
          title: 'Nişan Fotoğrafı',
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
          category: 'Nişan',
          likes: 45,
          likedBy: [],
          comments: [
            { name: 'Zeynep', message: 'Çok güzel olmuş! 💕', createdAt: new Date() }
          ]
        },
        {
          _id: '2',
          title: 'Düğün Hazırlığı',
          url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
          category: 'Hazırlık',
          likes: 32,
          likedBy: [],
          comments: []
        },
        {
          _id: '3',
          title: 'Çift Fotoğrafı',
          url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
          category: 'Çekim',
          likes: 58,
          likedBy: [],
          comments: []
        },
        {
          _id: '4',
          title: 'Romantik An',
          url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
          category: 'Çekim',
          likes: 67,
          likedBy: [],
          comments: []
        },
        {
          _id: '5',
          title: 'Gelin Buketi',
          url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800',
          category: 'Detay',
          likes: 41,
          likedBy: [],
          comments: []
        },
        {
          _id: '6',
          title: 'Nikah Anı',
          url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800',
          category: 'Tören',
          likes: 89,
          likedBy: [],
          comments: []
        }
      ])

      setTimeline([
        {
          _id: '1',
          title: 'Karşılaşma',
          time: '2018',
          description: 'Üniversitede tanıştık. İlk bakışta aşk diye buna derler!',
          icon: 'heart',
          order: 1
        },
        {
          _id: '2',
          title: 'İlk Randevu',
          time: '2018 - Kasım',
          description: 'Boğaz\'da unutulmaz bir akşam yemeği.',
          icon: 'coffee',
          order: 2
        },
        {
          _id: '3',
          title: 'Evlilik Teklifi',
          time: '2023 - Şubat',
          description: 'Cappadocia\'da balon turu sırasında muhteşem bir teklif!',
          icon: 'ring',
          order: 3
        },
        {
          _id: '4',
          title: 'Nişan',
          time: '2023 - Haziran',
          description: 'Ailelerimiz ve sevdiklerimizle birlikte nişanlandık.',
          icon: 'users',
          order: 4
        },
        {
          _id: '5',
          title: 'Düğün Hazırlıkları',
          time: '2024 - İlkbahar',
          description: 'En güzel günümüz için hazırlıklar başladı!',
          icon: 'calendar',
          order: 5
        }
      ])
    }
  }

  useEffect(() => {
    if (!events.length) return

    const timer = setInterval(() => {
      const newTimeLeft = {}
      events.forEach(event => {
        const eventDate = new Date(event.date)
        const now = new Date()
        const difference = eventDate - now

        if (difference > 0) {
          newTimeLeft[event._id] = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          }
        }
      })
      setTimeLeft(newTimeLeft)
    }, 1000)

    return () => clearInterval(timer)
  }, [events])

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${API_URL}/api/verify-password`, { password })
      if (response.data.valid) {
        setIsUnlocked(true)
      } else {
        alert('Yanlış şifre!')
      }
    } catch (error) {
      console.error('Password verification error:', error)
    }
  }

  if (!isUnlocked && settings?.isPasswordProtected) {
    return (
      <div className={`min-h-screen ${getGradientClass(settings?.theme)} flex items-center justify-center p-4`}>
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
          <div className="text-center mb-6">
            <Heart className={`w-16 h-16 ${theme.textPrimary500} mx-auto mb-4`} />
            <h2 className={`text-3xl font-script ${theme.textPrimary600}`}>Özel Davet</h2>
            <p className="text-gray-600 mt-2">Lütfen şifrenizi giriniz</p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifre"
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${theme.focusRingPrimary500} focus:border-transparent`}
            />
            <button
              type="submit"
              className={`w-full ${theme.bgPrimary500} text-white py-3 rounded-lg ${theme.hoverBgPrimary600} transition-colors font-medium`}
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (!settings) {
    return (
      <div className={`min-h-screen ${getGradientClass('romantic-rose')} flex items-center justify-center`}>
        <div className="text-center">
          <Heart className={`w-16 h-16 ${theme.textPrimary500} mx-auto animate-pulse`} />
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  // Tema İsimleri
  const themeNames = {
    'romantic-rose': '💖 Romantik Pembe',
    'elegant-black': '🖤 Şık Siyah',
    'garden-green': '🌿 Bahçe Yeşili',
    'ocean-blue': '🌊 Okyanus Mavisi',
    'sunset-orange': '🌅 Gün Batımı',
    'purple-dream': '💜 Mor Rüya',
    'lavender-mint': '🪻 Lavanta',
    'coral-peach': '🪸 Mercan',
    'royal-navy': '⚓ Lacivert',
    'champagne-gold': '🥂 Altın'
  }

  return (
    <div className={`min-h-screen ${getGradientClass(currentTheme)}`}>
      <SEO
        title="Demo - Davet Digital | Canlı Demo Düğün Sitesi"
        description="Davet Digital düğün sitesi canlı demo'sunu inceleyin. 10 farklı temayı canlı olarak test edin. QR kod sistemi, RSVP, fotoğraf galerisi ve daha fazlası."
        keywords="düğün sitesi demo, online davetiye demo, düğün sitesi örnek, canlı demo"
        url="https://davet.digital/demo"
      />
      {/* Tema Seçici Butonu */}
      <button
        onClick={() => setShowThemeSelector(true)}
        className="fixed top-24 right-6 z-50 bg-white rounded-full p-4 shadow-2xl hover:scale-110 transition-transform group"
      >
        <Palette className="w-6 h-6 text-purple-600 group-hover:rotate-12 transition-transform" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Temaları Dene
        </span>
      </button>

      {/* Tema Seçici Modal */}
      {showThemeSelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-script text-gray-900">10 Premium Tema</h3>
              <button
                onClick={() => setShowThemeSelector(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-600 mb-8">
              Canlı önizleme için bir temaya tıklayın. Her tema anında uygulanır!
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.keys(themeColorMap).map((themeName) => (
                <button
                  key={themeName}
                  onClick={() => {
                    setCurrentTheme(themeName)
                    setShowThemeSelector(false)
                  }}
                  className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                    currentTheme === themeName
                      ? 'border-purple-500 bg-purple-50 shadow-xl'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className={`h-24 rounded-xl mb-4 bg-gradient-to-br ${getGradientClass(themeName)}`}></div>
                  <h4 className="font-semibold text-gray-900 mb-1">{themeNames[themeName]}</h4>
                  {currentTheme === themeName && (
                    <p className="text-sm text-purple-600">✓ Seçili</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Music Player */}
      {settings?.musicUrl && (
        <audio autoPlay loop>
          <source src={settings.musicUrl} type="audio/mpeg" />
        </audio>
      )}

      {/* Hero Section - Navbar için padding eklendi */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 ${getHeroGradient(currentTheme)}`}></div>
        <div className="relative z-10 text-center px-4">
          <div className="mb-8">
            <Heart className={`w-24 h-24 ${theme.textPrimary500} mx-auto mb-8 animate-pulse`} />
          </div>
          <h1 className={`text-7xl md:text-9xl font-script ${theme.textPrimary600} mb-4`}>
            {settings.coupleNames || 'Cemal & [Partner]'}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 font-serif">
            Düğünümüze Davetlisiniz
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className={`w-6 h-10 border-2 ${theme.borderPrimary500} rounded-full flex items-start justify-center p-2`}>
            <div className={`w-1 h-3 ${theme.bgPrimary500} rounded-full`}></div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      {settings.storyText && (
        <div className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-5xl font-script ${theme.textPrimary600} mb-8`}>
              {settings.storyTitle || 'Hikayemiz'}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              {settings.storyText}
            </p>
          </div>
        </div>
      )}

      {/* Countdown Section */}
      {events.length > 0 && (
        <div className={`py-20 px-4 bg-gradient-to-r ${theme.bgPrimary100} ${theme.bgSecondary100}`}>
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-5xl font-script ${theme.textPrimary600} text-center mb-16`}>
              Geri Sayım
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {events.map(event => (
                <div key={event._id} className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="flex items-center mb-6">
                    <Calendar className={`w-8 h-8 ${theme.textPrimary500} mr-3`} />
                    <h3 className="text-3xl font-serif text-gray-800">{event.name}</h3>
                  </div>

                  {timeLeft[event._id] && (
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className={`text-4xl font-bold ${theme.textPrimary600}`}>
                          {timeLeft[event._id].days}
                        </div>
                        <div className="text-sm text-gray-600">Gün</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-4xl font-bold ${theme.textPrimary600}`}>
                          {timeLeft[event._id].hours}
                        </div>
                        <div className="text-sm text-gray-600">Saat</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-4xl font-bold ${theme.textPrimary600}`}>
                          {timeLeft[event._id].minutes}
                        </div>
                        <div className="text-sm text-gray-600">Dakika</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-4xl font-bold ${theme.textPrimary600}`}>
                          {timeLeft[event._id].seconds}
                        </div>
                        <div className="text-sm text-gray-600">Saniye</div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-center">
                      <Calendar className={`w-5 h-5 mr-2 ${theme.textPrimary500}`} />
                      <span>{new Date(event.date).toLocaleDateString('tr-TR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className={`w-5 h-5 mr-2 ${theme.textPrimary500}`} />
                      <span>{new Date(event.date).toLocaleTimeString('tr-TR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center">
                        <MapPin className={`w-5 h-5 mr-2 ${theme.textPrimary500}`} />
                        <span>{event.location}</span>
                      </div>
                    )}
                    {event.description && (
                      <p className="mt-4 text-gray-600">{event.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Timeline Section */}
      {timeline.length > 0 && (
        <div className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-5xl font-script ${theme.textPrimary600} text-center mb-16`}>
              Düğün Programı
            </h2>
            <div className="relative">
              {/* Vertical Line */}
              <div className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 ${theme.bgPrimary300}`}></div>

              {/* Timeline Items */}
              <div className="space-y-8">
                {timeline.map((item, index) => {
                  const iconMap = {
                    heart: '❤️',
                    camera: '📸',
                    music: '🎵',
                    cake: '🎂',
                    users: '👥',
                    calendar: '📅',
                    mappin: '📍',
                    clock: '🕐'
                  }

                  return (
                    <div
                      key={item._id}
                      className={`relative flex items-center ${
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* Icon Circle */}
                      <div className={`absolute left-8 md:left-1/2 w-16 h-16 bg-white border-4 ${theme.borderPrimary500} rounded-full flex items-center justify-center text-2xl transform md:-translate-x-1/2 z-10`}>
                        {iconMap[item.icon] || '❤️'}
                      </div>

                      {/* Content Card */}
                      <div
                        className={`ml-24 md:ml-0 flex-1 ${
                          index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                        }`}
                      >
                        <div className={`bg-gradient-to-br ${theme.bgPrimary50} to-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow border ${theme.borderPrimary100}`}>
                          <div className="flex items-center space-x-2 mb-3">
                            <Clock className={`w-5 h-5 ${theme.textPrimary500}`} />
                            <span className={`text-xl font-bold ${theme.textPrimary600}`}>{item.time}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h3>
                          {item.description && (
                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Gallery */}
      {photos.length > 0 && (
        <div className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className={`text-5xl font-script ${theme.textPrimary600} text-center mb-16`}>
              Anılarımız
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map(photo => (
                <div
                  key={photo._id}
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg aspect-square"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={`${API_URL}${photo.url}`}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="font-medium">{photo.title}</p>
                      {photo.description && (
                        <p className="text-sm text-gray-200">{photo.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-4xl w-full">
            <img
              src={`${API_URL}${selectedPhoto.url}`}
              alt={selectedPhoto.title}
              className="w-full h-auto rounded-lg"
            />
            <div className="text-white text-center mt-4">
              <h3 className="text-2xl font-serif mb-2">{selectedPhoto.title}</h3>
              {selectedPhoto.description && (
                <p className="text-gray-300">{selectedPhoto.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className={`bg-gradient-to-r ${theme.bgPrimary600} ${theme.bgPrimary700} text-white py-12`}>
        <div className="text-center">
          <Heart className="w-12 h-12 mx-auto mb-4" />
          <p className="text-2xl font-script mb-2">{settings.coupleNames}</p>
          <p className="text-white/80">Sevgiyle, {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  )
}

export default Home
