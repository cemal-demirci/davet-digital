import { Link, useLocation } from 'react-router-dom'
import { Heart } from 'lucide-react'

const MarketingNavbar = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Heart className="w-7 h-7 text-pink-500 group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-script bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Davet Digital
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/')
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
              }`}
            >
              Ana Sayfa
            </Link>
            <Link
              to="/pricing"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/pricing')
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
              }`}
            >
              Fiyatlandırma
            </Link>
            <Link
              to="/demo"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/demo')
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
              }`}
            >
              Demo
            </Link>
            <Link
              to="/signup"
              className="ml-2 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Başlayın
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default MarketingNavbar
