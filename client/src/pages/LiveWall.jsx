import { useState, useEffect } from 'react'
import { Heart, User } from 'lucide-react'
import axios from 'axios'

const API_URL = 'http://localhost:5001'

const LiveWall = () => {
  const [photos, setPhotos] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 10000) // Her 10 saniyede güncelle
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (photos.length === 0) return

    const slideInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length)
    }, 5000) // 5 saniyede bir değişir

    return () => clearInterval(slideInterval)
  }, [photos.length])

  const fetchData = async () => {
    try {
      const [adminPhotos, guestPhotos, settingsRes] = await Promise.all([
        axios.get(`${API_URL}/api/photos`),
        axios.get(`${API_URL}/api/guest-photos`),
        axios.get(`${API_URL}/api/settings`)
      ])

      setSettings(settingsRes.data)

      const photoList = []

      // Admin fotoğraflarını ekle (eğer ayarda açıksa)
      if (settingsRes.data.liveWallShowAdminPhotos) {
        const admin = adminPhotos.data.map(p => ({ ...p, type: 'admin' }))
        photoList.push(...admin)
      }

      // Misafir fotoğraflarını ekle (eğer ayarda açıksa ve onaylı ise)
      if (settingsRes.data.liveWallShowGuestPhotos) {
        const approvedGuest = guestPhotos.data
          .filter(p => p.approved)
          .map(p => ({ ...p, type: 'guest' }))
        photoList.push(...approvedGuest)
      }

      setPhotos(photoList)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // Eğer LiveWall kapalıysa
  if (settings && !settings.liveWallEnabled) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-romantic-100 to-gold-100 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-24 h-24 text-romantic-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-6xl font-script text-romantic-600 mb-4">
            {settings?.coupleNames || 'Düğünümüze Hoşgeldiniz'}
          </h1>
          <p className="text-2xl text-gray-700">Canlı Duvar şu anda kapalı</p>
        </div>
      </div>
    )
  }

  if (!settings || photos.length === 0) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-romantic-100 to-gold-100 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-24 h-24 text-romantic-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-6xl font-script text-romantic-600 mb-4">
            {settings?.coupleNames || 'Düğünümüze Hoşgeldiniz'}
          </h1>
          <p className="text-2xl text-gray-700">Fotoğraflar yükleniyor...</p>
        </div>
      </div>
    )
  }

  const currentPhoto = photos[currentIndex]

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-2xl opacity-30"
        style={{ backgroundImage: `url(${API_URL}${currentPhoto.url})` }}
      ></div>

      {/* Main Content */}
      <div className="relative w-full h-full flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-b from-black/80 to-transparent p-8 text-center">
          <h1 className="text-6xl font-script text-white mb-2">
            {settings.coupleNames}
          </h1>
          <p className="text-2xl text-white/80">Anılarımız</p>
        </div>

        {/* Photo Display */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-7xl max-h-full">
            <img
              src={`${API_URL}${currentPhoto.url}`}
              alt={currentPhoto.title || currentPhoto.guestName || 'Photo'}
              className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
              key={currentIndex} // Force re-render for animation
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-gradient-to-t from-black/80 to-transparent p-8">
          <div className="max-w-4xl mx-auto">
            {currentPhoto.type === 'guest' && currentPhoto.guestName && (
              <div className="flex items-center justify-center space-x-3 mb-4">
                <User className="w-8 h-8 text-white" />
                <span className="text-3xl text-white font-semibold">
                  {currentPhoto.guestName}
                </span>
              </div>
            )}
            {currentPhoto.title && (
              <h3 className="text-4xl text-white text-center font-bold mb-2">
                {currentPhoto.title}
              </h3>
            )}
            {currentPhoto.description && (
              <p className="text-2xl text-white/80 text-center">
                {currentPhoto.description}
              </p>
            )}
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 flex items-center justify-center space-x-2">
            {photos.slice(0, 20).map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex % 20
                    ? 'w-12 bg-white'
                    : 'w-2 bg-white/40'
                }`}
              ></div>
            ))}
            {photos.length > 20 && (
              <span className="text-white/60 ml-2">+{photos.length - 20}</span>
            )}
          </div>
        </div>
      </div>

      {/* Counter */}
      <div className="absolute top-8 right-8 bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full">
        <span className="text-white text-2xl font-semibold">
          {currentIndex + 1} / {photos.length}
        </span>
      </div>
    </div>
  )
}

export default LiveWall
