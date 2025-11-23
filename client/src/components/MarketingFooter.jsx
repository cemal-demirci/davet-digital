import { Link } from 'react-router-dom'
import { Heart, Mail, Phone, MapPin } from 'lucide-react'

const MarketingFooter = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Tagline */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-pink-400" />
              <span className="text-2xl font-script bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Davet Digital
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Düğününüzü unutulmaz kılın. Modern, şık ve kullanımı kolay düğün siteleri ile misafirlerinizi etkileyin.
            </p>
          </div>

          {/* Ürün */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-400">Ürün</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                  Fiyatlandırma
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                  Canlı Demo
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                  Ücretsiz Başla
                </Link>
              </li>
            </ul>
          </div>

          {/* Hakkında */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-400">Hakkında</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                  Hakkımızda
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                  SSS
                </a>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-400">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-300 text-sm">
                <Mail className="w-4 h-4 text-pink-400" />
                <a href="mailto:info@davet.digital" className="hover:text-pink-400 transition-colors">
                  info@davet.digital
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 text-sm">
                <Phone className="w-4 h-4 text-pink-400" />
                <a href="tel:+905551234567" className="hover:text-pink-400 transition-colors">
                  +90 555 123 45 67
                </a>
              </li>
              <li className="flex items-start space-x-2 text-gray-300 text-sm">
                <MapPin className="w-4 h-4 text-pink-400 mt-0.5" />
                <span>İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Davet Digital. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                Gizlilik Politikası
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                Kullanım Şartları
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                Çerezler
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default MarketingFooter
