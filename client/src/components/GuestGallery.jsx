import { useState, useEffect } from 'react'
import { Check, X, Trash2, User, Calendar } from 'lucide-react'
import axios from 'axios'
import { API_URL } from '../config'
import { formatDateTime } from '../utils/dateFormatter'


const GuestGallery = () => {
  const [guestPhotos, setGuestPhotos] = useState([])
  const [filter, setFilter] = useState('all') // all, pending, approved

  useEffect(() => {
    fetchGuestPhotos()
  }, [])

  const fetchGuestPhotos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/guest-photos`)
      setGuestPhotos(response.data)
    } catch (error) {
      console.error('Error fetching guest photos:', error)
    }
  }

  const handleApprove = async (id, approved) => {
    try {
      await axios.put(`${API_URL}/api/guest-photos/${id}/approve`, { approved })
      fetchGuestPhotos()
      alert(approved ? 'Fotoğraf onaylandı!' : 'Onay kaldırıldı!')
    } catch (error) {
      console.error('Error approving photo:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Bu fotoğrafı silmek istediğinizden emin misiniz?')) return

    try {
      await axios.delete(`${API_URL}/api/guest-photos/${id}`)
      fetchGuestPhotos()
      alert('Fotoğraf silindi!')
    } catch (error) {
      console.error('Error deleting photo:', error)
    }
  }

  const filteredPhotos = guestPhotos.filter(photo => {
    if (filter === 'pending') return !photo.approved
    if (filter === 'approved') return photo.approved
    return true
  })

  const stats = {
    total: guestPhotos.length,
    pending: guestPhotos.filter(p => !p.approved).length,
    approved: guestPhotos.filter(p => p.approved).length
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
          <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-blue-800">Toplam Fotoğraf</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
          <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-sm text-yellow-800">Bekleyen</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
          <div className="text-3xl font-bold text-green-600">{stats.approved}</div>
          <div className="text-sm text-green-800">Onaylanmış</div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all'
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Tümü ({stats.total})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'pending'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Bekleyenler ({stats.pending})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'approved'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Onaylananlar ({stats.approved})
          </button>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Misafir Fotoğrafları
        </h2>

        {filteredPhotos.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Fotoğraf bulunamadı</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPhotos.map(photo => (
              <div
                key={photo._id}
                className={`border-2 rounded-lg overflow-hidden ${
                  photo.approved ? 'border-green-300' : 'border-yellow-300'
                }`}
              >
                <div className="relative">
                  <img
                    src={`${API_URL}${photo.url}`}
                    alt={photo.guestName}
                    className="w-full h-48 object-cover"
                  />
                  {photo.approved && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                      <Check className="w-3 h-3" />
                      <span>Onaylı</span>
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{photo.guestName}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDateTime(photo.uploadDate)}</span>
                  </div>

                  <div className="flex space-x-2">
                    {!photo.approved ? (
                      <button
                        onClick={() => handleApprove(photo._id, true)}
                        className="flex-1 bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600 flex items-center justify-center space-x-1"
                      >
                        <Check className="w-4 h-4" />
                        <span>Onayla</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApprove(photo._id, false)}
                        className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded text-sm hover:bg-yellow-600 flex items-center justify-center space-x-1"
                      >
                        <X className="w-4 h-4" />
                        <span>Onayı Kaldır</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(photo._id)}
                      className="bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default GuestGallery
