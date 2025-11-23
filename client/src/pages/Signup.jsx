import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { Heart, Sparkles, Check, AlertCircle, Loader } from 'lucide-react'
import SEO from '../components/SEO'
import MarketingNavbar from '../components/MarketingNavbar'
import MarketingFooter from '../components/MarketingFooter'
import FloatingDecor from '../components/FloatingDecor'
import { API_URL } from '../config'


const Signup = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [slugAvailable, setSlugAvailable] = useState(null)
  const [slugMessage, setSlugMessage] = useState('') // For easter egg or unavailable reason
  const [checkingSlug, setCheckingSlug] = useState(false)
  const [acceptedEULA, setAcceptedEULA] = useState(false)

  const [formData, setFormData] = useState({
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    coupleNames: '',
    weddingDate: '',
    slug: '',
    plan: 'premium'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Auto-generate slug from couple names
    if (name === 'coupleNames' && value) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/ç/g, 'c')
        .replace(/ğ/g, 'g')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ş/g, 's')
        .replace(/ü/g, 'u')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      setFormData(prev => ({ ...prev, slug: generatedSlug }))
      checkSlugAvailability(generatedSlug)
    }

    // Check slug availability when manually changed
    if (name === 'slug') {
      checkSlugAvailability(value)
    }
  }

  const checkSlugAvailability = async (slug) => {
    if (!slug || slug.length < 3) {
      setSlugAvailable(null)
      setSlugMessage('')
      return
    }

    setCheckingSlug(true)
    try {
      const response = await axios.get(`${API_URL}/api/tenants/check-slug/${slug}`)
      setSlugAvailable(response.data.available)
      setSlugMessage(response.data.reason || '') // Store the reason (easter egg message)
    } catch (error) {
      console.error('Error checking slug:', error)
    } finally {
      setCheckingSlug(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!acceptedEULA) {
      setError('Lütfen Kullanıcı Sözleşmesini kabul edin.')
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(`${API_URL}/api/tenants/register`, formData)

      // Store tenant info in localStorage
      localStorage.setItem('tenantId', response.data.tenant.id)
      localStorage.setItem('tenantSlug', response.data.tenant.slug)

      // Redirect to admin page with success message
      navigate(`/admin?welcome=true&slug=${response.data.tenant.slug}`)
    } catch (error) {
      setError(error.response?.data?.error || 'Kayıt sırasında bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  const plans = [
    {
      name: 'Temel',
      value: 'temel',
      price: '₺999',
      color: 'from-pink-500 to-rose-500',
      features: ['3 Premium Tema', '50 Misafir', '30 Gün Erişim']
    },
    {
      name: 'Premium',
      value: 'premium',
      price: '₺2.499',
      color: 'from-purple-500 to-pink-500',
      features: ['10 Premium Tema', '200 Misafir', 'QR Kod Sistemi', 'Canlı Fotoğraf Duvarı', '90 Gün Erişim'],
      popular: true
    },
    {
      name: 'Platinum',
      value: 'platinum',
      price: '₺4.999',
      color: 'from-amber-500 to-yellow-500',
      features: ['Sınırsız Her Şey', 'Çoklu Dil', 'Ömür Boyu Erişim', 'Özel Destek']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white">
      <FloatingDecor />
      <SEO
        title="Kayıt Ol - Davet Digital | 14 Günlük Ücretsiz Deneme"
        description="Davet Digital'e kaydolun ve dakikalar içinde mükemmel düğün sitenizi oluşturun. Özel alt alan adı, 10 premium tema, QR kod sistemi. Kredi kartı gerektirmez."
        keywords="düğün sitesi kayıt, düğün davetiyesi oluştur, online davetiye kayıt, ücretsiz deneme"
        url="https://davet.digital/signup"
      />
      <MarketingNavbar />

      <div className="pt-20 pb-24">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Heart className="w-16 h-16 text-pink-500 animate-pulse" />
            <Sparkles className="w-8 h-8 text-purple-500 absolute -top-2 -right-2 animate-bounce" />
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-script text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 mb-4">
          Düğün Sitenizi Oluşturun
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          14 günlük ücretsiz deneme ile başlayın
        </p>
        <p className="text-sm text-gray-500">
          Kredi kartı gerektirmez • İstediğiniz zaman iptal edin
        </p>
      </div>

      {/* Signup Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Kişisel Bilgiler</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adınız Soyadınız *
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    required
                    value={formData.ownerName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Cemal Demirci"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="ownerEmail"
                    required
                    value={formData.ownerEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="cemal@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="ownerPhone"
                    value={formData.ownerPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="+90 555 123 4567"
                  />
                </div>
              </div>
            </div>

            {/* Wedding Info */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Düğün Bilgileri</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Çift İsimleri *
                  </label>
                  <input
                    type="text"
                    name="coupleNames"
                    required
                    value={formData.coupleNames}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ayşe & Mehmet"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Düğün Tarihi *
                  </label>
                  <input
                    type="date"
                    name="weddingDate"
                    required
                    value={formData.weddingDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Özel Alt Alan Adınız (Subdomain) *
                  </label>
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 mb-3">
                    <p className="text-sm text-purple-800">
                      💡 Sizin için otomatik <span className="font-bold">alt alan adı</span> oluşturuyoruz!
                    </p>
                    <p className="text-xs text-purple-600 mt-1">
                      Örnek: <span className="font-mono bg-white px-2 py-0.5 rounded">ayse-mehmet.davet.digital</span>
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      name="slug"
                      required
                      value={formData.slug}
                      onChange={handleChange}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono"
                      placeholder="ayse-mehmet"
                    />
                    <span className="text-gray-500 text-sm font-medium">.davet.digital</span>
                    {checkingSlug && <Loader className="w-5 h-5 text-gray-400 animate-spin" />}
                    {!checkingSlug && slugAvailable === true && (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                    {!checkingSlug && slugAvailable === false && (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  {slugAvailable === false && (
                    <p className="mt-2 text-sm text-red-600">
                      ❌ {slugMessage || 'Bu alt alan adı zaten kullanılıyor. Başka bir isim deneyin.'}
                    </p>
                  )}
                  {slugAvailable === true && (
                    <p className="mt-2 text-sm text-green-600">✅ Harika! <span className="font-mono font-bold">{formData.slug}.davet.digital</span> sizin olacak!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Plan Selection */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Paket Seçimi</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <label
                    key={plan.value}
                    className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all ${
                      formData.plan === plan.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    } ${plan.popular ? 'ring-2 ring-purple-500 ring-offset-2' : ''}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-xs font-semibold">
                        EN POPÜLER
                      </div>
                    )}
                    <input
                      type="radio"
                      name="plan"
                      value={plan.value}
                      checked={formData.plan === plan.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${plan.color} mb-4`}></div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
                    <p className="text-3xl font-bold text-gray-900 mb-4">{plan.price}</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </label>
                ))}
              </div>
            </div>

            {/* EULA Checkbox */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-start space-x-3 mb-6 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                <input
                  type="checkbox"
                  id="acceptEULA"
                  checked={acceptedEULA}
                  onChange={(e) => setAcceptedEULA(e.target.checked)}
                  className="mt-1 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 cursor-pointer"
                />
                <label htmlFor="acceptEULA" className="text-sm text-gray-700 cursor-pointer">
                  <Link to="/eula" target="_blank" className="text-purple-600 hover:underline font-semibold">
                    Kullanıcı Sözleşmesini
                  </Link>
                  {' '}okudum, anladım ve kabul ediyorum. *
                </label>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={loading || slugAvailable === false || !formData.slug || !acceptedEULA}
                className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-2xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Oluşturuluyor...
                  </span>
                ) : (
                  '14 Günlük Ücretsiz Denemeyi Başlat'
                )}
              </button>
              <p className="mt-4 text-center text-sm text-gray-500">
                Zaten hesabınız var mı?{' '}
                <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                  Giriş Yapın
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900">14 Gün Ücretsiz</h4>
            <p className="text-sm text-gray-600">Kredi kartı gerektirmez</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900">500+ Mutlu Çift</h4>
            <p className="text-sm text-gray-600">Bize güveniyor</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Hızlı Kurulum</h4>
            <p className="text-sm text-gray-600">5 dakikada hazır</p>
          </div>
        </div>
      </div>
      </div>

      <MarketingFooter />
    </div>
  )
}

export default Signup
