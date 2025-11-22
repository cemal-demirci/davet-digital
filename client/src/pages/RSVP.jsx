import { useState, useEffect } from 'react'
import { Check, X, Users, Mail, Phone, AlertCircle, Heart } from 'lucide-react'
import axios from 'axios'

const API_URL = 'http://localhost:5001'

const RSVP = () => {
  const [settings, setSettings] = useState(null)
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    attendance: 'maybe',
    guestCount: 1,
    dietaryRestrictions: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [backgroundPhotos, setBackgroundPhotos] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [settingsRes, photosRes] = await Promise.all([
        axios.get(`${API_URL}/api/settings`),
        axios.get(`${API_URL}/api/photos`)
      ])
      setSettings(settingsRes.data)
      setBackgroundPhotos(photosRes.data.slice(0, 4))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.guestName || !formData.email) {
      alert('Lütfen adınızı ve email adresinizi girin!')
      return
    }

    setLoading(true)

    try {
      await axios.post(`${API_URL}/api/rsvps`, formData)
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting RSVP:', error)
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-romantic-50 to-gold-50 flex items-center justify-center">
        <Heart className="w-16 h-16 text-romantic-500 animate-pulse" />
      </div>
    )
  }

  if (!settings.rsvpEnabled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-romantic-50 to-gold-50 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">RSVP Kapalı</h2>
          <p className="text-gray-600">Şu anda RSVP kabul edilmiyor.</p>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Photos */}
        {backgroundPhotos.length > 0 && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {backgroundPhotos.map((photo, index) => (
              <div
                key={photo._id}
                className="absolute animate-float"
                style={{
                  top: `${10 + index * 25}%`,
                  left: index % 2 === 0 ? '5%' : 'auto',
                  right: index % 2 === 1 ? '5%' : 'auto',
                  animationDelay: `${index * 1.5}s`
                }}
              >
                <img
                  src={`${API_URL}${photo.url}`}
                  alt=""
                  className="w-40 h-40 object-cover rounded-full opacity-10 blur-sm"
                />
              </div>
            ))}
          </div>
        )}

        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center relative z-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-script text-romantic-600 mb-4">
            Teşekkürler! 🎉
          </h2>
          <p className="text-gray-700 mb-2">
            {formData.attendance === 'yes' && '✓ Katılacaksınız! Sizi aramızda görmekten mutluluk duyacağız!'}
            {formData.attendance === 'no' && 'Katılamayacağınızı bildirdiğiniz için teşekkürler.'}
            {formData.attendance === 'maybe' && 'Yanıtınız için teşekkürler. Kesinleştiğinde bizi bilgilendirin.'}
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Email adresinize onay mesajı gönderildi.
          </p>
          {formData.attendance === 'yes' && formData.guestCount > 1 && (
            <p className="text-sm text-gray-600 mt-2">
              {formData.guestCount} kişi için kayıt alındı.
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-romantic-50 via-white to-gold-50 pt-8 pb-12 px-4 relative overflow-hidden">
      {/* Background Photos */}
      {backgroundPhotos.length > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {backgroundPhotos.map((photo, index) => (
            <div
              key={photo._id}
              className="absolute animate-float"
              style={{
                top: `${10 + index * 25}%`,
                left: index % 2 === 0 ? '5%' : 'auto',
                right: index % 2 === 1 ? '5%' : 'auto',
                animationDelay: `${index * 1.5}s`
              }}
            >
              <img
                src={`${API_URL}${photo.url}`}
                alt=""
                className="w-40 h-40 object-cover rounded-full opacity-10 blur-sm"
              />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Heart className="w-16 h-16 text-romantic-500 mx-auto mb-4 animate-pulse" />
          <h1 className="text-5xl font-script text-romantic-600 mb-4">
            Davetlisiniz
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            {settings.coupleNames}
          </p>
          <p className="text-gray-600">
            Lütfen katılım durumunuzu bize bildirin
          </p>
        </div>

        {/* RSVP Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adınız Soyadınız *
              </label>
              <input
                type="text"
                required
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                placeholder="Adınız Soyadınız"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                placeholder="ornek@email.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Telefon
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                placeholder="0555 555 55 55"
              />
            </div>

            {/* Attendance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Katılım Durumu *
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'yes' })}
                  className={`py-4 px-4 rounded-lg border-2 transition-all ${
                    formData.attendance === 'yes'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-green-300'
                  }`}
                >
                  <Check className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm font-semibold">Katılacağım</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'no' })}
                  className={`py-4 px-4 rounded-lg border-2 transition-all ${
                    formData.attendance === 'no'
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-300 hover:border-red-300'
                  }`}
                >
                  <X className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm font-semibold">Katılamam</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'maybe' })}
                  className={`py-4 px-4 rounded-lg border-2 transition-all ${
                    formData.attendance === 'maybe'
                      ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                      : 'border-gray-300 hover:border-yellow-300'
                  }`}
                >
                  <AlertCircle className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm font-semibold">Emin Değilim</span>
                </button>
              </div>
            </div>

            {/* Guest Count */}
            {formData.attendance === 'yes' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
                  Kaç Kişi Geleceksiniz?
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Dietary Restrictions */}
            {formData.attendance === 'yes' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diyet Kısıtlamalarınız
                </label>
                <input
                  type="text"
                  value={formData.dietaryRestrictions}
                  onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent"
                  placeholder="Vejetaryen, glutensiz, vb."
                />
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mesajınız
              </label>
              <textarea
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-romantic-500 focus:border-transparent resize-none"
                placeholder="Çift için mesajınız (Opsiyonel)"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-lg font-semibold text-white transition-colors ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-romantic-500 hover:bg-romantic-600'
              }`}
            >
              {loading ? 'Gönderiliyor...' : 'Yanıtı Gönder'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RSVP
