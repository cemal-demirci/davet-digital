import { useState, useEffect } from 'react'
import { MessageSquare, CheckCircle, XCircle, Trash2 } from 'lucide-react'
import axios from 'axios'
import { API_URL } from '../config'


const MessageManager = () => {
  const [messages, setMessages] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/messages`)
      setMessages(response.data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const handleApprove = async (id, approved) => {
    try {
      await axios.put(`${API_URL}/api/messages/${id}/approve`, { approved })
      fetchMessages()
    } catch (error) {
      console.error('Error approving message:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Bu mesajı silmek istediğinizden emin misiniz?')) return

    try {
      await axios.delete(`${API_URL}/api/messages/${id}`)
      fetchMessages()
      alert('Mesaj silindi!')
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  const filteredMessages = messages.filter(msg => {
    if (filter === 'all') return true
    if (filter === 'approved') return msg.approved
    if (filter === 'pending') return !msg.approved
    return true
  })

  const stats = {
    total: messages.length,
    approved: messages.filter(m => m.approved).length,
    pending: messages.filter(m => !m.approved).length
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
          <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-blue-800">Toplam Mesaj</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
          <div className="text-3xl font-bold text-green-600">{stats.approved}</div>
          <div className="text-sm text-green-800">Onaylandı</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
          <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-sm text-yellow-800">Bekliyor</div>
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
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'approved' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Onaylı ({stats.approved})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Bekleyen ({stats.pending})
          </button>
        </div>
      </div>

      {/* Message List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Misafir Mesajları
        </h2>

        {filteredMessages.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Mesaj bulunamadı</p>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map(message => (
              <div
                key={message._id}
                className={`border-2 rounded-lg p-4 ${
                  message.approved ? 'border-green-300 bg-green-50' : 'border-yellow-300 bg-yellow-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <MessageSquare className="w-5 h-5 text-gray-600" />
                      <h3 className="font-bold text-lg">{message.guestName}</h3>
                      {message.approved && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                          ✓ Onaylı
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-2">{message.message}</p>
                    <div className="text-xs text-gray-500">
                      {new Date(message.createdAt).toLocaleString('tr-TR')}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    {!message.approved ? (
                      <button
                        onClick={() => handleApprove(message._id, true)}
                        className="bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600"
                        title="Onayla"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApprove(message._id, false)}
                        className="bg-yellow-500 text-white px-3 py-2 rounded text-sm hover:bg-yellow-600"
                        title="Onayı Kaldır"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(message._id)}
                      className="bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600"
                      title="Sil"
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

export default MessageManager
