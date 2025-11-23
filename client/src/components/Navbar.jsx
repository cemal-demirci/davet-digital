import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Heart, Home, Calendar, Image, Users, Menu, X, Tv, ClipboardList } from 'lucide-react'

const Navbar = ({ coupleNames }) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navItems = [
    { path: '/wedding', label: 'Ana Sayfa', icon: Home },
    { path: '/timeline', label: 'Program', icon: Calendar },
    { path: '/gallery', label: 'Galeri', icon: Image },
    { path: '/rsvp', label: 'Katılım', icon: Users },
    { path: '/planner', label: 'Planlayıcı', icon: ClipboardList },
    { path: '/live-wall', label: 'Canlı Duvar', icon: Tv }
  ]

  // Marketing ve admin sayfalarında navbar gösterme
  const marketingPaths = ['/', '/pricing', '/signup', '/demo', '/login', '/eula']
  if (
    marketingPaths.includes(location.pathname) ||
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/upload')
  ) {
    return null
  }

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo / Couple Names */}
            <Link to="/wedding" className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-romantic-500" />
              <span className="text-xl font-script text-romantic-600 hidden md:block">
                {coupleNames || 'Düğün Sitemiz'}
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-romantic-100 text-romantic-600'
                        : 'text-gray-700 hover:bg-romantic-50 hover:text-romantic-500'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-romantic-50 transition-colors"
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
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-romantic-100 text-romantic-600'
                        : 'text-gray-700 hover:bg-romantic-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar
