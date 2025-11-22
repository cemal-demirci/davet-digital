import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Play, Pause, Download, PackageOpen, Share2 } from 'lucide-react'
import axios from 'axios'

const API_URL = 'http://localhost:5001'

const Gallery = () => {
  const [photos, setPhotos] = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [isSlideshow, setIsSlideshow] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchPhotos()
  }, [])

  useEffect(() => {
    let interval
    if (isSlideshow && photos.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % photos.length)
      }, 3000) // 3 saniyede bir değişir
    }
    return () => clearInterval(interval)
  }, [isSlideshow, photos.length])

  const fetchPhotos = async () => {
    try {
      const [adminPhotos, guestPhotos] = await Promise.all([
        axios.get(`${API_URL}/api/photos`),
        axios.get(`${API_URL}/api/guest-photos`)
      ])

      // Sadece onaylı misafir fotoğraflarını al
      const approvedGuest = guestPhotos.data
        .filter(p => p.approved)
        .map(p => ({ ...p, type: 'guest', category: 'guest' }))

      const admin = adminPhotos.data.map(p => ({ ...p, type: 'admin' }))

      setPhotos([...admin, ...approvedGuest])
    } catch (error) {
      console.error('Error fetching photos:', error)
    }
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const handleDownload = async (photoUrl) => {
    try {
      const response = await fetch(`${API_URL}${photoUrl}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `wedding-photo-${Date.now()}.jpg`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download error:', error)
      alert('İndirme hatası!')
    }
  }

  const handleDownloadAll = () => {
    window.location.href = `${API_URL}/api/photos/download-all`
  }

  const shareGalleryViaWhatsApp = () => {
    const message = `💒 Düğün Foto\u011fraflar\u0131m\u0131za göz at\u0131n!\n\nEn güzel anlar\u0131m\u0131z\u0131 sizinle payla\u015f\u0131yoruz 📸\n\n${window.location.origin}/gallery`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const sharePhotoViaWhatsApp = (photo) => {
    const photoUrl = `${API_URL}${photo.url}`
    const message = `💒 Düğün fotoğraflarından biri!\n\n${photo.title || photo.guestName || 'Anılarımızdan...'}\n\n📷 Tüm fotoğraflar: ${window.location.origin}/gallery`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const filteredPhotos = photos.filter(photo => {
    if (filter === 'all') return true
    if (filter === 'guest') return photo.type === 'guest'
    return photo.category === filter
  })

  const categories = ['all', 'guest', ...new Set(photos.filter(p => p.type === 'admin').map(p => p.category))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 pt-8 pb-8 px-4 relative overflow-hidden">
      {/* Background Photos - Animated */}
      {filteredPhotos.length > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {filteredPhotos.slice(0, 5).map((photo, index) => (
            <div
              key={`bg-${photo._id}`}
              className="absolute animate-float"
              style={{
                top: `${5 + index * 20}%`,
                left: index % 2 === 0 ? '2%' : 'auto',
                right: index % 2 === 1 ? '2%' : 'auto',
                animationDelay: `${index * 1}s`,
                animationDuration: '18s'
              }}
            >
              <img
                src={`${API_URL}${photo.url}`}
                alt=""
                className="w-56 h-56 object-cover rounded-2xl opacity-5 blur-md transform rotate-12"
              />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-script text-romantic-600 mb-4">Anılarımız</h1>
          <p className="text-gray-700 text-lg">En güzel anlarımızı sizlerle paylaşıyoruz</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === cat
                      ? 'bg-romantic-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'all' ? 'Tümü' : cat === 'guest' ? 'Misafir Fotoğrafları' : cat}
                </button>
              ))}
            </div>

            {/* Slideshow Control */}
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setIsSlideshow(!isSlideshow)
                  if (!isSlideshow) setSelectedPhoto(filteredPhotos[0])
                }}
                className="flex items-center space-x-2 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                {isSlideshow ? (
                  <>
                    <Pause className="w-5 h-5" />
                    <span>Durdur</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span>Slideshow Başlat</span>
                  </>
                )}
              </button>
              <button
                onClick={handleDownloadAll}
                className="flex items-center space-x-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <PackageOpen className="w-5 h-5" />
                <span>Tümünü İndir (ZIP)</span>
              </button>
              <button
                onClick={shareGalleryViaWhatsApp}
                className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>WhatsApp'ta Paylaş</span>
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo._id}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => {
                setSelectedPhoto(photo)
                setCurrentIndex(index)
                setIsSlideshow(false)
              }}
            >
              <img
                src={`${API_URL}${photo.url}`}
                alt={photo.title || photo.guestName || 'Photo'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold">{photo.title || photo.guestName}</p>
                  {photo.type === 'guest' && (
                    <p className="text-xs text-gray-300">Misafir Fotoğrafı</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Henüz fotoğraf yok</p>
          </div>
        )}

        {/* Lightbox / Slideshow */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <button
              onClick={() => {
                setSelectedPhoto(null)
                setIsSlideshow(false)
              }}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            <button
              onClick={handlePrev}
              className="absolute left-4 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 text-white hover:text-gray-300 z-10"
            >
              <ChevronRight className="w-12 h-12" />
            </button>

            {/* Image */}
            <div className="max-w-6xl max-h-[80vh] flex flex-col items-center">
              <img
                src={`${API_URL}${filteredPhotos[currentIndex]?.url}`}
                alt={filteredPhotos[currentIndex]?.title || 'Photo'}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />

              {/* Info & Actions */}
              <div className="mt-4 text-center text-white">
                <h3 className="text-xl font-semibold mb-2">
                  {filteredPhotos[currentIndex]?.title || filteredPhotos[currentIndex]?.guestName}
                </h3>
                {filteredPhotos[currentIndex]?.description && (
                  <p className="text-gray-300 mb-4">{filteredPhotos[currentIndex].description}</p>
                )}
                {filteredPhotos[currentIndex]?.type === 'guest' && (
                  <p className="text-sm text-gray-400 mb-4">
                    Yükleyen: {filteredPhotos[currentIndex].guestName}
                  </p>
                )}

                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => handleDownload(filteredPhotos[currentIndex]?.url)}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    <span>İndir</span>
                  </button>
                  <button
                    onClick={() => sharePhotoViaWhatsApp(filteredPhotos[currentIndex])}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500/80 hover:bg-green-600/80 rounded-lg transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Paylaş</span>
                  </button>
                  <button
                    onClick={() => setIsSlideshow(!isSlideshow)}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    {isSlideshow ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    <span>{isSlideshow ? 'Durdur' : 'Otomatik'}</span>
                  </button>
                </div>

                <p className="text-sm text-gray-400 mt-4">
                  {currentIndex + 1} / {filteredPhotos.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Gallery
