import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Lock, X, ChevronLeft, ChevronRight, User, Calendar, CheckCircle, XCircle } from 'lucide-react'
import axios from 'axios'

const API_URL = 'http://localhost:5001'

const GuestGalleryView = () => {
  const { code } = useParams()
  const [accessCode, setAccessCode] = useState(code || '')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [photos, setPhotos] = useState([])
  const [settings, setSettings] = useState(null)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    if (code) {
      verifyCode(code)
    }
  }, [code])

  const verifyCode = async (codeToVerify) => {
    try {
      const settingsRes = await axios.get(`${API_URL}/api/settings`)
      setSettings(settingsRes.data)

      if (!settingsRes.data.guestGalleryAccessCode) {
        setError('Galeri erişim kodu ayarlanmamış')
        return
      }

      if (settingsRes.data.guestGalleryAccessCode === codeToVerify) {
        setIsAuthenticated(true)
        fetchPhotos()
      } else {
        setError('Geçersiz kod!')
      }
    } catch (error) {
      console.error('Error verifying code:', error)
      setError('Bir hata oluştu')
    }
  }

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/guest-photos`)
      setPhotos(response.data.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)))
    } catch (error) {
      console.error('Error fetching photos:', error)
    }
  }

  const handleSubmitCode = (e) => {
    e.preventDefault()
    setError('')
    verifyCode(accessCode)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <Lock className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <h1 className="text-3xl font-script text-purple-600 mb-2">
              Misafir Galerisi
            </h1>
            <p className="text-gray-600">
              Tüm misafir fotoğraflarını görmek için erişim kodunu girin
            </p>
          </div>

          <form onSubmit={handleSubmitCode} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Erişim Kodu
              </label>
              <input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                placeholder="DUG2024"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent uppercase"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors font-medium"
            >
              Giriş Yap
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              💡 Erişim kodunu düğün sahiplerinden alabilirsiniz
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pt-8 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-script text-purple-600 mb-4">
            Misafir Galerisi
          </h1>
          <p className="text-gray-700 text-lg">
            {photos.length} fotoğraf yüklendi
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-700">
                {photos.filter(p => p.approved).length} Onaylı
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-full">
              <XCircle className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-yellow-700">
                {photos.filter(p => !p.approved).length} Onay Bekliyor
              </span>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {photos.map((photo, index) => (
            <div
              key={photo._id}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => {
                setSelectedPhoto(photo)
                setCurrentIndex(index)
              }}
            >
              <img
                src={`${API_URL}${photo.url}`}
                alt={photo.guestName}
                className="w-full h-full object-cover"
              />

              {/* Status Badge */}
              {photo.approved ? (
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Onaylı</span>
                </div>
              ) : (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                  <XCircle className="w-3 h-3" />
                  <span>Beklemede</span>
                </div>
              )}

              {/* Info Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <p className="font-semibold text-sm truncate flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {photo.guestName}
                  </p>
                  <p className="text-xs text-gray-300 flex items-center mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(photo.uploadDate).toLocaleDateString('tr-TR')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {photos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Henüz fotoğraf yüklenmemiş</p>
          </div>
        )}

        {/* Lightbox */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedPhoto(null)}
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
                src={`${API_URL}${photos[currentIndex]?.url}`}
                alt={photos[currentIndex]?.guestName}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />

              {/* Info */}
              <div className="mt-4 text-center text-white">
                <div className="flex items-center justify-center space-x-4 mb-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span className="text-xl font-semibold">{photos[currentIndex]?.guestName}</span>
                  </div>
                  {photos[currentIndex]?.approved ? (
                    <div className="bg-green-500 px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>Onaylı</span>
                    </div>
                  ) : (
                    <div className="bg-yellow-500 px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                      <XCircle className="w-4 h-4" />
                      <span>Onay Bekliyor</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-400">
                  {new Date(photos[currentIndex]?.uploadDate).toLocaleString('tr-TR')}
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  {currentIndex + 1} / {photos.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GuestGalleryView
