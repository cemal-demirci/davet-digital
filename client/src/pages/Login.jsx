import { useState, useEffect } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { LogIn, User, Lock, AlertCircle, Loader, Sparkles, CheckCircle } from 'lucide-react'
import axios from 'axios'
import SEO from '../components/SEO'
import MarketingNavbar from '../components/MarketingNavbar'
import MarketingFooter from '../components/MarketingFooter'
import FloatingDecor from '../components/FloatingDecor'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const Login = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  useEffect(() => {
    // Check if redirected from signup with success
    if (searchParams.get('registered') === 'true') {
      const username = searchParams.get('username')
      if (username) {
        setFormData(prev => ({ ...prev, username }))
        setSuccess('Kayıt başarılı! Şimdi giriş yapabilirsiniz.')
      }
    }
    // Check if redirected from password reset with success
    if (searchParams.get('reset') === 'success') {
      setSuccess('Şifreniz başarıyla güncellendi! Şimdi giriş yapabilirsiniz.')
    }
  }, [searchParams])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('') // Clear error on input change
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, formData)

      // Store auth token and tenant info
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('tenantId', response.data.user.id)
      localStorage.setItem('tenantSlug', response.data.user.slug)
      localStorage.setItem('username', response.data.user.username)
      localStorage.setItem('eventType', response.data.user.eventType)

      // Redirect to admin panel
      navigate('/admin')
    } catch (error) {
      setError(error.response?.data?.error || 'Kullanıcı adı veya şifre hatalı.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white">
      <FloatingDecor />
      <SEO
        title="Giriş Yap - Davet Digital | Düğün Sitenize Erişin"
        description="Davet Digital hesabınıza giriş yapın ve düğün sitenizi yönetin."
        keywords="giriş, login, düğün sitesi giriş"
        url="https://davet.digital/login"
      />
      <MarketingNavbar />

      <div className="pt-20 pb-24">
        {/* Hero */}
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-indigo-500 animate-pulse" />
              <LogIn className="w-8 h-8 text-purple-500 absolute -bottom-1 -right-1" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
            Hoş Geldiniz
          </h1>
          <p className="text-lg text-gray-600">
            Etkinlik sitenize giriş yapın ve yönetmeye devam edin
          </p>
        </div>

        {/* Login Form */}
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-green-700">{success}</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kullanıcı Adınız
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="kullaniciadi"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şifreniz
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Beni Hatırla</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-purple-600 hover:underline">
                  Şifremi Unuttum
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-2xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Giriş Yapılıyor...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <LogIn className="w-5 h-5 mr-2" />
                    Giriş Yap
                  </span>
                )}
              </button>
            </form>

            {/* Signup Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Hesabınız yok mu?{' '}
                <Link to="/start" className="text-purple-600 hover:underline font-semibold">
                  Hemen Kayıt Olun
                </Link>
              </p>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <h3 className="font-bold text-gray-900 mb-2">💡 Giriş Yapamıyor musunuz?</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Kayıt olurken oluşturduğunuz kullanıcı adınızı kullanın</li>
              <li>• Şifrenizi unuttuysanız "Şifremi Unuttum" linkine tıklayın</li>
              <li>• Sorun devam ederse: <a href="mailto:destek@davet.digital" className="text-purple-600 hover:underline">destek@davet.digital</a></li>
            </ul>
          </div>
        </div>
      </div>

      <MarketingFooter />
    </div>
  )
}

export default Login
