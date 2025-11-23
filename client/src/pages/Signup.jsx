import { useState, useEffect } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { Heart, Sparkles, Check, AlertCircle, Loader, Building2, PartyPopper } from 'lucide-react'
import SEO from '../components/SEO'
import MarketingNavbar from '../components/MarketingNavbar'
import MarketingFooter from '../components/MarketingFooter'
import FloatingDecor from '../components/FloatingDecor'
import { API_URL } from '../config'


const Signup = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const eventType = searchParams.get('type') || 'wedding' // 'wedding', 'corporate', or 'circumcision'

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
    username: '',
    password: '',
    confirmPassword: '',
    eventType: eventType,
    // Wedding fields
    coupleNames: '',
    weddingDate: '',
    // Engagement fields
    partnerNames: '',
    engagementDate: '',
    // Corporate fields
    companyName: '',
    eventName: '',
    eventDate: '',
    eventType_detail: '',
    organizerName: '',
    organizerTitle: '',
    // Circumcision fields
    childName: '',
    circumcisionDate: '',
    parentNames: '',
    // Birthday fields
    celebrantName: '',
    birthDate: '',
    age: '',
    // Graduation fields
    graduateName: '',
    graduationDate: '',
    school: '',
    degree: '',
    // Baby Shower fields
    parentNames_baby: '',
    expectedDate: '',
    babyGender: '',
    // Common fields
    slug: '',
    plan: 'premium'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Auto-generate slug based on event type
    const slugSourceFields = {
      wedding: 'coupleNames',
      engagement: 'partnerNames',
      corporate: 'eventName',
      circumcision: 'childName',
      birthday: 'celebrantName',
      graduation: 'graduateName',
      'baby-shower': 'parentNames_baby'
    }

    const shouldGenerateSlug = name === slugSourceFields[eventType] && value

    if (shouldGenerateSlug) {
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

      // Store tenant info in localStorage for convenience
      localStorage.setItem('tenantSlug', response.data.tenant.slug)
      localStorage.setItem('username', response.data.tenant.username)

      // Redirect to login page with success message
      navigate(`/login?registered=true&username=${response.data.tenant.username}`)
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
        title="Kayıt Ol - Davet Digital | 30 Günlük Ücretsiz Deneme"
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
            {eventType === 'wedding' ? (
              <>
                <Heart className="w-16 h-16 text-pink-500 animate-pulse" />
                <Sparkles className="w-8 h-8 text-purple-500 absolute -top-2 -right-2 animate-bounce" />
              </>
            ) : eventType === 'corporate' ? (
              <Building2 className="w-16 h-16 text-blue-500" />
            ) : (
              <PartyPopper className="w-16 h-16 text-amber-500" />
            )}
          </div>
        </div>
        <h1 className={`text-5xl md:text-6xl ${eventType === 'wedding' ? 'font-script' : 'font-bold'} text-transparent bg-clip-text bg-gradient-to-r ${
          eventType === 'wedding' ? 'from-pink-600 via-purple-600 to-blue-600' : eventType === 'corporate' ? 'from-blue-600 via-cyan-600 to-blue-700' : 'from-amber-600 via-orange-600 to-amber-700'
        } mb-4`}>
          {eventType === 'wedding' ? 'Düğün Sitenizi Oluşturun' : eventType === 'corporate' ? 'Kurumsal Etkinlik Sitenizi Oluşturun' : 'Sünnet Sitenizi Oluşturun'}
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          30 günlük ücretsiz deneme ile başlayın
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
                    Kullanıcı Adı *
                  </label>
                  <input
                    type="text"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="cemaldemirci"
                    minLength={3}
                  />
                  <p className="mt-1 text-xs text-gray-500">Minimum 3 karakter</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şifre *
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="••••••••"
                    minLength={6}
                  />
                  <p className="mt-1 text-xs text-gray-500">Minimum 6 karakter</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şifre Tekrar *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="••••••••"
                    minLength={6}
                  />
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="mt-1 text-xs text-red-600">Şifreler eşleşmiyor</p>
                  )}
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

            {/* Event Info - Dynamic based on event type */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {eventType === 'wedding' && 'Düğün Bilgileri'}
                {eventType === 'engagement' && 'Nişan Bilgileri'}
                {eventType === 'corporate' && 'Etkinlik Bilgileri'}
                {eventType === 'circumcision' && 'Sünnet Bilgileri'}
                {eventType === 'birthday' && 'Doğum Günü Bilgileri'}
                {eventType === 'graduation' && 'Mezuniyet Bilgileri'}
                {eventType === 'baby-shower' && 'Baby Shower Bilgileri'}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Wedding Fields */}
                {eventType === 'wedding' && (
                  <>
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
                  </>
                )}

                {/* Engagement Fields */}
                {eventType === 'engagement' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Çift İsimleri *
                      </label>
                      <input
                        type="text"
                        name="partnerNames"
                        required
                        value={formData.partnerNames}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Ayşe & Mehmet"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nişan Tarihi *
                      </label>
                      <input
                        type="date"
                        name="engagementDate"
                        required
                        value={formData.engagementDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </>
                )}

                {/* Corporate Fields */}
                {eventType === 'corporate' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Şirket Adı *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="ABC Teknoloji A.Ş."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Etkinlik Adı *
                      </label>
                      <input
                        type="text"
                        name="eventName"
                        required
                        value={formData.eventName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Yıllık Gala 2024"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Etkinlik Tarihi *
                      </label>
                      <input
                        type="date"
                        name="eventDate"
                        required
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Etkinlik Türü
                      </label>
                      <select
                        name="eventType_detail"
                        value={formData.eventType_detail}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Seçiniz</option>
                        <option value="Konferans">Konferans</option>
                        <option value="Gala">Gala</option>
                        <option value="Ürün Lansmanı">Ürün Lansmanı</option>
                        <option value="Ekip Etkinliği">Ekip Etkinliği</option>
                        <option value="Seminer">Seminer</option>
                        <option value="Ödül Töreni">Ödül Töreni</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organizatör Adı
                      </label>
                      <input
                        type="text"
                        name="organizerName"
                        value={formData.organizerName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ahmet Yılmaz"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organizatör Ünvanı
                      </label>
                      <input
                        type="text"
                        name="organizerTitle"
                        value={formData.organizerTitle}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Etkinlik Müdürü"
                      />
                    </div>
                  </>
                )}

                {/* Circumcision Fields */}
                {eventType === 'circumcision' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Çocuğunuzun Adı *
                      </label>
                      <input
                        type="text"
                        name="childName"
                        required
                        value={formData.childName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Ahmet"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sünnet Tarihi *
                      </label>
                      <input
                        type="date"
                        name="circumcisionDate"
                        required
                        value={formData.circumcisionDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Anne & Baba Adı
                      </label>
                      <input
                        type="text"
                        name="parentNames"
                        value={formData.parentNames}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Ayşe & Mehmet Yılmaz"
                      />
                    </div>
                  </>
                )}

                {/* Birthday Fields */}
                {eventType === 'birthday' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kutlanan Kişinin Adı *
                      </label>
                      <input
                        type="text"
                        name="celebrantName"
                        required
                        value={formData.celebrantName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Zeynep"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Doğum Tarihi *
                      </label>
                      <input
                        type="date"
                        name="birthDate"
                        required
                        value={formData.birthDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Yaş
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="18"
                        min="1"
                        max="150"
                      />
                    </div>
                  </>
                )}

                {/* Graduation Fields */}
                {eventType === 'graduation' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mezun Olan Kişinin Adı *
                      </label>
                      <input
                        type="text"
                        name="graduateName"
                        required
                        value={formData.graduateName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Can Yılmaz"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mezuniyet Tarihi *
                      </label>
                      <input
                        type="date"
                        name="graduationDate"
                        required
                        value={formData.graduationDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Okul/Üniversite *
                      </label>
                      <input
                        type="text"
                        name="school"
                        required
                        value={formData.school}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="İstanbul Üniversitesi"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Derece/Bölüm
                      </label>
                      <input
                        type="text"
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Bilgisayar Mühendisliği"
                      />
                    </div>
                  </>
                )}

                {/* Baby Shower Fields */}
                {eventType === 'baby-shower' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Anne & Baba Adı *
                      </label>
                      <input
                        type="text"
                        name="parentNames_baby"
                        required
                        value={formData.parentNames_baby}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Ayşe & Mehmet"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tahmini Doğum Tarihi *
                      </label>
                      <input
                        type="date"
                        name="expectedDate"
                        required
                        value={formData.expectedDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bebek Cinsiyeti
                      </label>
                      <select
                        name="babyGender"
                        value={formData.babyGender}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="">Seçiniz</option>
                        <option value="boy">Erkek</option>
                        <option value="girl">Kız</option>
                        <option value="surprise">Sürpriz</option>
                      </select>
                    </div>
                  </>
                )}

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Özel Alt Alan Adınız (Subdomain) *
                  </label>
                  <div className={`border rounded-xl p-3 mb-3 ${
                    eventType === 'wedding' ? 'bg-purple-50 border-purple-200' :
                    eventType === 'corporate' ? 'bg-blue-50 border-blue-200' :
                    'bg-amber-50 border-amber-200'
                  }`}>
                    <p className={`text-sm ${
                      eventType === 'wedding' ? 'text-purple-800' :
                      eventType === 'corporate' ? 'text-blue-800' :
                      'text-amber-800'
                    }`}>
                      💡 Sizin için otomatik <span className="font-bold">alt alan adı</span> oluşturuyoruz!
                    </p>
                    <p className={`text-xs mt-1 ${
                      eventType === 'wedding' ? 'text-purple-600' :
                      eventType === 'corporate' ? 'text-blue-600' :
                      'text-amber-600'
                    }`}>
                      Örnek: <span className="font-mono bg-white px-2 py-0.5 rounded">
                        {eventType === 'wedding' ? 'ayse-mehmet.davet.digital' :
                         eventType === 'corporate' ? 'acme-sirket.davet.digital' :
                         'ahmet.davet.digital'}
                      </span>
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
                      placeholder={
                        eventType === 'wedding' ? 'ayse-mehmet' :
                        eventType === 'corporate' ? 'acme-sirket' :
                        'ahmet'
                      }
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
                disabled={
                  loading ||
                  slugAvailable === false ||
                  !formData.slug ||
                  !acceptedEULA ||
                  !formData.username ||
                  !formData.password ||
                  formData.password !== formData.confirmPassword ||
                  formData.password.length < 6 ||
                  formData.username.length < 3
                }
                className={`w-full py-4 rounded-xl font-semibold text-lg ${
                  eventType === 'wedding'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600'
                    : eventType === 'corporate'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-600'
                    : 'bg-gradient-to-r from-amber-500 to-orange-600'
                } text-white hover:shadow-2xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Oluşturuluyor...
                  </span>
                ) : (
                  '30 Günlük Ücretsiz Denemeyi Başlat'
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
            <h4 className="font-semibold text-gray-900">30 Gün Ücretsiz</h4>
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
