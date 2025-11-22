import { useState, useEffect } from 'react'
import { Clock, Plus, Trash2, Calendar, MapPin, Heart, Camera, Music, Cake, Users } from 'lucide-react'
import axios from 'axios'

const API_URL = 'http://localhost:5001'

const ICONS = {
  heart: Heart,
  camera: Camera,
  music: Music,
  cake: Cake,
  users: Users,
  calendar: Calendar,
  mappin: MapPin,
  clock: Clock
}

const TimelineManager = () => {
  const [timeline, setTimeline] = useState([])
  const [newItem, setNewItem] = useState({
    title: '',
    time: '',
    description: '',
    icon: 'heart',
    order: 0
  })

  useEffect(() => {
    fetchTimeline()
  }, [])

  const fetchTimeline = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/timeline`)
      setTimeline(response.data)
    } catch (error) {
      console.error('Error fetching timeline:', error)
    }
  }

  const handleAdd = async () => {
    if (!newItem.title || !newItem.time) {
      alert('Lütfen başlık ve saat girin!')
      return
    }

    try {
      await axios.post(`${API_URL}/api/timeline`, {
        ...newItem,
        order: timeline.length
      })
      setNewItem({ title: '', time: '', description: '', icon: 'heart', order: 0 })
      fetchTimeline()
      alert('Timeline öğesi eklendi!')
    } catch (error) {
      console.error('Error adding timeline item:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Bu öğeyi silmek istediğinizden emin misiniz?')) return

    try {
      await axios.delete(`${API_URL}/api/timeline/${id}`)
      fetchTimeline()
      alert('Timeline öğesi silindi!')
    } catch (error) {
      console.error('Error deleting timeline item:', error)
    }
  }

  const renderIcon = (iconName) => {
    const Icon = ICONS[iconName] || Heart
    return <Icon className="w-6 h-6" />
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
        <div className="text-3xl font-bold text-blue-600">{timeline.length}</div>
        <div className="text-sm text-blue-800">Toplam Timeline Öğesi</div>
      </div>

      {/* Add Timeline Item */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Yeni Timeline Öğesi Ekle</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            placeholder="Başlık (örn: Nikah Töreni)"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="text"
            value={newItem.time}
            onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
            placeholder="Saat (örn: 14:00)"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="text"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            placeholder="Açıklama (Opsiyonel)"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 md:col-span-2"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">İkon Seçin</label>
            <select
              value={newItem.icon}
              onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            >
              <option value="heart">Kalp</option>
              <option value="camera">Kamera</option>
              <option value="music">Müzik</option>
              <option value="cake">Pasta</option>
              <option value="users">Misafirler</option>
              <option value="calendar">Takvim</option>
              <option value="mappin">Konum</option>
              <option value="clock">Saat</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Timeline Ekle</span>
        </button>
      </div>

      {/* Timeline List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Düğün Programı ({timeline.length})
        </h2>

        {timeline.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Henüz program eklenmemiş</p>
        ) : (
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <div
                key={item._id}
                className="border-2 border-gray-200 rounded-lg p-4 hover:border-pink-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-pink-100 p-3 rounded-full text-pink-600">
                      {renderIcon(item.icon)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-semibold text-pink-600">{item.time}</span>
                      </div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-600">{item.description}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:text-red-700"
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

export default TimelineManager
