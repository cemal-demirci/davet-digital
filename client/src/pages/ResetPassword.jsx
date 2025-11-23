import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, Loader, Sparkles } from 'lucide-react'
import axios from 'axios'
import SEO from '../components/SEO'
import MarketingNavbar from '../components/MarketingNavbar'
import MarketingFooter from '../components/MarketingFooter'
import FloatingDecor from '../components/FloatingDecor'
import { API_URL } from '../config'

const ResetPassword = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    if (!token) {
      setError('Geçersiz şifre sıfırlama linki.')
    }
  }, [token])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const getPasswordStrength = () => {
    const password = formData.newPassword
    if (password.length === 0) return { level: 0, text: '', color: '' }
    if (password.length < 6) return { level: 1, text: 'Zayıf', color: 'bg-red-500' }
    if (password.length < 10) return { level: 2, text: 'Orta', color: 'bg-yellow-500' }
    if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { level: 3, text: 'Güçlü', color: 'bg-green-500' }
    }
    return { level: 2, text: 'Orta', color: 'bg-yellow-500' }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (formData.newPassword.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.')
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor.')
      return
    }

    if (!token) {
      setError('Geçersiz şifre sıfırlama linki.')
      return
    }

    setLoading(true)

    try {
      await axios.post(`${API_URL}/api/auth/reset-password`, {
        token,
        newPassword: formData.newPassword
      })

      // Redirect to login with success message
      navigate('/login?reset=success', { replace: true })
    } catch (error) {
      setError(error.response?.data?.error || 'Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  const passwordStrength = getPasswordStrength()

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white">
      <FloatingDecor />
      <SEO
        title="Şifre Sıfırla - Davet Digital"
        description="Yeni şifrenizi belirleyin."
        keywords="şifre sıfırlama, reset password"
        url="https://davet.digital/reset-password"
      />
      <MarketingNavbar />

      <div className="pt-20 pb-24">
        {/* Hero */}
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-indigo-500 animate-pulse" />
              <Lock className="w-8 h-8 text-purple-500 absolute -bottom-1 -right-1" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
            Şifre Sıfırla
          </h1>
          <p className="text-lg text-gray-600">
            Yeni şifrenizi belirleyin
          </p>
        </div>

        {/* Form */}
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yeni Şifre
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="newPassword"
                    required
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.newPassword && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${passwordStrength.color} transition-all duration-300`}
                          style={{ width: `${(passwordStrength.level / 3) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600">
                        {passwordStrength.text}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      En az 6 karakter (10+ karakter, büyük harf ve rakam içerirse daha güçlü)
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şifre Tekrar
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div className="mt-2">
                    {formData.newPassword === formData.confirmPassword ? (
                      <div className="flex items-center text-green-600 text-sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Şifreler eşleşiyor
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Şifreler eşleşmiyor
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !token}
                className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-2xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Şifre Sıfırlanıyor...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Şifremi Sıfırla
                  </span>
                )}
              </button>
            </form>

            {/* Back to Login */}
            <div className="mt-8 text-center">
              <Link to="/login" className="text-purple-600 hover:underline font-semibold">
                Giriş sayfasına dön
              </Link>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <h3 className="font-bold text-gray-900 mb-2">Güvenlik İpuçları</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Güçlü bir şifre kullanın (en az 10 karakter)</li>
              <li>• Büyük harf, küçük harf ve rakam karışımı kullanın</li>
              <li>• Kolay tahmin edilebilir şifreler kullanmayın</li>
              <li>• Şifrenizi başkalarıyla paylaşmayın</li>
            </ul>
          </div>
        </div>
      </div>

      <MarketingFooter />
    </div>
  )
}

export default ResetPassword
