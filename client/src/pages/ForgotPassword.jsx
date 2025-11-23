import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Loader, Sparkles } from 'lucide-react'
import axios from 'axios'
import SEO from '../components/SEO'
import MarketingNavbar from '../components/MarketingNavbar'
import MarketingFooter from '../components/MarketingFooter'
import FloatingDecor from '../components/FloatingDecor'
import { API_URL } from '../config'

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      await axios.post(`${API_URL}/api/auth/forgot-password`, { email })
      setSuccess(true)
      setEmail('')
    } catch (error) {
      setError(error.response?.data?.error || 'Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white">
      <FloatingDecor />
      <SEO
        title="Şifremi Unuttum - Davet Digital"
        description="Şifrenizi sıfırlamak için email adresinizi girin."
        keywords="şifremi unuttum, şifre sıfırlama, password reset"
        url="https://davet.digital/forgot-password"
      />
      <MarketingNavbar />

      <div className="pt-20 pb-24">
        {/* Hero */}
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-indigo-500 animate-pulse" />
              <Mail className="w-8 h-8 text-purple-500 absolute -bottom-1 -right-1" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
            Şifremi Unuttum
          </h1>
          <p className="text-lg text-gray-600">
            Email adresinize şifre sıfırlama linki göndereceğiz
          </p>
        </div>

        {/* Form */}
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
            {success ? (
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Email Gönderildi!
                </h2>
                <p className="text-gray-600 mb-6">
                  Şifre sıfırlama linki email adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-blue-700">
                    Email'i bulamıyor musunuz? Spam klasörünüzü kontrol edin. Link 1 saat içinde geçerlidir.
                  </p>
                </div>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-2xl transform hover:scale-105 transition-all"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Giriş Sayfasına Dön
                </Link>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Adresiniz
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Kayıt olurken kullandığınız email adresini girin
                    </p>
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
                        Gönderiliyor...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Mail className="w-5 h-5 mr-2" />
                        Gönder
                      </span>
                    )}
                  </button>
                </form>

                {/* Back to Login */}
                <div className="mt-8 text-center">
                  <Link to="/login" className="inline-flex items-center text-purple-600 hover:underline font-semibold">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Giriş sayfasına dön
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Info Box */}
          {!success && (
            <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <h3 className="font-bold text-gray-900 mb-2">Güvenlik İpuçları</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Şifre sıfırlama linki 1 saat sonra geçersiz olacaktır</li>
                <li>• Email gelmezse spam klasörünü kontrol edin</li>
                <li>• Hesabınız yoksa önce kayıt olmanız gerekir</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <MarketingFooter />
    </div>
  )
}

export default ForgotPassword
