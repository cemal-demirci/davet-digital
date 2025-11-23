import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Baby, Calendar, MapPin, Clock, Camera, Users, Loader, AlertCircle } from 'lucide-react'
import { API_URL } from '../config'

const BabyShowerSite = () => {
  const { slug } = useParams()
  const [tenant, setTenant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        // Get subdomain from hostname if not in URL params
        const hostname = window.location.hostname
        const subdomain = hostname.split('.')[0]
        const tenantSlug = slug || (subdomain !== 'www' && subdomain !== 'davet' ? subdomain : null)

        if (!tenantSlug) {
          setError('Baby shower sitesi bulunamadı.')
          setLoading(false)
          return
        }

        const response = await axios.get(`${API_URL}/api/tenants/${tenantSlug}`)
        setTenant(response.data)
        setLoading(false)
      } catch (error) {
        setError(error.response?.data?.error || 'Baby shower yüklenirken bir hata oluştu.')
        setLoading(false)
      }
    }

    fetchTenant()
  }, [slug])

  // Countdown timer
  useEffect(() => {
    if (!tenant?.expectedDate) return

    const updateCountdown = () => {
      const expectedDate = new Date(tenant.expectedDate)
      const now = new Date()
      const diff = expectedDate - now

      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        })
      }
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [tenant])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-100 to-sky-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-cyan-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Baby shower yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error || !tenant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-100 to-sky-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sayfa Bulunamadı</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <a href="https://www.davet.digital" className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg transition-all">
            Ana Sayfaya Dön
          </a>
        </div>
      </div>
    )
  }

  const expectedDate = new Date(tenant.expectedDate)
  const formattedDate = expectedDate.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-sky-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-500 text-white py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <Baby className="w-20 h-20 animate-pulse" />
          </div>
          <h1 className="text-6xl md:text-7xl font-script mb-6">
            {tenant.parentNames_baby}
          </h1>
          <div className="flex items-center justify-center space-x-3 text-xl md:text-2xl">
            <Calendar className="w-6 h-6" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Countdown Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-script text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mb-12">
            Partiye Kalan Süre
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl p-6 text-center text-white shadow-xl">
              <p className="text-5xl font-bold mb-2">{countdown.days}</p>
              <p className="text-lg font-medium">Gün</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-center text-white shadow-xl">
              <p className="text-5xl font-bold mb-2">{countdown.hours}</p>
              <p className="text-lg font-medium">Saat</p>
            </div>
            <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl p-6 text-center text-white shadow-xl">
              <p className="text-5xl font-bold mb-2">{countdown.minutes}</p>
              <p className="text-lg font-medium">Dakika</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 text-center text-white shadow-xl animate-pulse">
              <p className="text-5xl font-bold mb-2">{countdown.seconds}</p>
              <p className="text-lg font-medium">Saniye</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {tenant.features.qrCodeUpload && (
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fotoğraf Galerisi</h3>
                <p className="text-gray-600">Anılarınızı bizimle paylaşın</p>
              </div>
            )}

            {tenant.features.livePhotoWall && (
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Canlı Fotoğraf Duvarı</h3>
                <p className="text-gray-600">Gerçek zamanlı fotoğraf akışı</p>
              </div>
            )}

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Konum Bilgisi</h3>
              <p className="text-gray-600">Parti mekanımız</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Baby className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
          <p className="text-lg mb-2">{tenant.parentNames_baby}</p>
          <p className="text-gray-400 text-sm">
            Bu baby shower sitesi <a href="https://www.davet.digital" className="text-cyan-400 hover:text-cyan-300">Davet Digital</a> ile oluşturulmuştur
          </p>
        </div>
      </div>
    </div>
  )
}

export default BabyShowerSite
