import { useState, useRef, useEffect } from 'react'
import { Camera, X, RotateCw, Check } from 'lucide-react'

const CameraCapture = ({ onCapture, onClose }) => {
  const [stream, setStream] = useState(null)
  const [capturedImage, setCapturedImage] = useState(null)
  const [facingMode, setFacingMode] = useState('user') // 'user' or 'environment'
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    startCamera()
    return () => {
      stopCamera()
    }
  }, [facingMode])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode },
        audio: false
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error('Kamera erişim hatası:', error)
      alert('Kamera erişimi reddedildi veya kullanılamıyor!')
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }
  }

  const capturePhoto = () => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (video && canvas) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0)

      canvas.toBlob((blob) => {
        const file = new File([blob], `camera-${Date.now()}.jpg`, { type: 'image/jpeg' })
        setCapturedImage(URL.createObjectURL(blob))
        onCapture(file)
      }, 'image/jpeg', 0.9)
    }
  }

  const switchCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user')
  }

  const retake = () => {
    setCapturedImage(null)
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-black/50 p-4 flex justify-between items-center">
        <h3 className="text-white font-semibold">Fotoğraf Çek</h3>
        <button
          onClick={onClose}
          className="text-white p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative flex items-center justify-center bg-black">
        {!capturedImage ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="max-w-full max-h-full"
            />
            <canvas ref={canvasRef} className="hidden" />
          </>
        ) : (
          <img
            src={capturedImage}
            alt="Captured"
            className="max-w-full max-h-full"
          />
        )}
      </div>

      {/* Controls */}
      <div className="bg-black/50 p-6">
        {!capturedImage ? (
          <div className="flex justify-center items-center space-x-8">
            <button
              onClick={switchCamera}
              className="text-white p-4 hover:bg-white/20 rounded-full transition-colors"
            >
              <RotateCw className="w-6 h-6" />
            </button>
            <button
              onClick={capturePhoto}
              className="bg-white w-20 h-20 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg"
            >
              <Camera className="w-10 h-10 text-gray-800" />
            </button>
            <div className="w-16"></div> {/* Spacer for symmetry */}
          </div>
        ) : (
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={retake}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              Tekrar Çek
            </button>
            <button
              onClick={onClose}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
            >
              <Check className="w-5 h-5" />
              <span>Kullan</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CameraCapture
