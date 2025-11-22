import { useState, useEffect } from 'react'
import { Check, X, Trash2, Users, Mail, Phone, MessageSquare } from 'lucide-react'
import axios from 'axios'
import { API_URL } from '../config'


const RSVPManager = () => {
  const [rsvps, setRsvps] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchRSVPs()
  }, [])

  const fetchRSVPs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/rsvps`)
      setRsvps(response.data)
    } catch (error) {
      console.error('Error fetching RSVPs:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Bu RSVP\'yi silmek istediğinizden emin misiniz?')) return

    try {
      await axios.delete(`${API_URL}/api/rsvps/${id}`)
      fetchRSVPs()
      alert('RSVP silindi!')
    } catch (error) {
      console.error('Error deleting RSVP:', error)
    }
  }

  const filteredRSVPs = rsvps.filter(rsvp => {
    if (filter === 'all') return true
    return rsvp.attendance === filter
  })

  const stats = {
    total: rsvps.length,
    yes: rsvps.filter(r => r.attendance === 'yes').length,
    no: rsvps.filter(r => r.attendance === 'no').length,
    maybe: rsvps.filter(r => r.attendance === 'maybe').length,
    totalGuests: rsvps.reduce((sum, r) => r.attendance === 'yes' ? sum + r.guestCount : sum, 0)
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
          <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-blue-800">Toplam Yanıt</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
          <div className="text-3xl font-bold text-green-600">{stats.yes}</div>
          <div className="text-sm text-green-800">Katılacak</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
          <div className="text-3xl font-bold text-red-600">{stats.no}</div>
          <div className="text-sm text-red-800">Katılmayacak</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
          <div className="text-3xl font-bold text-yellow-600">{stats.maybe}</div>
          <div className="text-sm text-yellow-800">Belki</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
          <div className="text-3xl font-bold text-purple-600">{stats.totalGuests}</div>
          <div className="text-sm text-purple-800">Toplam Misafir</div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Tümü ({stats.total})
          </button>
          <button
            onClick={() => setFilter('yes')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'yes' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Katılacak ({stats.yes})
          </button>
          <button
            onClick={() => setFilter('no')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'no' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Katılmayacak ({stats.no})
          </button>
          <button
            onClick={() => setFilter('maybe')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'maybe' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Belki ({stats.maybe})
          </button>
        </div>
      </div>

      {/* RSVP List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          RSVP Listesi
        </h2>

        {filteredRSVPs.length === 0 ? (
          <p className="text-center text-gray-500 py-8">RSVP bulunamadı</p>
        ) : (
          <div className="space-y-4">
            {filteredRSVPs.map(rsvp => (
              <div
                key={rsvp._id}
                className={`border-2 rounded-lg p-4 ${
                  rsvp.attendance === 'yes' ? 'border-green-300 bg-green-50' :
                  rsvp.attendance === 'no' ? 'border-red-300 bg-red-50' :
                  'border-yellow-300 bg-yellow-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Users className="w-5 h-5 text-gray-600" />
                      <h3 className="font-bold text-lg">{rsvp.guestName}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        rsvp.attendance === 'yes' ? 'bg-green-500 text-white' :
                        rsvp.attendance === 'no' ? 'bg-red-500 text-white' :
                        'bg-yellow-500 text-white'
                      }`}>
                        {rsvp.attendance === 'yes' ? 'Katılacak' : rsvp.attendance === 'no' ? 'Katılmayacak' : 'Belki'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                      {rsvp.email && (
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>{rsvp.email}</span>
                        </div>
                      )}
                      {rsvp.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{rsvp.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{rsvp.guestCount} Kişi</span>
                      </div>
                      {rsvp.dietaryRestrictions && (
                        <div className="flex items-center space-x-2">
                          <span className="text-xs">🍽️ {rsvp.dietaryRestrictions}</span>
                        </div>
                      )}
                    </div>
                    {rsvp.message && (
                      <div className="mt-2 p-2 bg-white/50 rounded text-sm">
                        <MessageSquare className="w-4 h-4 inline mr-2" />
                        {rsvp.message}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mt-2">
                      {new Date(rsvp.createdAt).toLocaleString('tr-TR')}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(rsvp._id)}
                    className="bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 ml-4"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default RSVPManager
