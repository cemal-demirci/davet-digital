import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Camera, Upload, Heart, CheckCircle, XCircle, Share2 } from 'lucide-react'
import axios from 'axios'
import CameraCapture from '../components/CameraCapture'

const API_URL = 'http://localhost:5001'

const GuestUpload = () => {
  const { qrCode } = useParams()
  const navigate = useNavigate()
  const [qrInfo, setQrInfo] = useState(null)
  const [guestName, setGuestName] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [uploadCount, setUploadCount] = useState(0)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showCamera, setShowCamera] = useState(false)
  const [cameraStream, setCameraStream] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [backgroundPhotos, setBackgroundPhotos] = useState([])

  useEffect(() => {
    if (qrCode) {
      fetchQRInfo()
      fetchBackgroundPhotos()
    }
  }, [qrCode])

  const fetchBackgroundPhotos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/photos`)
      setBackgroundPhotos(response.data.slice(0, 4))
    } catch (error) {
      console.error('Error fetching photos:', error)
    }
  }

  const fetchQRInfo = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/qr/${qrCode}`)
      setQrInfo(response.data)
      // Sadece kişiye özel QR'larda ismi otomatik doldur
      if (response.data.name && !response.data.isTableQR) {
        setGuestName(response.data.name)
      }
    } catch (error) {
      setError('Geçersiz QR kod!')
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)

    // Dosya boyutu kontrolü
    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        setError(`${file.name} 10MB'dan büyük, atlandı!`)
        return false
      }
      return true
    })

    if (validFiles.length === 0) return

    setSelectedFiles(prev => [...prev, ...validFiles])

    // Önizlemeler oluştur
    validFiles.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviews(prev => [...prev, { file: file.name, url: reader.result }])
      }
      reader.readAsDataURL(file)
    })

    setError('')
  }

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleCameraCapture = (file) => {
    setSelectedFiles(prev => [...prev, file])

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviews(prev => [...prev, { file: file.name, url: reader.result }])
    }
    reader.readAsDataURL(file)
    setShowCamera(false)
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0 || !guestName) {
      setError('Lütfen isminizi ve en az bir fotoğraf seçin!')
      return
    }

    setUploading(true)
    setError('')
    setUploadProgress(0)

    try {
      let uploadedCount = 0

      for (let i = 0; i < selectedFiles.length; i++) {
        const formData = new FormData()
        formData.append('photo', selectedFiles[i])
        formData.append('guestName', guestName)
        if (qrInfo) {
          formData.append('qrCodeId', qrInfo._id)
        }

        await axios.post(`${API_URL}/api/guest-photos/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })

        uploadedCount++
        setUploadProgress(Math.round((uploadedCount / selectedFiles.length) * 100))
      }

      setUploadCount(prev => prev + uploadedCount)
      setSuccess(true)
      setSelectedFiles([])
      setPreviews([])

      // 2 saniye sonra başka fotoğraf yükleyebilsin
      setTimeout(() => {
        setSuccess(false)
        setUploadProgress(0)
      }, 2000)
    } catch (error) {
      setError('Yükleme başarısız! Lütfen tekrar deneyin.')
    } finally {
      setUploading(false)
    }
  }

  if (error && !qrInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
          <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Geçersiz QR Kod</h2>
          <p className="text-gray-600">Lütfen geçerli bir QR kod kullanın.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8 px-4 relative overflow-hidden">
      {/* Background Photos */}
      {backgroundPhotos.length > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {backgroundPhotos.map((photo, index) => (
            <div
              key={photo._id}
              className="absolute animate-float"
              style={{
                top: `${10 + index * 25}%`,
                left: index % 2 === 0 ? '3%' : 'auto',
                right: index % 2 === 1 ? '3%' : 'auto',
                animationDelay: `${index * 1.5}s`,
                animationDuration: '15s'
              }}
            >
              <img
                src={`${API_URL}${photo.url}`}
                alt=""
                className="w-40 h-40 object-cover rounded-full opacity-8 blur-sm"
              />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-pulse" />
          <h1 className="text-4xl font-script text-pink-600 mb-2">
            Anılarınızı Paylaşın
          </h1>
          <p className="text-gray-700">
            Düğün fotoğraflarınızı yükleyin ve anılarımızın bir parçası olun!
          </p>
          {qrInfo && (
            <div className="mt-4 space-y-2">
              <div className="inline-block bg-white px-6 py-2 rounded-full shadow-md">
                <p className="text-sm text-gray-600">
                  {qrInfo.isTableQR ? (
                    <>
                      🪑 <span className="font-semibold text-blue-600">Masa {qrInfo.tableNumber}</span>
                      <span className="text-xs ml-2 text-gray-500">(Herkes kullanabilir)</span>
                    </>
                  ) : (
                    <>
                      {qrInfo.tableNumber && `Masa ${qrInfo.tableNumber} - `}
                      <span className="font-semibold text-pink-600">{qrInfo.name}</span>
                    </>
                  )}
                </p>
              </div>
              {uploadCount > 0 && (
                <div className="inline-block bg-green-50 px-6 py-2 rounded-full shadow-md ml-2">
                  <p className="text-sm text-green-700 font-semibold">
                    ✓ {uploadCount} fotoğraf yüklendi
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Upload Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {success ? (
            <div className="text-center py-12">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Teşekkürler! 🎉
              </h2>
              <p className="text-gray-600 mb-2">
                Fotoğrafınız başarıyla yüklendi!
              </p>
              <p className="text-sm text-gray-500 mb-6">
                {uploadCount} fotoğraf yüklendi • Sınırsız yükleme yapabilirsiniz
              </p>
              <p className="text-xs text-gray-400 mb-6">
                Onaylandıktan sonra galeride görünecek
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setSuccess(false)}
                  className="flex-1 bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Başka Fotoğraf Yükle
                </button>
                <button
                  onClick={() => {
                    const message = `Merhaba! 💒\n\nDüğün için fotoğraf yükledim, sen de yüklemek ister misin?\n\n${qrInfo?.name ? qrInfo.name : 'Düğün Fotoğrafları'}\n\n👇 Buradan yükleyebilirsin:\n${window.location.href}\n\n📸 Anılarımızın bir parçası ol!`
                    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
                    window.open(whatsappUrl, '_blank')
                  }}
                  className="flex-1 bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Arkadaşlarını Davet Et</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İsminiz
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Adınız Soyadınız"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fotoğraf Seçin {previews.length > 0 && `(${previews.length} seçildi)`}
                </label>

                {previews.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {previews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview.url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeFile(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <label className="block">
                      <div className="border-2 border-dashed border-pink-300 rounded-lg p-6 text-center hover:border-pink-500 transition-colors cursor-pointer bg-pink-50">
                        <p className="text-pink-600 font-medium">+ Daha Fazla Ekle</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label className="block">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-pink-500 transition-colors cursor-pointer">
                        <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-600 mb-2">Fotoğraf/Video yüklemek için tıklayın</p>
                        <p className="text-sm text-gray-400">veya sürükleyip bırakın</p>
                        <p className="text-xs text-gray-400 mt-2">Birden fazla seçebilirsiniz</p>
                        <p className="text-xs text-gray-400">Max 10MB - JPG, PNG, MP4</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                    <button
                      onClick={() => setShowCamera(true)}
                      className="w-full border-2 border-pink-300 bg-pink-50 rounded-lg p-6 text-center hover:bg-pink-100 transition-colors"
                    >
                      <Camera className="w-12 h-12 mx-auto mb-2 text-pink-600" />
                      <p className="text-pink-600 font-medium">Kamera ile Fotoğraf Çek</p>
                    </button>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Progress Bar */}
              {uploading && uploadProgress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Yükleniyor...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-purple-500 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={selectedFiles.length === 0 || !guestName || uploading}
                className={`w-full py-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                  selectedFiles.length === 0 || !guestName || uploading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-pink-500 text-white hover:bg-pink-600'
                }`}
              >
                <Upload className="w-5 h-5" />
                <span>
                  {uploading
                    ? `Yükleniyor... (${uploadProgress}%)`
                    : `${selectedFiles.length > 0 ? selectedFiles.length + ' Fotoğraf' : 'Fotoğraf'} Yükle`}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>📸 Yüklediğiniz fotoğraflar moderasyon sonrası galeride görünecektir.</p>
          <p className="mt-2">🎉 Sınırsız sayıda fotoğraf yükleyebilirsiniz!</p>
          <p className="mt-2">💕 Anılarınızı bizimle paylaştığınız için teşekkürler!</p>
        </div>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  )
}

export default GuestUpload
