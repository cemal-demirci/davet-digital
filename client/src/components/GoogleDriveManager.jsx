import { useState, useEffect } from 'react'
import { Cloud, CloudOff, RefreshCw, Calendar, FolderOpen, AlertCircle, CheckCircle } from 'lucide-react'
import api from '../utils/api'
import { formatLongDateTime } from '../utils/dateFormatter'

const GoogleDriveManager = () => {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [backingUp, setBackingUp] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    fetchStatus()
  }, [])

  const fetchStatus = async () => {
    try {
      const response = await api.get('/api/google-drive/status')
      setStatus(response.data)
    } catch (error) {
      console.error('Error fetching Google Drive status:', error)
    }
  }

  const handleConnect = async () => {
    setLoading(true)
    try {
      const response = await api.get('/api/google-drive/auth-url')

      // Open Google OAuth in popup
      const popup = window.open(response.data.authUrl, 'Google Drive Auth', 'width=600,height=700')

      // Check if popup closed
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed)
          setLoading(false)
          fetchStatus()
        }
      }, 500)
    } catch (error) {
      console.error('Error connecting to Google Drive:', error)
      setMessage({ type: 'error', text: 'Bağlantı hatası!' })
      setLoading(false)
    }
  }

  const handleBackup = async () => {
    setBackingUp(true)
    setMessage(null)

    try {
      const response = await api.post('/api/google-drive/backup')
      setMessage({ type: 'success', text: response.data.message })
      fetchStatus()
    } catch (error) {
      console.error('Error backing up to Google Drive:', error)
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Yedekleme hatası!'
      })
    } finally {
      setBackingUp(false)
    }
  }

  const handleDisconnect = async () => {
    if (!confirm('Google Drive bağlantısını kesmek istediğinizden emin misiniz?')) return

    try {
      await api.post('/api/google-drive/disconnect')
      setMessage({ type: 'success', text: 'Bağlantı kesildi' })
      fetchStatus()
    } catch (error) {
      console.error('Error disconnecting Google Drive:', error)
      setMessage({ type: 'error', text: 'Hata oluştu!' })
    }
  }

  const formatDate = (date) => {
    if (!date) return 'Henüz yedeklenmedi'
    return formatLongDateTime(date)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Cloud className="w-8 h-8 text-blue-500" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Google Drive Yedekleme</h2>
            <p className="text-sm text-gray-600">Fotoğraflarınızı otomatik yedekleyin</p>
          </div>
        </div>

        {status?.enabled && (
          <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-700 font-medium">Bağlı</span>
          </div>
        )}
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-start space-x-3 ${
          message.type === 'success'
            ? 'bg-green-50 border border-green-200'
            : 'bg-red-50 border border-red-200'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          )}
          <p className={message.type === 'success' ? 'text-green-700' : 'text-red-700'}>
            {message.text}
          </p>
        </div>
      )}

      {!status?.enabled ? (
        /* Not Connected */
        <div className="text-center py-12">
          <Cloud className="w-24 h-24 mx-auto mb-6 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Google Drive Bağlantısı Yok
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Google Drive'ı bağlayarak tüm fotoğraflarınızı otomatik olarak yedekleyebilirsiniz.
          </p>

          <button
            onClick={handleConnect}
            disabled={loading}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
          >
            <Cloud className="w-5 h-5" />
            <span>{loading ? 'Bağlanıyor...' : 'Google Drive ile Bağlan'}</span>
          </button>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-3">💡 Nasıl Çalışır?</h4>
            <ul className="text-sm text-blue-800 space-y-2 text-left max-w-md mx-auto">
              <li>✓ Google hesabınızla güvenli bağlantı</li>
              <li>✓ Tüm fotoğraflar otomatik klasöre kaydedilir</li>
              <li>✓ İstediğiniz zaman yedekleme yapabilirsiniz</li>
              <li>✓ Fotoğraflarınız kendi Drive'ınızda güvende</li>
            </ul>
          </div>
        </div>
      ) : (
        /* Connected */
        <div className="space-y-6">
          {/* Status Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-gray-600 mb-2">
                <FolderOpen className="w-5 h-5" />
                <span className="text-sm font-medium">Drive Klasörü</span>
              </div>
              <p className="text-gray-800 font-semibold truncate">
                {status.folderName || 'Düğün Fotoğrafları'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-gray-600 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-medium">Son Yedekleme</span>
              </div>
              <p className="text-gray-800 font-semibold">
                {formatDate(status.lastBackup)}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleBackup}
              disabled={backingUp}
              className="flex-1 bg-green-500 text-white px-6 py-4 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-5 h-5 ${backingUp ? 'animate-spin' : ''}`} />
              <span>{backingUp ? 'Yedekleniyor...' : 'Şimdi Yedekle'}</span>
            </button>

            <button
              onClick={handleDisconnect}
              className="bg-red-50 text-red-600 border-2 border-red-200 px-6 py-4 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center space-x-2"
            >
              <CloudOff className="w-5 h-5" />
              <span>Bağlantıyı Kes</span>
            </button>
          </div>

          {/* Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>💡 İpucu:</strong> Yedekleme işlemi, galerinizdeki tüm onaylanmış fotoğrafları Google Drive'ınıza kopyalar.
              Bu işlem fotoğraf sayısına göre birkaç dakika sürebilir.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default GoogleDriveManager
