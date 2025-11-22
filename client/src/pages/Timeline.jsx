import { useState, useEffect } from 'react'
import { Clock, MapPin, Heart } from 'lucide-react'
import axios from 'axios'

const API_URL = 'http://localhost:5001'

const ICONS = {
  heart: Heart,
  camera: ({ className }) => <span className={className}>📸</span>,
  music: ({ className }) => <span className={className}>🎵</span>,
  cake: ({ className }) => <span className={className}>🎂</span>,
  users: ({ className }) => <span className={className}>👥</span>,
  calendar: ({ className }) => <span className={className}>📅</span>,
  mappin: MapPin,
  clock: Clock
}

const Timeline = () => {
  const [timeline, setTimeline] = useState([])
  const [settings, setSettings] = useState(null)
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [timelineRes, settingsRes, photosRes] = await Promise.all([
        axios.get(`${API_URL}/api/timeline`),
        axios.get(`${API_URL}/api/settings`),
        axios.get(`${API_URL}/api/photos`)
      ])
      setTimeline(timelineRes.data)
      setSettings(settingsRes.data)
      setPhotos(photosRes.data.slice(0, 3)) // İlk 3 fotoğraf
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const renderIcon = (iconName) => {
    const Icon = ICONS[iconName] || Heart
    return <Icon className="w-8 h-8" />
  }

  if (!settings) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-romantic-50 via-white to-gold-50 pt-8 pb-12 px-4 relative overflow-hidden">
      {/* Background Photos */}
      {photos.length > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {photos.map((photo, index) => (
            <div
              key={photo._id}
              className="absolute animate-float"
              style={{
                top: `${20 + index * 30}%`,
                left: index % 2 === 0 ? '5%' : 'auto',
                right: index % 2 === 1 ? '5%' : 'auto',
                animationDelay: `${index * 2}s`,
                animationDuration: '20s'
              }}
            >
              <img
                src={`${API_URL}${photo.url}`}
                alt=""
                className="w-48 h-48 object-cover rounded-full opacity-10 blur-sm"
              />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Clock className="w-16 h-16 text-romantic-500 mx-auto mb-4" />
          <h1 className="text-5xl font-script text-romantic-600 mb-4">Düğün Programı</h1>
          <p className="text-gray-700 text-lg">
            {settings.coupleNames}'nin büyük günü için hazırladığımız program
          </p>
        </div>

        {/* Timeline */}
        {timeline.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Program henüz hazırlanmadı</p>
          </div>
        ) : (
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-romantic-300"></div>

            {/* Timeline Items */}
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div
                  key={item._id}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Icon Circle */}
                  <div className="absolute left-8 md:left-1/2 w-16 h-16 bg-white border-4 border-romantic-500 rounded-full flex items-center justify-center text-romantic-600 transform md:-translate-x-1/2 z-10">
                    {renderIcon(item.icon)}
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-24 md:ml-0 flex-1 ${
                      index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
                      <div className="flex items-center space-x-2 mb-3">
                        <Clock className="w-5 h-5 text-romantic-500" />
                        <span className="text-xl font-bold text-romantic-600">{item.time}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h3>
                      {item.description && (
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Timeline
