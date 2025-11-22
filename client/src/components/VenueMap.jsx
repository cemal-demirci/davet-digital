import { MapPin, Navigation, ExternalLink } from 'lucide-react'

const VenueMap = ({ venueName, venueAddress, venueMapUrl, venueLatitude, venueLongitude }) => {
  const openInMaps = () => {
    if (venueLatitude && venueLongitude) {
      // Google Maps ile aç
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${venueLatitude},${venueLongitude}`, '_blank')
    } else if (venueMapUrl) {
      window.open(venueMapUrl, '_blank')
    }
  }

  const openInAppleMaps = () => {
    if (venueLatitude && venueLongitude) {
      window.open(`https://maps.apple.com/?daddr=${venueLatitude},${venueLongitude}`, '_blank')
    }
  }

  if (!venueName && !venueAddress) return null

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
      <div className="text-center mb-6">
        <MapPin className="w-12 h-12 text-romantic-600 mx-auto mb-4" />
        <h2 className="text-3xl font-script text-romantic-600 mb-2">Mekan Bilgileri</h2>
      </div>

      {venueName && (
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">{venueName}</h3>
        </div>
      )}

      {venueAddress && (
        <div className="text-center mb-6">
          <p className="text-gray-700">{venueAddress}</p>
        </div>
      )}

      {/* Harita Embed */}
      {venueLatitude && venueLongitude && (
        <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBHrH4iiVSkQXsIOGpYOb97nYlih8n12CE&q=${venueLatitude},${venueLongitude}&zoom=15`}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}

      {/* Butonlar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={openInMaps}
          className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
        >
          <Navigation className="w-5 h-5" />
          <span>Google Maps'te Aç</span>
        </button>
        <button
          onClick={openInAppleMaps}
          className="flex-1 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
        >
          <Navigation className="w-5 h-5" />
          <span>Apple Maps'te Aç</span>
        </button>
        {venueMapUrl && (
          <button
            onClick={() => window.open(venueMapUrl, '_blank')}
            className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Haritada Gör</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default VenueMap
