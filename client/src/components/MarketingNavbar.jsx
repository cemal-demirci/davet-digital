import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles, Menu, X } from 'lucide-react'

const MarketingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <Sparkles className="relative w-7 h-7 text-indigo-600 group-hover:rotate-12 transition-transform" />
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-display font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                DAVET
              </span>
              <span className="text-xl font-heading font-medium text-gray-700 ml-0.5">
                .digital
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/')
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              Ana Sayfa
            </Link>
            <Link
              to="/pricing"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/pricing')
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              Fiyatlandırma
            </Link>
            <Link
              to="/demo"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/demo')
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              Demo
            </Link>
            <Link
              to="/start"
              className="ml-2 px-6 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Başlayın
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive('/')
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              Ana Sayfa
            </Link>
            <Link
              to="/pricing"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive('/pricing')
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              Fiyatlandırma
            </Link>
            <Link
              to="/demo"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive('/demo')
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              Demo
            </Link>
            <Link
              to="/start"
              onClick={() => setIsOpen(false)}
              className="block mt-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-full font-semibold text-center hover:shadow-lg transition-all"
            >
              Başlayın
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default MarketingNavbar
