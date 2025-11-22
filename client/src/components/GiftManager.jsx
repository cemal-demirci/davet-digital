import { useState, useEffect } from 'react'
import { Gift, Plus, Trash2, ExternalLink } from 'lucide-react'
import axios from 'axios'

const API_URL = 'http://localhost:5001'

const GiftManager = () => {
  const [gifts, setGifts] = useState([])
  const [newGift, setNewGift] = useState({
    name: '',
    description: '',
    price: '',
    link: ''
  })

  useEffect(() => {
    fetchGifts()
  }, [])

  const fetchGifts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/gifts`)
      setGifts(response.data)
    } catch (error) {
      console.error('Error fetching gifts:', error)
    }
  }

  const handleAdd = async () => {
    if (!newGift.name) {
      alert('Lütfen hediye adı girin!')
      return
    }

    try {
      await axios.post(`${API_URL}/api/gifts`, newGift)
      setNewGift({ name: '', description: '', price: '', link: '' })
      fetchGifts()
      alert('Hediye eklendi!')
    } catch (error) {
      console.error('Error adding gift:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Bu hediyeyi silmek istediğinizden emin misiniz?')) return

    try {
      await axios.delete(`${API_URL}/api/gifts/${id}`)
      fetchGifts()
      alert('Hediye silindi!')
    } catch (error) {
      console.error('Error deleting gift:', error)
    }
  }

  const stats = {
    total: gifts.length,
    reserved: gifts.filter(g => g.reserved).length,
    available: gifts.filter(g => !g.reserved).length
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
          <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-blue-800">Toplam Hediye</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
          <div className="text-3xl font-bold text-green-600">{stats.reserved}</div>
          <div className="text-sm text-green-800">Rezerve Edildi</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
          <div className="text-3xl font-bold text-gray-600">{stats.available}</div>
          <div className="text-sm text-gray-800">Müsait</div>
        </div>
      </div>

      {/* Add Gift */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Yeni Hediye Ekle</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={newGift.name}
            onChange={(e) => setNewGift({ ...newGift, name: e.target.value })}
            placeholder="Hediye Adı"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="number"
            value={newGift.price}
            onChange={(e) => setNewGift({ ...newGift, price: e.target.value })}
            placeholder="Fiyat (TL)"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="url"
            value={newGift.link}
            onChange={(e) => setNewGift({ ...newGift, link: e.target.value })}
            placeholder="Link (Opsiyonel)"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="text"
            value={newGift.description}
            onChange={(e) => setNewGift({ ...newGift, description: e.target.value })}
            placeholder="Açıklama (Opsiyonel)"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <button
          onClick={handleAdd}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Hediye Ekle</span>
        </button>
      </div>

      {/* Gift List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Hediye Listesi ({gifts.length})
        </h2>

        {gifts.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Henüz hediye eklenmemiş</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gifts.map(gift => (
              <div
                key={gift._id}
                className={`border-2 rounded-lg p-4 ${
                  gift.reserved ? 'border-green-300 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Gift className="w-5 h-5 text-pink-600" />
                    <h3 className="font-bold text-lg">{gift.name}</h3>
                  </div>
                  <button
                    onClick={() => handleDelete(gift._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {gift.description && (
                  <p className="text-sm text-gray-600 mb-2">{gift.description}</p>
                )}

                <div className="flex items-center justify-between mt-3">
                  {gift.price && (
                    <span className="font-bold text-pink-600">{gift.price} TL</span>
                  )}
                  {gift.link && (
                    <a
                      href={gift.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 text-sm flex items-center space-x-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Link</span>
                    </a>
                  )}
                </div>

                {gift.reserved && (
                  <div className="mt-3 pt-3 border-t">
                    <span className="text-sm text-green-700 font-medium">
                      ✓ Rezerve eden: {gift.reservedBy}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default GiftManager
